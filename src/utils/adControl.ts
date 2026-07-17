// 전면 광고 노출 정책
// - 세션 첫 검색에서는 노출하지 않음 (첫인상 보호)
// - 세션당 최대 1회
// - 마지막 노출 후 5분 쿨다운 (세션을 넘어 localStorage로 유지)

const LAST_SHOWN_KEY = 'benefit:interstitial:lastShownAt';
const COOLDOWN_MS = 5 * 60 * 1000;

let searchCountThisSession = 0;
let shownThisSession = false;

export function takeInterstitialSlot(): boolean {
  searchCountThisSession += 1;

  if (searchCountThisSession <= 1) return false;
  if (shownThisSession) return false;

  const lastShownAt = Number(safeGet(LAST_SHOWN_KEY) ?? 0);
  if (Date.now() - lastShownAt < COOLDOWN_MS) return false;

  shownThisSession = true;
  safeSet(LAST_SHOWN_KEY, String(Date.now()));
  return true;
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 저장 불가 환경(시크릿 모드 등)에서는 세션 내 제한만 적용
  }
}
