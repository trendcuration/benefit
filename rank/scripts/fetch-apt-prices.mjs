// 국토교통부_아파트매매 실거래가 상세 자료 API로 지역별 아파트 시세를 수집해
// src/data/aptPrices.generated.ts 정적 데이터 파일을 만든다.
//
// 사용법: cd rank && node --env-file=scripts/.env scripts/fetch-apt-prices.mjs
//
// 이 스크립트는 "빌드 타임 스냅샷"용이다. 앱은 이 결과물(생성된 .ts)만 정적으로
// import 하고, 런타임에는 이 API를 절대 호출하지 않는다(외부 API 장애가 라이브 앱에
// 영향을 주지 않도록 — 다른 앱들의 percentiles.ts/subsidies.ts와 동일한 패턴).

const SERVICE_KEY = process.env.APT_TRADE_SERVICE_KEY;
if (!SERVICE_KEY) {
  console.error('APT_TRADE_SERVICE_KEY가 없어요. scripts/.env를 확인하세요.');
  process.exit(1);
}

const ENDPOINT = 'https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev';

/** XML 응답의 단지명 등에 섞여 나오는 엔티티(&amp; 등)를 원래 문자로 되돌린다. */
function decodeXmlEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

// ── 지역 그룹: 이름 + 법정동코드(5자리) 목록. 전부 API로 실측 검증됨(2026-09-30). ──
export const REGION_GROUPS = [
  {
    id: 'gangnam-bundang',
    label: '강남·분당',
    lawdCodes: [
      { code: '11680', name: '강남구' },
      { code: '11650', name: '서초구' },
      { code: '11710', name: '송파구' },
      { code: '41135', name: '분당구' },
    ],
  },
  {
    id: 'seoul-premium',
    label: '수도권 상급지', // 마용성(서울)+과천·영통(경기)이 섞여 있어 '서울'로만 표기하면 부정확함
    lawdCodes: [
      { code: '11440', name: '마포구' },
      { code: '11170', name: '용산구' },
      { code: '11200', name: '성동구' },
      { code: '41290', name: '과천시' },
      { code: '41117', name: '영통구' },
    ],
  },
  {
    id: 'daejeon-premium',
    label: '대전 상급지',
    lawdCodes: [
      { code: '30200', name: '유성구' },
      { code: '30170', name: '서구' },
    ],
  },
  {
    id: 'daegu-premium',
    label: '대구 상급지',
    lawdCodes: [{ code: '27260', name: '수성구' }],
  },
  {
    id: 'busan-premium',
    label: '부산 상급지',
    lawdCodes: [
      { code: '26350', name: '해운대구' },
      { code: '26500', name: '수영구' },
    ],
  },
  {
    id: 'ulsan-premium',
    label: '울산 상급지',
    lawdCodes: [{ code: '31140', name: '남구' }],
  },
  {
    id: 'incheon-premium',
    label: '인천 상급지',
    lawdCodes: [{ code: '28185', name: '연수구' }],
  },
];

// 분기말 기준 샘플링('22-Q1 ~ 현재 분기, 데이터 지연 감안해 최근 1개월은 제외)
function buildSampleMonths() {
  const now = new Date();
  const result = [];
  for (let year = 2022; year <= now.getFullYear(); year++) {
    for (const mm of [3, 6, 9, 12]) {
      const ym = year * 100 + mm;
      const nowYm = now.getFullYear() * 100 + (now.getMonth() + 1);
      if (ym <= nowYm) result.push(String(ym));
    }
  }
  // 실거래 신고에는 최대 30일 유예가 있어 최근 1~2개월은 데이터가 비어 보일 수 있음 → 마지막 달 제외
  return result.slice(0, -1);
}

