#!/usr/bin/env node
/**
 * 정부24 '대한민국 공공서비스(혜택) 정보' 전체를 받아 앱이 쓰기 좋은 정적 JSON으로 만든다.
 *
 * 사용: node scripts/gov24-sync.mjs <출력 디렉터리>
 *   - 인증키: server/.env 의 GOV24_SERVICE_KEY (저장소에 커밋하지 않는다)
 *   - 출력: v1/meta.json, v1/list/national.json, v1/list/<시도>.json, v1/detail/<서비스ID>.json
 *
 * 출력 디렉터리는 benefit 저장소의 고아 브랜치 `data` 작업트리(../benefit-data)이고,
 * scripts/gov24-publish.sh 가 이 스크립트 실행 → 커밋 → 푸시 → jsDelivr 캐시 갱신까지 한다.
 * 앱은 meta.json의 commit 값을 보고 cdn.jsdelivr.net/gh/trendcuration/benefit@<commit>/v1/... 를 읽는다.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2];
if (!OUT) {
  console.error('사용: node scripts/gov24-sync.mjs <출력 디렉터리>');
  process.exit(1);
}

function readKey() {
  const env = readFileSync(join(ROOT, 'server/.env'), 'utf8');
  const m = env.match(/^GOV24_SERVICE_KEY=(.+)$/m);
  if (!m) throw new Error('server/.env 에 GOV24_SERVICE_KEY 가 없어요');
  return m[1].trim();
}

const KEY = readKey();
const BASE = 'https://api.odcloud.kr/api/gov24/v3';

async function fetchAll(endpoint) {
  const rows = [];
  for (let page = 1; page <= 50; page++) {
    const url = `${BASE}/${endpoint}?page=${page}&perPage=1000&serviceKey=${encodeURIComponent(KEY)}`;
    let json;
    for (let attempt = 1; ; attempt++) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(90_000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        json = await res.json();
        break;
      } catch (e) {
        if (attempt >= 4) throw new Error(`${endpoint} page ${page} 실패: ${e.message}`);
        await new Promise((r) => setTimeout(r, 3000 * attempt));
      }
    }
    rows.push(...json.data);
    if (json.currentCount < 1000) break;
  }
  return rows;
}

// ── 텍스트 정리 ──
const clean = (v) => (v == null || v === 'None' ? '' : String(v)).replace(/\r/g, '').trim();

/** 원문(○, -, ㆍ 머리표가 섞인 여러 줄)을 머리표 없는 줄 배열로 바꾼다. ※ 줄은 그대로 둔다(앱이 회색으로 표시). */
function toLines(v, max = 40) {
  return clean(v)
    .split('\n')
    .map((l) => l.replace(/^[\s○●◦ㆍ·•∙\-–▶■□◎*]+/, '').replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 0)
    .slice(0, max);
}

function firstLine(v, max) {
  const l = toLines(v, 1)[0] ?? '';
  return l.length > max ? `${l.slice(0, max - 1)}…` : l;
}

/**
 * 지원내용에서 대표 금액 문구 하나를 뽑는다(예: '월 최대 50만 원').
 * '최대·월·1인당' 같은 수식어가 붙은 첫 금액만 쓴다 — 가장 큰 숫자를 고르면 다른 항목의 금액이
 * 대표처럼 보일 수 있어서다. 못 찾으면 null(카드는 서비스 요약을 대신 보여준다).
 */
function extractAmount(text) {
  const t = clean(text).replace(/\s+/g, ' ');
  const re = /((?:월|연|연간|분기|1인당|가구당|1회|최대|매월|연 최대|월 최대)\s*)+([\d,.]+)\s*(억|천만|백만|만|천)?\s*원/g;
  for (const m of t.matchAll(re)) {
    const num = parseFloat(m[2].replace(/,/g, ''));
    if (!num) continue;
    const unit = { 억: 1e8, 천만: 1e7, 백만: 1e6, 만: 1e4, 천: 1e3 }[m[3]] ?? 1;
    if (num * unit < 1000) continue;
    return `${m[1].trim()} ${m[2]}${m[3] ?? ''} 원`.replace(/\s+/g, ' ');
  }
  return null;
}

