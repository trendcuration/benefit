/**
 * 지원금별 신청 준비 체크리스트와 '신청했어요' 표시. 이 기기에만 저장한다.
 * 키: benefit:apply → { [itemKey]: { done: 체크한 줄 번호, applied: 신청 완료 여부, at: 마지막 변경 시각 } }
 */
const KEY = 'benefit:apply';
const MAX_ITEMS = 300;

export interface ApplyState {
  done: number[];
  applied: boolean;
  at: number;
}

type Store = Record<string, ApplyState>;

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function write(store: Store): void {
  try {
    const entries = Object.entries(store).sort((a, b) => b[1].at - a[1].at).slice(0, MAX_ITEMS);
    localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    /* 저장 실패는 무시 — 체크 표시가 다음 방문에 사라질 뿐 */
  }
}

export function getApplyState(key: string): ApplyState {
  return read()[key] ?? { done: [], applied: false, at: 0 };
}

export function setApplyState(key: string, next: Omit<ApplyState, 'at'>): void {
  const store = read();
  if (next.done.length === 0 && !next.applied) delete store[key];
  else store[key] = { ...next, at: Date.now() };
  write(store);
}

/** 신청 완료로 표시한 지원금 키 */
export function appliedKeys(): Set<string> {
  return new Set(Object.entries(read()).filter(([, v]) => v.applied).map(([k]) => k));
}
