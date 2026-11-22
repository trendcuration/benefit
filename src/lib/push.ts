/**
 * 매주 월요일 12시 '새 지원금' 알림 동의.
 * 정부24 데이터가 토요일 04:30에 갱신되므로(scripts/gov24-publish.sh) 그다음 월요일에 알린다.
 * 콘솔: 알림동의문 132719(매주 월 12시), 정기 템플릿 202523 benefit-weekly-new(2026-10-26).
 *
 * 알림을 처음 켠 사람에게 3원을 준다 — 콘솔 프로모션 219393(새 지원금 알림 동의하고 3원 받기, 2026-11-22).
 * 혜택탭 포인트 미션 '알림 동의하기'를 누르면 intoss://benefit/?src=alarm_mission 으로 들어온다.
 */
import { getSchemeUri, Notification, Promotion } from '@apps-in-toss/web-framework';
import { logClick } from './analytics';

/** 콘솔 프로모션 코드. 비우면 지급하지 않고 "3원" 문구도 숨긴다. 어긋나면 지급이 전부 실패한다. */
const LIVE_PROMOTION_CODE: string = '01M80GYFPRQFW8YBFMBVABE0M6';
/** `VITE_PROMOTION_TEST=1` 빌드에서만 true — TEST_ 코드로 지급을 한 번 성공시켜야 프로모션을 시작할 수 있다. 검수 제출 금지. */
export const IS_PROMOTION_TEST = import.meta.env.VITE_PROMOTION_TEST === '1';
const PROMOTION_CODE = IS_PROMOTION_TEST ? `TEST_${LIVE_PROMOTION_CODE}` : LIVE_PROMOTION_CODE;
export const PUSH_REWARD_AMOUNT = 3;
const REWARDED_KEY = 'benefit:weekly-push-rewarded';

/** 아직 3원을 받을 수 있는 기기인지(문구에 "3원"을 붙일지). */
export function pushRewardAvailable(): boolean {
  if (LIVE_PROMOTION_CODE === '') return false;
  if (IS_PROMOTION_TEST) return true;
  try {
    return localStorage.getItem(REWARDED_KEY) !== '1';
  } catch {
    return false;
  }
}

/** 3원 지급. 기기당 한 번 — 결과를 알기 전에 "시도함"을 먼저 적어 두어 두 번 주지 않는다. */
async function grantPushReward(): Promise<boolean> {
  if (!pushRewardAvailable()) return false;
  try {
    localStorage.setItem(REWARDED_KEY, '1');
  } catch {
    return false;
  }
  try {
    if (!Promotion.grantReward.isSupported()) {
      logClick('promo_grant_unsupported');
      return false;
    }
    await Promotion.grantReward({ promotionCode: PROMOTION_CODE, amount: PUSH_REWARD_AMOUNT });
    logClick(`promo_grant_ok_${PUSH_REWARD_AMOUNT}`);
    return true;
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : 'unknown';
    logClick(`promo_grant_err_${code.replace(/[^A-Za-z0-9]/g, '_').slice(0, 40).toLowerCase()}`);
    return false;
  }
}

/** 혜택탭 미션 '알림 동의하기'로 들어왔는지. */
export function cameFromAlarmMission(): boolean {
  try {
    if (new URL(getSchemeUri()).searchParams.get('src') === 'alarm_mission') return true;
  } catch {
    /* 토스 앱 밖 */
  }
  try {
    return new URLSearchParams(window.location.search).get('src') === 'alarm_mission';
  } catch {
    return false;
  }
}

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

export type PushResult = 'rewarded' | 'agreed' | 'rejected' | 'error';

/**
 * 동의 화면을 띄우고 결과를 돌려준다. 새로 동의한 사람에게만 3원을 준다
 * (이미 받고 있던 사람은 주지 않는다 — 테스트 번들만 예외).
 */
export function requestWeeklyPush(): Promise<PushResult> {
  return new Promise<'newAgreement' | 'alreadyAgreed' | 'agreementRejected' | 'error'>((resolve) => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = Notification.requestAgreement({
        options: { templateCode: WEEKLY_PUSH_TEMPLATE },
        onEvent: (r) => {
          cleanup?.();
          resolve(r.type);
        },
        onError: () => {
          cleanup?.();
          resolve('error');
        },
      });
    } catch {
      resolve('error');
    }
  }).then(async (type) => {
    if (type === 'error') return 'error';
    if (type === 'agreementRejected') return 'rejected';
    markAgreed();
    if (type === 'newAgreement' || IS_PROMOTION_TEST) {
      logClick(type === 'newAgreement' ? 'alarm_agree_new' : 'alarm_agree_already');
      if (await grantPushReward()) return 'rewarded';
    } else {
      logClick('alarm_agree_already');
    }
    return 'agreed';
  });
}