// ── 지역 ──
const SIDO_SHORT = {
  서울특별시: '서울', 부산광역시: '부산', 대구광역시: '대구', 인천광역시: '인천', 광주광역시: '광주',
  대전광역시: '대전', 울산광역시: '울산', 세종특별자치시: '세종', 경기도: '경기', 강원특별자치도: '강원',
  충청북도: '충북', 충청남도: '충남', 전북특별자치도: '전북', 전라남도: '전남', 전남광주통합특별시: '전남광주',
  경상북도: '경북', 경상남도: '경남', 제주특별자치도: '제주',
};

// ── 지원조건 코드 (데이터로 검증: JA0322·JA0410은 '해당사항 없음' = 일반인도 대상) ──
const SPECIAL = {
  JA0301: '예비부모·난임', JA0302: '임산부', JA0303: '출산·입양', JA0313: '농업인', JA0314: '어업인',
  JA0315: '축산업인', JA0316: '임업인', JA0317: '초등학생', JA0318: '중학생', JA0319: '고등학생',
  JA0320: '대학생', JA0326: '직장인', JA0327: '구직자', JA0328: '장애인', JA0329: '보훈대상자',
  JA0330: '질환자', JA0401: '다문화가족', JA0402: '북한이탈주민', JA0403: '한부모·조손', JA0404: '1인가구',
  JA0411: '다자녀', JA0412: '무주택', JA0413: '신규전입', JA0414: '확대가족',
};
const HOUSEHOLD = ['JA0401', 'JA0402', 'JA0403', 'JA0404', 'JA0411', 'JA0412', 'JA0413', 'JA0414'];

const PERSONAL = Object.keys(SPECIAL).filter((k) => k.startsWith('JA03'));

function conditionInfo(c) {
  const y = (k) => c?.[k] === 'Y';
  const countY = (keys) => keys.filter(y).length;
  // '해당사항 없음'이 Y이거나, 특성 칸을 거의 다 Y로 채운 서비스는 누구나 대상으로 본다
  // (원본이 범용 서비스의 특성 칸을 전부 Y로 채워 두는 경우가 많다).
  const personalGeneral =
    y('JA0322') || y('JA0326') || y('JA0327') || countY(PERSONAL) >= PERSONAL.length - 3 ||
    PERSONAL.every((k) => c?.[k] == null);
  const householdGeneral =
    y('JA0410') || countY(HOUSEHOLD) >= HOUSEHOLD.length - 2 || HOUSEHOLD.every((k) => c?.[k] == null);
  const general = !c || (personalGeneral && householdGeneral);
  // 누구 대상인지 태그: 범용이 아닌 쪽 묶음에서만 뽑는다.
  const tags = general
    ? []
    : [
        ...(personalGeneral ? [] : PERSONAL.filter(y)),
        ...(householdGeneral ? [] : HOUSEHOLD.filter(y)),
      ]
        .map((k) => SPECIAL[k])
        .slice(0, 3);
  const male = y('JA0101');
  const female = y('JA0102');
  return {
    lo: typeof c?.JA0110 === 'number' ? c.JA0110 : null,
    hi: typeof c?.JA0111 === 'number' && c.JA0111 < 120 ? c.JA0111 : null,
    sx: male && !female ? 'M' : female && !male ? 'F' : null,
    gen: general,
    tags,
  };
}

const CATEGORY = {
  생활안정: '생활·금융', '주거·자립': '주거', '고용·창업': '일자리', '보육·교육': '교육',
  '임신·출산': '임신·육아', '보건·의료': '건강', '보호·돌봄': '돌봄', '문화·환경': '문화·여가',
  '행정·안전': '생활·안전',
};

// ── 외부 링크 점검: 도메인이 없거나 인증서·연결 오류면 정부24 상세 페이지로 대신 연결 ──
const LINK_CACHE_DAYS = 7;

