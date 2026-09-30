// scripts/.cache/apt-raw.json(fetch-apt-prices.mjs 수집 원본)에서 지역별로
// "가격대를 넓게 커버하는 대표 단지"만 추려 번들에 들어갈 최종 정적 데이터를 만든다.
//
// 원본은 지역당 수백 개 단지라 그대로 넣으면 번들이 수 MB로 불어난다. 이 앱의
// 목적은 "예산과 가장 가까운 단지 몇 개 보여주기"라 전체 단지가 아니라 가격
// 스펙트럼을 고르게 덮는 대표 샘플이면 충분하다.
//
// 사용법: node scripts/build-apt-dataset.mjs

import { readFile, writeFile } from 'node:fs/promises';

const MIN_SERIES_LEN = 8; // 분기 18개 중 8개 미만은 그래프가 너무 듬성듬성해 제외
const TARGET_PER_REGION = 28; // 지역당 대표 단지 수(가격 구간별 1개씩 뽑음)

/** 같은 단지(이름+동)가 평형별로 여러 개 잡혀 있으면, 최종 리스트에 같은 이름이 중복
 * 노출되는 문제가 생긴다(예산에 가까운 평형이 여러 개면 그 단지만 4칸을 다 채움).
 * 시계열이 가장 촘촘한 평형 하나만 그 단지의 대표로 남긴다. */
function dedupeByComplex(complexes) {
  const byKey = new Map();
  for (const c of complexes) {
    const key = `${c.name}__${c.dong}`;
    const prev = byKey.get(key);
    if (!prev || c.series.length > prev.series.length) byKey.set(key, c);
  }
  return [...byKey.values()];
}

function pickRepresentatives(complexes) {
  const deduped = dedupeByComplex(complexes);
  const dense = deduped.filter((c) => c.series.length >= MIN_SERIES_LEN);
  const pool = dense.length >= TARGET_PER_REGION ? dense : deduped;
  if (pool.length <= TARGET_PER_REGION) return pool;

  const sorted = [...pool].sort((a, b) => a.latestManwon - b.latestManwon);
  const min = sorted[0].latestManwon;
  const max = sorted[sorted.length - 1].latestManwon;
  const step = (max - min) / TARGET_PER_REGION;

  const picked = [];
  const used = new Set();
  for (let i = 0; i < TARGET_PER_REGION; i++) {
    const target = min + step * (i + 0.5);
    // 이 가격대 구간에서, 시계열이 가장 촘촘한(=차트가 예쁜) 단지를 대표로 선택
    let best = null;
    let bestScore = -Infinity;
    for (const c of sorted) {
      if (used.has(c)) continue;
      const dist = Math.abs(c.latestManwon - target);
      const score = c.series.length * 1e9 - dist; // 시계열 길이 우선, 그다음 가격 근접도
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    if (best) {
      picked.push(best);
      used.add(best);
    }
  }
  return picked.sort((a, b) => a.latestManwon - b.latestManwon);
}

async function main() {
  const raw = JSON.parse(await readFile(new URL('./.cache/apt-raw.json', import.meta.url), 'utf-8'));

  const output = {};
  for (const [id, region] of Object.entries(raw)) {
    const picked = pickRepresentatives(region.complexes);
    output[id] = { label: region.label, complexes: picked };
    console.log(`${region.label}: ${region.complexes.length}개 중 ${picked.length}개 선택`);
  }

  const ts = `// 자동 생성 파일 — scripts/fetch-apt-prices.mjs → build-apt-dataset.mjs 순서로 다시 생성하세요. 직접 수정하지 마세요.
// 국토교통부 아파트매매 실거래가 상세 자료 기준(가격대별 대표 단지 샘플)

export interface AptSeriesPoint {
  ym: string;
  medianManwon: number;
}

export interface AptComplex {
  name: string;
  dong: string;
  sggName: string;
  pyeong: number;
  areaM2: number;
  latestManwon: number;
  series: AptSeriesPoint[];
}

export interface RegionGroupData {
  label: string;
  complexes: AptComplex[];
}

export const APT_PRICE_DATA: Record<string, RegionGroupData> = ${JSON.stringify(output, null, 2)};
`;

  const outPath = new URL('../src/data/aptPrices.generated.ts', import.meta.url);
  await writeFile(outPath, ts, 'utf-8');
  console.log(`\n✅ ${outPath.pathname} 작성 완료`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
