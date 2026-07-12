import { TABLES, type AgeGroup, type Metric } from './percentiles';

export const TOP_CAP = 0.1;
export const BOTTOM_CAP = 99.9;

/**
 * 금액(만원) → 상위 % (0.1 ~ 99.9).
 * breakpoint 사이는 로그-선형 보간:
 *   p = p1 + (p2 - p1) * (ln v1 - ln v) / (ln v1 - ln v2)
 */
export function valueToPercentile(metric: Metric, ageGroup: AgeGroup, value: number): number {
  const points = TABLES[metric][ageGroup];
  const v = Math.max(value, 1); // 0·음수(부채 초과) 가드

  if (v >= points[0].value) return TOP_CAP;
  if (v <= points[points.length - 1].value) return BOTTOM_CAP;

  for (let i = 0; i < points.length - 1; i++) {
    const hi = points[i];
    const lo = points[i + 1];
    if (v <= hi.value && v > lo.value) {
      const t = (Math.log(hi.value) - Math.log(v)) / (Math.log(hi.value) - Math.log(Math.max(lo.value, 1)));
      const p = hi.p + (lo.p - hi.p) * t;
      return clampPercentile(p);
    }
  }
  return BOTTOM_CAP;
}

/** 상위 p%에 해당하는 금액(만원). 예: p=10 → 상위 10% 진입선 */
export function valueAtPercentile(metric: Metric, ageGroup: AgeGroup, p: number): number {
  const points = TABLES[metric][ageGroup];
  if (p <= points[0].p) return points[0].value;
  if (p >= points[points.length - 1].p) return points[points.length - 1].value;

  for (let i = 0; i < points.length - 1; i++) {
    const hi = points[i];
    const lo = points[i + 1];
    if (p >= hi.p && p <= lo.p) {
      const t = (p - hi.p) / (lo.p - hi.p);
      return Math.exp(Math.log(hi.value) + (Math.log(Math.max(lo.value, 1)) - Math.log(hi.value)) * t);
    }
  }
  return points[points.length - 1].value;
}

function clampPercentile(p: number): number {
  return Math.min(Math.max(p, TOP_CAP), BOTTOM_CAP);
}

/** 상위 % 표시 문자열: 0.1% 캡은 "0.1% 이내"로 */
export function formatPercentile(p: number): string {
  if (p <= TOP_CAP) return '0.1% 이내';
  return `${p.toFixed(1)}%`;
}

/** 만원 단위 금액 → "3억 2,000만원" 한글 표기 */
export function formatManwon(manwon: number): string {
  const v = Math.round(manwon);
  if (v <= 0) return '0원';
  const eok = Math.floor(v / 10_000);
  const man = v % 10_000;
  if (eok > 0 && man > 0) return `${eok.toLocaleString('ko-KR')}억 ${man.toLocaleString('ko-KR')}만원`;
  if (eok > 0) return `${eok.toLocaleString('ko-KR')}억원`;
  return `${man.toLocaleString('ko-KR')}만원`;
}

/** 인원·가구 수 → "약 1,896만 명" 표기용 숫자 부분 */
export function formatCount(count: number): string {
  const man = Math.round(count / 10_000);
  if (man >= 10_000) {
    const eok = man / 10_000;
    return `약 ${eok.toFixed(1).replace(/\.0$/, '')}억`;
  }
  return `약 ${man.toLocaleString('ko-KR')}만`;
}

export interface RankResult {
  /** 전체 기준 상위 % */
  pAll: number;
  /** 선택 연령대 기준 상위 % (전체 선택 시 null) */
  pAge: number | null;
}

export function getRank(metric: Metric, ageGroup: AgeGroup, value: number): RankResult {
  return {
    pAll: valueToPercentile(metric, '전체', value),
    pAge: ageGroup === '전체' ? null : valueToPercentile(metric, ageGroup, value),
  };
}
