import { APT_PRICE_DATA, type AptComplex, type AptSeriesPoint } from '../data/aptPrices.generated';

export type Horizon = 'now' | '5y';

export const REGION_TABS: { id: string; label: string }[] = Object.entries(APT_PRICE_DATA).map(
  ([id, region]) => ({ id, label: region.label }),
);

/** ym(예: "202506")을 연 단위 소수(2025.417)로 변환 */
function ymToYear(ym: string): number {
  const y = Number(ym.slice(0, 4));
  const m = Number(ym.slice(4, 6));
  return y + (m - 1) / 12;
}

function ymPlusYears(ym: string, years: number): string {
  const y = Number(ym.slice(0, 4)) + years;
  return `${y}${ym.slice(4, 6)}`;
}

/** 단지 시계열의 연 환산 상승률(CAGR). 데이터가 짧거나 이상치면 -8%~25%로 방어. */
function estimateCagr(series: AptSeriesPoint[]): number {
  if (series.length < 2) return 0;
  const first = series[0];
  const last = series[series.length - 1];
  const years = ymToYear(last.ym) - ymToYear(first.ym);
  if (years <= 0 || first.medianManwon <= 0) return 0;
  const rate = (last.medianManwon / first.medianManwon) ** (1 / years) - 1;
  return Math.max(-0.08, Math.min(0.25, rate));
}

export interface MatchedComplex {
  name: string;
  dong: string;
  sggName: string;
  pyeong: number;
  /** '지금' 또는 '5년 뒤' 기준으로 비교에 쓴 가격(만원) */
  displayManwon: number;
  /** 실측 + (5년 뒤 모드일 때) 추세 외삽 포인트가 이어붙은 시계열 */
  series: AptSeriesPoint[];
  /** series 중 실측이 아니라 추세로 예측한 포인트인지 표시하는 기준 인덱스 */
  projectedFromIndex: number;
}

export function matchComplexes(
  regionId: string,
  budgetManwon: number,
  horizon: Horizon,
  count = 4,
): MatchedComplex[] {
  const region = APT_PRICE_DATA[regionId];
  if (!region || budgetManwon <= 0) return [];

  const candidates: MatchedComplex[] = region.complexes.map((c: AptComplex) => {
    if (horizon === 'now') {
      return {
        name: c.name,
        dong: c.dong,
        sggName: c.sggName,
        pyeong: c.pyeong,
        displayManwon: c.latestManwon,
        series: c.series,
        projectedFromIndex: c.series.length, // 예측 포인트 없음
      };
    }
    const rate = estimateCagr(c.series);
    const lastYm = c.series[c.series.length - 1].ym;
    const projectedYm = ymPlusYears(lastYm, 5);
    const projectedManwon = Math.round(c.latestManwon * (1 + rate) ** 5);
    return {
      name: c.name,
      dong: c.dong,
      sggName: c.sggName,
      pyeong: c.pyeong,
      displayManwon: projectedManwon,
      series: [...c.series, { ym: projectedYm, medianManwon: projectedManwon }],
      projectedFromIndex: c.series.length - 1, // 마지막 실측점부터 점선으로 이어짐
    };
  });

  return candidates
    .sort((a, b) => Math.abs(a.displayManwon - budgetManwon) - Math.abs(b.displayManwon - budgetManwon))
    .slice(0, count)
    .sort((a, b) => b.displayManwon - a.displayManwon);
}

export { ymToYear };
