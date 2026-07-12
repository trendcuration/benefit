// 백분위 기준 데이터
//
// [소득] 개인 근로소득(연 총급여, 세전) 기준.
//   출처: 국세청 근로소득 연말정산 통계·천분위 자료 (2024년 귀속 기준 보도자료 종합)
//   - 근로소득자 약 2,108만 명, 평균 총급여 약 4,475만원, 중위 약 3,200만원
// [순자산] 가구 순자산(자산 − 부채) 기준.
//   출처: 통계청·한국은행·금융감독원 「2025년 가계금융복지조사」 (2025년 3월말 기준)
//   - 전체 약 2,218만 가구, 평균 순자산 약 4억 7,144만원
//
// 공표 자료는 십분위·경계값 위주라 중간 구간은 로그-선형 보간으로 추정한다.
// 연령대별 곡선은 전체 곡선에 연령대 중앙값/전체 중앙값 비율을 곱한 근사치이며
// (상위 1% 이내 꼬리는 연령 간 격차가 작아 스케일링을 절반으로 감쇠),
// 결과 화면에 "통계 기반 추정치" 고지를 반드시 노출한다.

export type Metric = 'income' | 'asset';
export type AgeGroup = '전체' | '20대' | '30대' | '40대' | '50대' | '60대+';

export const AGE_GROUPS: AgeGroup[] = ['전체', '20대', '30대', '40대', '50대', '60대+'];

/** p = 상위 % (작을수록 상위), value = 만원. p 오름차순 / value 내림차순 */
export interface PercentilePoint {
  p: number;
  value: number;
}

// ── 전체 기준 테이블 (만원) ──

/** 개인 근로소득: 연 총급여 */
const INCOME_ALL: PercentilePoint[] = [
  { p: 0.1, value: 98_000 },
  { p: 1, value: 23_500 },
  { p: 5, value: 11_800 },
  { p: 10, value: 9_270 },
  { p: 20, value: 6_500 },
  { p: 30, value: 5_000 },
  { p: 40, value: 4_000 },
  { p: 50, value: 3_200 },
  { p: 60, value: 2_700 },
  { p: 70, value: 2_300 },
  { p: 80, value: 1_700 },
  { p: 90, value: 1_100 },
  { p: 99, value: 200 },
];

/** 가구 순자산 */
const ASSET_ALL: PercentilePoint[] = [
  { p: 0.1, value: 970_000 },
  { p: 1, value: 350_000 },
  { p: 5, value: 150_000 },
  { p: 10, value: 110_000 },
  { p: 20, value: 75_000 },
  { p: 30, value: 47_000 },
  { p: 43, value: 30_000 },
  { p: 50, value: 24_000 },
  { p: 60, value: 16_000 },
  { p: 70, value: 10_000 },
  { p: 80, value: 5_500 },
  { p: 90, value: 1_800 },
  { p: 99, value: 50 },
];

// ── 연령대별 스케일링 비율 (해당 연령대 중앙값 / 전체 중앙값) ──
// 소득: 통계청 임금근로일자리 소득 통계의 연령대별 월평균 소득 비율
// 순자산: 가계금융복지조사 가구주 연령대별 순자산 중앙값 비율 (20대는 표본이 작아 보수적 추정)

const AGE_RATIO: Record<Metric, Record<AgeGroup, number>> = {
  income: { 전체: 1, '20대': 0.72, '30대': 1.07, '40대': 1.24, '50대': 1.18, '60대+': 0.69 },
  asset: { 전체: 1, '20대': 0.28, '30대': 0.65, '40대': 1.18, '50대': 1.32, '60대+': 1.15 },
};

/** 상위 1% 이내 꼬리에서는 연령 간 격차가 줄어들어 스케일링 폭을 절반으로 감쇠 */
function dampedRatio(ratio: number, p: number): number {
  if (p > 1) return ratio;
  return 1 + (ratio - 1) * 0.5;
}

function scaleTable(base: PercentilePoint[], ratio: number): PercentilePoint[] {
  return base.map(({ p, value }) => ({ p, value: value * dampedRatio(ratio, p) }));
}

function buildTables(base: PercentilePoint[], ratios: Record<AgeGroup, number>) {
  return Object.fromEntries(
    AGE_GROUPS.map((age) => [age, scaleTable(base, ratios[age])])
  ) as Record<AgeGroup, PercentilePoint[]>;
}

export const TABLES: Record<Metric, Record<AgeGroup, PercentilePoint[]>> = {
  income: buildTables(INCOME_ALL, AGE_RATIO.income),
  asset: buildTables(ASSET_ALL, AGE_RATIO.asset),
};

// ── 부가 통계 (만원 / 명·가구) ──

export const POPULATION: Record<Metric, number> = {
  income: 21_080_000, // 근로소득자 수
  asset: 22_180_000, // 전체 가구 수
};

export const AVERAGE: Record<Metric, number> = {
  income: 4_475, // 평균 총급여
  asset: 47_144, // 평균 순자산
};

export const MEDIAN: Record<Metric, number> = {
  income: 3_200,
  asset: 24_000,
};

export const METRIC_META: Record<
  Metric,
  { label: string; emoji: string; unitLabel: string; baseLabel: string; countUnit: string }
> = {
  income: {
    label: '월급·연봉',
    emoji: '💰',
    unitLabel: '연 총급여(세전)',
    baseLabel: '근로소득자 약 2,108만 명 중',
    countUnit: '명',
  },
  asset: {
    label: '순자산',
    emoji: '🏦',
    unitLabel: '가구 순자산(자산−부채)',
    baseLabel: '대한민국 약 2,218만 가구 중',
    countUnit: '가구',
  },
};

export const SOURCE_NOTE =
  '국세청 근로소득 연말정산 통계 · 2025년 가계금융복지조사 기반 추정치이며 실제와 다를 수 있어요';
