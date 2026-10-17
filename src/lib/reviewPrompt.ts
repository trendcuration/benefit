/**
 * 별점 요청 팝업을 띄울 '긍정적인 순간' 판단.
 *
 * 앱을 잘 쓰고 있다는 신호가 모두 있을 때만 묻는다:
 *  - 지원금 상세를 누적 MIN_DETAIL_VIEWS번 이상 봤고
 *  - '신청하러 가기'를 한 번이라도 눌렀고(실제로 도움이 됐을 가능성)
 *  - 마지막 요청(또는 자매 앱 안내 시트)으로부터 간격이 지났고
 *  - 오늘 다른 팝업(자매 앱 시트)을 아직 안 띄웠을 때
 * 만족 여부를 먼저 물어 불만족 사용자를 걸러내는 방식은 쓰지 않는다 — 조건을 만족한 모든 사용자에게 같은 문구로 묻는다.
 *
 * 저장소(localStorage)를 못 쓰는 환경에서는 아예 묻지 않는다(매번 뜨는 것을 막기 위함).
 */
const STATE_KEY = 'benefit:review-state';
export const CROSS_PROMO_DATE_KEY = 'benefit:cross-promo-date';

const MIN_DETAIL_VIEWS = 5;
const MIN_GAP_DAYS = 30;

interface ReviewState {
  views: number;
  applied: boolean;
  /** 마지막으로 평점 요청 팝업을 띄운 날(YYYY-MM-DD) */
  lastAskedDate?: string;
}

const today = () => new Date().toISOString().slice(0, 10);

function read(): ReviewState {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return { views: 0, applied: false, ...(JSON.parse(raw) as Partial<ReviewState>) };
  } catch {
    /* 무시 */
  }
  return { views: 0, applied: false };
}

function write(state: ReviewState): boolean {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** 지원금 상세를 열 때마다 호출 */
export function recordDetailView(): void {
  const s = read();
  write({ ...s, views: s.views + 1 });
}

/** '신청하러 가기'를 눌렀을 때 호출 */
export function recordApplyClick(): void {
  const s = read();
  if (!s.applied) write({ ...s, applied: true });
}

function daysSince(date: string): number {
  return (Date.parse(today()) - Date.parse(date)) / 86_400_000;
}

/** 지금 평점 요청 팝업을 띄워도 되는지(조건을 만족하면 true, 띄운 것으로 기록은 markAsked에서). */
export function shouldAskReview(): boolean {
  const s = read();
  if (s.views < MIN_DETAIL_VIEWS || !s.applied) return false;
  if (s.lastAskedDate && daysSince(s.lastAskedDate) < MIN_GAP_DAYS) return false;
  try {
    // 오늘 자매 앱 시트를 이미 띄웠다면 팝업이 겹치지 않도록 내일 이후로 미룬다.
    if (localStorage.getItem(CROSS_PROMO_DATE_KEY) === today()) return false;
    return true;
  } catch {
    return false;
  }
}

/** 팝업을 띄운 직후 호출 — 오늘은 자매 앱 시트가 안 뜨고, 30일 동안 다시 묻지 않는다. */
export function markAsked(): void {
  const s = read();
  write({ ...s, lastAskedDate: today() });
  try {
    localStorage.setItem(CROSS_PROMO_DATE_KEY, today());
  } catch {
    /* 무시 */
  }
}
