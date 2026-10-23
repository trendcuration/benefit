import type { Metric } from '../data/percentiles';

/** 지표별 지난번 판정 결과. 다시 방문했을 때 "지난번보다 몇 %p 올랐는지" 보여주는 데 쓴다(기기 안에만 저장). */
export interface LastJudge {
  /** 판정 금액(만원) */
  value: number;
  /** 전체 기준 상위 퍼센트 */
  pAll: number;
  /** 판정한 날 (yyyy-mm-dd, 기기 현지 날짜) */
  date: string;
}

const KEY = 'income-rank:last-judge.v1';
const REVIEW_ASKED_KEY = 'income-rank:review-asked.v1';

function readAll(): Partial<Record<Metric, LastJudge>> {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<Metric, LastJudge>>) : {};
  } catch {
    return {};
  }
}

export function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 이번 판정을 저장하고, 저장 전의 지난 판정을 돌려준다.
 * 같은 날 다시 판정한 건 "지난번"으로 치지 않도록, 지난 기록이 오늘이면 그 이전 기록을 유지한다.
 */
export function recordJudge(metric: Metric, current: LastJudge): LastJudge | null {
  const all = readAll();
  const prev = all[metric] ?? null;
  const prevValid = prev && typeof prev.pAll === 'number' && typeof prev.date === 'string' ? prev : null;
  try {
    if (!prevValid || prevValid.date !== current.date) {
      all[metric] = current;
      window.localStorage.setItem(KEY, JSON.stringify(all));
    }
  } catch {
    // 저장 불가 환경에서는 무시한다.
  }
  return prevValid && prevValid.date !== current.date ? prevValid : null;
}

export function reviewAlreadyAsked(): boolean {
  try {
    return window.localStorage.getItem(REVIEW_ASKED_KEY) === '1';
  } catch {
    return true; // 저장이 안 되면 매번 뜰 수 있으니 아예 묻지 않는다.
  }
}

export function markReviewAsked(): void {
  try {
    window.localStorage.setItem(REVIEW_ASKED_KEY, '1');
  } catch {
    // 무시
  }
}