/** 점검 결과를 출력 디렉터리 밖(작업트리 루트, 커밋 안 함)에 7일간 보관해 매일 전체를 다시 열어보지 않는다. */
async function checkUrls(urls, cacheFile) {
  let cache = {};
  try {
    cache = JSON.parse(readFileSync(cacheFile, 'utf8'));
  } catch {
    /* 캐시 없음 */
  }
  const now = Date.now();
  const fresh = (u) => cache[u] && now - cache[u].at < LINK_CACHE_DAYS * 86_400_000;
  const bad = new Set([...urls].filter((u) => fresh(u) && !cache[u].ok));
  const list = [...urls].filter((u) => !fresh(u));
  let i = 0;
  async function worker() {
    while (i < list.length) {
      const u = list[i++];
      let ok = true;
      try {
        await fetch(u, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15_000) });
      } catch (e) {
        const code = e.cause?.code ?? e.name;
        // 시간 초과는 정부 사이트의 해외 IP 차단일 수 있어 살려 둔다.
        ok = code === 'TimeoutError' || code === 'UND_ERR_CONNECT_TIMEOUT';
      }
      cache[u] = { ok, at: now };
      if (!ok) bad.add(u);
    }
  }
  await Promise.all(Array.from({ length: 16 }, worker));
  writeFileSync(cacheFile, JSON.stringify(cache));
  return bad;
}

