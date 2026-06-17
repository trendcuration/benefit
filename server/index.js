const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const SERVICE_KEY = process.env.API_SERVICE_KEY;

// 한국사회보장정보원_복지서비스정보 (2025-07-22 최신)
const API_ENDPOINT =
  'https://api.odcloud.kr/api/15083323/v1/uddi:3929b807-3420-44d7-a851-cc741fce65a1';

// ── 카테고리 키워드 추론 ────────────────────────────────────────────
const CATEGORY_RULES = [
  { category: '주거',      keywords: ['주거', '임대', '전세', '월세', '주택', '집'] },
  { category: '취업·창업', keywords: ['취업', '창업', '고용', '직업', '구직', '훈련', '재취업', '일자리', '근로'] },
  { category: '금융',      keywords: ['저축', '대출', '장학금', '금융', '장려금', '목돈', '바우처', '지원금'] },
  { category: '복지·돌봄', keywords: ['돌봄', '양육', '보육', '아이', '출산', '임신', '육아', '연금', '수당', '급여', '재활', '장애'] },
  { category: '교육',      keywords: ['교육', '학습', '학비', '등록금', '학원', '장학', '학교'] },
  { category: '건강',      keywords: ['건강', '의료', '검진', '심리', '치료', '병원', '재활', '요양'] },
  { category: '문화·여가', keywords: ['문화', '여가', '체육', '여행', '공연', '예술', '스포츠'] },
];

function guessCategory(text) {
  const t = text.toLowerCase();
  for (const { category, keywords } of CATEGORY_RULES) {
    if (keywords.some(k => t.includes(k))) return category;
  }
  return '복지·돌봄';
}

// ── 연령대 키워드 추론 ────────────────────────────────────────────
const AGE_RULES = [
  { age: '10대',    keywords: ['청소년', '10대', '학생', '아동', '어린이', '학교'] },
  { age: '20대',    keywords: ['청년', '20대', '대학생', '취준'] },
  { age: '30대',    keywords: ['청년', '30대', '육아', '양육', '임신', '출산'] },
  { age: '40대',    keywords: ['중장년', '40대', '재취업', '경력'] },
  { age: '50대',    keywords: ['중장년', '50대', '재취업', '퇴직'] },
  { age: '60대',    keywords: ['노인', '노년', '어르신', '60대', '경로'] },
  { age: '70대이상', keywords: ['노인', '어르신', '70대', '80대', '고령'] },
];

function guessAgeGroups(text) {
  const t = text.toLowerCase();
  const matched = AGE_RULES
    .filter(({ keywords }) => keywords.some(k => t.includes(k)))
    .map(({ age }) => age);
  // 중복 제거
  const unique = [...new Set(matched)];
  return unique.length > 0 ? unique : ['20대', '30대', '40대', '50대'];
}

// ── 성별 키워드 추론 ─────────────────────────────────────────────
function guessGenders(text) {
  const t = text.toLowerCase();
  const hasW = t.includes('여성') || t.includes('여자') || t.includes('모성');
  const hasM = t.includes('남성') || t.includes('남자');
  if (hasW && !hasM) return ['여성'];
  if (hasM && !hasW) return ['남성'];
  return ['전체'];
}

// ── odcloud API 페이지 단위 호출 ──────────────────────────────────
async function fetchPage(page, perPage = 100) {
  const res = await axios.get(API_ENDPOINT, {
    params: { serviceKey: SERVICE_KEY, page, perPage },
    timeout: 15000,
  });
  return res.data; // { currentCount, data, matchCount, page, perPage, totalCount }
}

// ── 복지서비스 → 앱 포맷 변환 ────────────────────────────────────
function transform(item, idx) {
  const combined = `${item['서비스명'] || ''} ${item['서비스요약'] || ''} ${item['소관부처명'] || ''}`;
  return {
    id: idx + 1,
    title:       item['서비스명']   || '',
    description: item['서비스요약'] || '',
    amount:      '지원',            // 이 데이터셋에는 금액 필드 없음
    deadline:    '상시',            // 이 데이터셋에는 마감일 필드 없음
    category:    guessCategory(combined),
    ageGroups:   guessAgeGroups(combined),
    genders:     guessGenders(combined),
    source:      item['소관부처명'] || '',
    url:         item['서비스URL']  || 'https://www.bokjiro.go.kr',
    isUrgent:    false,
  };
}

// ── 전체 데이터 수집 (최대 400건) ────────────────────────────────
async function fetchAll() {
  const first = await fetchPage(1, 100);
  const total = first.totalCount || 0;
  const allItems = [...(first.data || [])];

  const remaining = Math.ceil((total - 100) / 100);
  for (let p = 2; p <= Math.min(remaining + 1, 4); p++) {
    const next = await fetchPage(p, 100);
    allItems.push(...(next.data || []));
  }

  return allItems;
}

// ── GET /api/subsidies?ageGroup=20대&gender=전체 ──────────────────
app.get('/api/subsidies', async (req, res) => {
  if (!SERVICE_KEY) {
    return res.status(500).json({ error: 'API 키가 설정되지 않았어요.' });
  }

  const { ageGroup, gender } = req.query;

  try {
    const rawItems = await fetchAll();

    let subsidies = rawItems
      .map(transform)
      .filter(s => s.title);

    if (ageGroup) {
      subsidies = subsidies.filter(s => s.ageGroups.includes(ageGroup));
    }

    if (gender && gender !== '전체') {
      subsidies = subsidies.filter(s =>
        s.genders.includes('전체') || s.genders.includes(gender)
      );
    }

    res.json(subsidies);
  } catch (err) {
    console.error('[API 오류]', err.message);
    res.status(502).json({ error: '정부 API 호출에 실패했어요. 잠시 후 다시 시도해주세요.' });
  }
});

// ── 헬스체크 ─────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ benefit-server running on port ${PORT}`);
  if (!SERVICE_KEY) console.warn('⚠️  API_SERVICE_KEY 미설정 — .env 확인');
});
