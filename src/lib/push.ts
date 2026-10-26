/**
 * 매주 월요일 12시 '새 지원금' 알림 동의.
 * 정부24 데이터가 토요일 04:30에 갱신되므로(scripts/gov24-publish.sh) 그다음 월요일에 알린다.
 * 콘솔: 알림동의문 132719(매주 월 12시), 정기 템플릿 202523 benefit-weekly-new(2026-10-26).
 */
import { Notification } from '@apps-in-toss/web-framework';

export const WEEKLY_PUSH_TEMPLATE = 'benefit-weekly-new';
const AGREED_KEY = 'benefit:weekly-push-agreed';

export function pushSupported(): boolean {
  try {
    return Notification.requestAgreement.isSupported();
  } catch {
    return false;
  }
}

/** 이 기기에서 이미 동의했는지(동의 카드를 다시 보여주지 않기 위함). */
export function isPushAgreed(): boolean {
  try {
    return localStorage.getItem(AGREED_KEY) === '1';
  } catch {
    return false;
  }
}

function markAgreed(): void {
  try {
    localStorage.setItem(AGREED_KEY, '1');
  } catch {
    /* 저장 실패는 무시 — 다음 방문에 카드가 한 번 더 보일 뿐 */
  }
}

const POPUP_KEY = 'benefit:weekly-push-popup';
/** 팝업은 일주일에 한 번까지, 모두 3번까지만 띄운다(매번 뜨면 피로해서 이탈한다). */
const POPUP_GAP_MS = 7 * 24 * 60 * 60 * 1000;
const POPUP_MAX_TIMES = 3;

/** 알림 안내 팝업을 지금 띄워도 되는지. 저장소를 못 쓰면 매번 뜨는 걸 막기 위해 띄우지 않는다. */
export function canShowPushPopup(): boolean {
  if (!pushSupported() || isPushAgreed()) return false;
  try {
    const raw = localStorage.getItem(POPUP_KEY);
    if (!raw) return true;
    const { at, times } = JSON.parse(raw) as { at: number; times: number };
    return times < POPUP_MAX_TIMES && Date.now() - at >= POPUP_GAP_MS;
  } catch {
    return false;
  }
}

export function markPushPopupShown(): void {
  try {
    const raw = localStorage.getItem(POPUP_KEY);
    const times = raw ? ((JSON.parse(raw) as { times?: number }).times ?? 0) : 0;
    localStorage.setItem(POPUP_KEY, JSON.stringify({ at: Date.now(), times: times + 1 }));
  } catch {
    /* 저장 실패는 무시 */
  }
}

/** 동의 화면을 띄우고 결과를 돌려준다. 실패하면 'error'. */
export function requestWeeklyPush(): Promise<'agreed' | 'rejected' | 'error'> {
  return new Promise((resolve) => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = Notification.requestAgreement({
        options: { templateCode: WEEKLY_PUSH_TEMPLATE },
        onEvent: (r) => {
          cleanup?.();
          if (r.type === 'agreementRejected') {
            resolve('rejected');
            return;
          }
          markAgreed();
          resolve('agreed');
        },
        onError: () => {
          cleanup?.();
          resolve('error');
        },
      });
    } catch {
      resolve('error');
    }
  });
}