async function main() {
  const started = Date.now();
  const [list, details, conds] = await Promise.all([
    fetchAll('serviceList'),
    fetchAll('serviceDetail'),
    fetchAll('supportConditions'),
  ]);
  console.log(`받음: 목록 ${list.length}, 상세 ${details.length}, 조건 ${conds.length}`);
  if (list.length < 5000) throw new Error('받은 건수가 너무 적어요 — 기존 데이터를 지키기 위해 중단');

  const detailById = new Map(details.map((d) => [d['서비스ID'], d]));
  const condById = new Map(conds.map((c) => [c['서비스ID'], c]));

  // 기관코드 → 지역(시군구·광역시도 항목에서 학습). 공단·재단은 코드가 상위 지자체 코드와 같다.
  const codeRegion = new Map();
  for (const x of list) {
    const name = clean(x['소관기관명']);
    if (x['소관기관유형'] === '시군구') {
      const [sido, ...rest] = name.split(' ');
      codeRegion.set(x['소관기관코드'], { sido, sgg: rest.join(' ') });
    } else if (x['소관기관유형'] === '광역시도') {
      codeRegion.set(x['소관기관코드'], { sido: name, sgg: null });
    }
  }
  function regionOf(x) {
    const type = x['소관기관유형'];
    const name = clean(x['소관기관명']);
    if (type === '중앙행정기관' || type === '공공기관') return { sido: null, sgg: null };
    const byCode = codeRegion.get(x['소관기관코드']);
    if (byCode) return byCode;
    if (type === '교육청') {
      const sido = Object.keys(SIDO_SHORT).find((s) => name.startsWith(s));
      if (sido) return { sido, sgg: null };
    }
    return undefined; // 지역을 알 수 없으면 제외
  }

  // 신청 링크 점검 대상
  const applyUrls = new Set();
  for (const d of details) {
    const u = clean(d['온라인신청사이트URL']);
    if (/^https?:\/\//.test(u)) applyUrls.add(u);
  }
  // SKIP_LINK_CHECK=1 이면 점검을 건너뛴다(점검에 10분 정도 걸려 개발 중 빠른 재생성용).
  const badUrls = process.env.SKIP_LINK_CHECK === '1' ? new Set() : await checkUrls(applyUrls, join(OUT, 'linkcheck-cache.json'));
  console.log(`신청 링크 ${applyUrls.size}개 중 열리지 않는 링크 ${badUrls.size}개 → 정부24 상세로 대체`);

  const national = [];
  const bySido = new Map();
  const sggBySido = new Map();
  rmSync(join(OUT, 'v1/detail'), { recursive: true, force: true });
  mkdirSync(join(OUT, 'v1/detail'), { recursive: true });
  mkdirSync(join(OUT, 'v1/list'), { recursive: true });

  let kept = 0;
  for (const x of list) {
    const users = clean(x['사용자구분']);
    if (!users.includes('개인') && !users.includes('가구')) continue; // 법인·단체 전용 제외
    const field = clean(x['서비스분야']);
    const cat = CATEGORY[field];
    if (!cat) continue; // 농림축산어업 등 개인 생활과 거리가 먼 분야 제외
    const region = regionOf(x);
    if (!region) continue;

    const id = x['서비스ID'];
    const d = detailById.get(id) ?? {};
    const cond = conditionInfo(condById.get(id));
    const support = d['지원내용'] ?? x['지원내용'];
    const item = {
      i: id,
      n: clean(x['서비스명']),
      o: clean(x['소관기관명']),
      g: region.sgg,
      c: cat,
      s: firstLine(x['서비스목적요약'], 90),
      a: extractAmount(support),
      tg: firstLine(x['지원대상'], 60),
      d: firstLine(x['신청기한'], 40).replace(/^상시\s*신청$/, '상시'),
      v: Number(x['조회수']) || 0,
      ...(cond.lo != null && { lo: cond.lo }),
      ...(cond.hi != null && { hi: cond.hi }),
      ...(cond.sx && { sx: cond.sx }),
      ...(!cond.gen && { sp: 1 }),
      ...(cond.tags.length && { t: cond.tags }),
    };

    const apply = clean(d['온라인신청사이트URL']);
    const detail = {
      i: id,
      n: item.n,
      o: item.o,
      purpose: toLines(d['서비스목적'] ?? x['서비스목적요약'], 8),
      support: toLines(support),
      target: toLines(d['지원대상'] ?? x['지원대상']),
      criteria: toLines(d['선정기준'] ?? x['선정기준']),
      how: toLines(d['신청방법'] ?? x['신청방법']),
      docs: toLines(d['구비서류'], 20).filter((l) => l !== '해당없음'),
      deadline: toLines(d['신청기한'] ?? x['신청기한'], 6),
      contact: clean(d['문의처'] ?? x['전화문의']).split('||').map((s) => s.trim()).filter(Boolean),
      receipt: clean(d['접수기관명'] ?? x['접수기관']),
      type: clean(d['지원유형'] ?? x['지원유형']),
      apply: /^https?:\/\//.test(apply) && !badUrls.has(apply) ? apply : null,
      gov: clean(x['상세조회URL']) || `https://www.gov.kr/portal/rcvfvrSvc/dtlEx/${id}`,
      updated: clean(d['수정일시'] ?? x['수정일시']),
    };
    writeFileSync(join(OUT, `v1/detail/${id}.json`), JSON.stringify(detail));

    if (!region.sido) {
      national.push(item);
    } else {
      const short = SIDO_SHORT[region.sido];
      if (!short) continue;
      if (!bySido.has(short)) bySido.set(short, []);
      bySido.get(short).push(item);
      if (region.sgg) {
        if (!sggBySido.has(short)) sggBySido.set(short, new Set());
        sggBySido.get(short).add(region.sgg);
      }
    }
    kept++;
  }

  const byViews = (a, b) => b.v - a.v;
  writeFileSync(join(OUT, 'v1/list/national.json'), JSON.stringify(national.sort(byViews)));
  for (const [short, items] of bySido) {
    writeFileSync(join(OUT, `v1/list/${short}.json`), JSON.stringify(items.sort(byViews)));
  }

  const sidos = Object.entries(SIDO_SHORT)
    .filter(([, short]) => bySido.has(short))
    .map(([name, short]) => ({
      name,
      short,
      count: bySido.get(short).length,
      sggs: [...(sggBySido.get(short) ?? [])].sort((a, b) => a.localeCompare(b, 'ko')),
    }));
  const meta = {
    updatedAt: new Date().toISOString(),
    source: '행정안전부 대한민국 공공서비스(혜택) 정보 (공공데이터포털)',
    total: kept,
    national: national.length,
    sidos,
  };
  writeFileSync(join(OUT, 'v1/meta.json'), JSON.stringify(meta));
  console.log(`정리: ${kept}건(전국 ${national.length}, 시도 ${sidos.length}곳) · ${Math.round((Date.now() - started) / 1000)}초`);
}

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
main().catch((e) => {
  console.error('[gov24-sync] 실패:', e.message);
  process.exit(1);
});
