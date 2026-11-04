/**
 * 신청기간 문구에서 마감일을 뽑는다.
 * 직접 정리한 지원금은 'YYYY-MM-DD', 정부24는 '2026.11.30', '2026년 11월 30일', '~ 2026. 11. 30.' 같은
 * 자유 문구라서, 연도가 붙은 날짜 중 가장 늦은 날을 마감일로 본다. 연도가 없으면 마감일을 모르는 것으로 둔다
 * (해마다 반복되는 사업이 많아서 올해로 짐작하면 틀린 D-day가 붙는다).
 */
const FULL_DATE = /(20\d{2})\s*[.\-/년]\s*(\d{1,2})\s*[.\-/월]\s*(\d{1,2})/g;

export function parseDeadline(text: string): Date | null {
  if (!text) return null;
  let latest: Date | null = null;
  for (const m of text.matchAll(FULL_DATE)) {
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (mo < 1 || mo > 12 || d < 1 || d > 31) continue;
    const date = new Date(y, mo - 1, d, 23, 59, 59);
    if (!latest || date > latest) latest = date;
  }
  return latest;
}

/** 마감까지 남은 날. 마감일을 모르거나 이미 지났으면 null. */
export function daysLeft(date: Date | null, now = Date.now()): number | null {
  if (!date) return null;
  const days = Math.ceil((date.getTime() - now) / 86_400_000);
  return days < 0 ? null : days;
}

export function ddayLabel(days: number | null): string | null {
  if (days == null) return null;
  return days === 0 ? 'D-day' : `D-${days}`;
}

/** 이 날 수 안에 마감하면 '마감 임박'으로 보여준다. */
export const URGENT_DAYS = 14;
