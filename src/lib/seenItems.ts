/**
 * 지난 방문까지 목록에서 본 지원금 키(기기 안에만 저장).
 * 정부24 데이터가 매주 토요일 갱신되므로, 다시 왔을 때 "지난번 이후 새로 올라온 지원금"을 골라 보여준다.
 */
const KEY = 'benefit:seen-items.v1';
/** 저장 용량 상한. 넘으면 오래된 것부터 버린다(시도 여러 곳을 바꿔 봐도 수천 개 수준). */
const MAX_KEYS = 6000;

export function loadSeenKeys(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

export function saveSeenKeys(prev: Set<string>, keys: string[]): void {
  const merged = [...prev];
  for (const k of keys) if (!prev.has(k)) merged.push(k);
  try {
    localStorage.setItem(KEY, JSON.stringify(merged.slice(-MAX_KEYS)));
  } catch {
    // localStorage 접근 불가 환경에서는 조용히 무시합니다.
  }
}