const PYEONG = 3.305785;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchMonth(lawdCode, ym) {
  const url = `${ENDPOINT}?serviceKey=${SERVICE_KEY}&LAWD_CD=${lawdCode}&DEAL_YMD=${ym}&numOfRows=1000`;
  const res = await fetch(url);
  const xml = await res.text();
  if (!/<resultCode>000<\/resultCode>/.test(xml)) {
    console.warn(`  ! ${lawdCode} ${ym} 응답 이상: ${xml.slice(0, 200)}`);
    return [];
  }
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml))) {
    const body = m[1];
    const field = (tag) => {
      const mm = body.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`));
      return mm ? decodeXmlEntities(mm[1].trim()) : '';
    };
    const aptNm = field('aptNm');
    const excluUseAr = parseFloat(field('excluUseAr'));
    const dealAmount = parseInt(field('dealAmount').replace(/,/g, ''), 10);
    const umdNm = field('umdNm');
    if (!aptNm || !excluUseAr || !dealAmount) continue;
    items.push({ aptNm, excluUseAr, dealAmount, umdNm });
  }
  return items;
}

async function collectRegion(region) {
  const months = buildSampleMonths();
  // key: `${lawdCode}|${aptNm}|${pyeong}` -> { umdNm, series: Map<ym, number[]> }
  const groups = new Map();

  for (const { code, name } of region.lawdCodes) {
    console.log(`[${region.label}] ${name}(${code}) 수집 중... (${months.length}개월)`);
    for (const ym of months) {
      const items = await fetchMonth(code, ym);
      for (const it of items) {
        const pyeong = Math.round(it.excluUseAr / PYEONG);
        const key = `${code}|${it.aptNm}|${pyeong}`;
        if (!groups.has(key)) {
          groups.set(key, {
            aptNm: it.aptNm,
            umdNm: it.umdNm,
            sggName: name,
            pyeong,
            excluUseAr: it.excluUseAr,
            series: new Map(),
          });
        }
        const g = groups.get(key);
        if (!g.series.has(ym)) g.series.set(ym, []);
        g.series.get(ym).push(it.dealAmount);
      }
      await sleep(150); // 공공데이터포털 순단 방지용 소폭 지연
    }
  }

  const latestYm = months[months.length - 1];
  const complexes = [];
  for (const g of groups.values()) {
    // 최근 분기에 실거래가 없으면 "현재가"를 알 수 없어 매칭에 못 씀 → 제외
    if (!g.series.has(latestYm)) continue;
    // 시계열이 너무 듬성듬성하면(분기 4개 미만) 차트 의미가 없어 제외
    if (g.series.size < 4) continue;

    const series = [...g.series.entries()]
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([ym, amounts]) => ({
        ym,
        medianManwon: median(amounts),
      }));

    complexes.push({
      name: g.aptNm,
      dong: g.umdNm,
      sggName: g.sggName,
      pyeong: g.pyeong,
      areaM2: g.excluUseAr,
      latestManwon: series[series.length - 1].medianManwon,
      series,
    });
  }

  return complexes;
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

async function main() {
  const output = {};
  for (const region of REGION_GROUPS) {
    output[region.id] = {
      label: region.label,
      complexes: await collectRegion(region),
    };
    console.log(`  -> ${region.label}: 단지 ${output[region.id].complexes.length}개 확보`);
  }

  // 원본은 지역당 수백 개라 그대로 번들에 넣지 않는다. 캐시로 저장해두고
  // build-apt-dataset.mjs가 가격대별 대표 단지만 추려 최종 정적 파일을 만든다.
  const fs = await import('node:fs/promises');
  await fs.mkdir(new URL('./.cache/', import.meta.url), { recursive: true });
  const cachePath = new URL('./.cache/apt-raw.json', import.meta.url);
  await fs.writeFile(cachePath, JSON.stringify(output), 'utf-8');
  console.log(`\n✅ 원본 캐시 저장: ${cachePath.pathname}`);
  console.log('   이어서 `node scripts/build-apt-dataset.mjs` 실행해 최종 데이터를 생성하세요.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
