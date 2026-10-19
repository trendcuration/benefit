import { getSchemeUri } from '@apps-in-toss/web-framework';
import { logImpression } from './analytics';

const LIVE_PROMOTION_CODE = '01M47Z5JVPP9E9W49HAWYYX9FP';
const IS_PROMOTION_TEST = import.meta.env.VITE_PROMOTION_TEST === '1';
const PROMOTION_CODE = IS_PROMOTION_TEST ? `TEST_${LIVE_PROMOTION_CODE}` : LIVE_PROMOTION_CODE;
const REWARD_AMOUNT = 5;
const BENEFIT_TAB_SRC = 'benefit_tab';

/** 혜택탭 카드의 landingUrl(`?src=benefit_tab`)로 들어온 진입인지. 테스트 번들은 카드가 안 보이므로 항상 true. */
function isFromBenefitTab(): boolean {
  if (IS_PROMOTION_TEST) return true;
  try {
    return new URL(getSchemeUri()).searchParams.get('src') === BENEFIT_TAB_SRC;
  } catch {
    return false;
  }
}

let state: 'idle' | 'pending' | 'done' = 'idle';

function toErrorToken(error: unknown): string {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code: unknown }).code)
      : 'unknown';
  return code.replace(/[^A-Za-z0-9]/g, '_').slice(0, 40).toLowerCase() || 'unknown';
}

/**
 * 혜택탭으로 들어와 결과(내 소득 순위) 화면까지 본 사람에게 5원을 지급한다.
 * 하루 1인 한도는 서버가 지킨다(콘솔 한도 10원, 지급 5원). 결과는 로그 이름에 담는다(promo_grant_ok / promo_grant_err_<코드>).
 */
export async function grantBenefitTabReward(): Promise<void> {
  if (state !== 'idle' || !isFromBenefitTab()) return;
  state = 'pending';
  try {
    const { Promotion } = await import('@apps-in-toss/web-framework');
    if (!Promotion.grantReward.isSupported()) {
      state = 'done';
      logImpression('promo_grant_unsupported');
      return;
    }
    await Promotion.grantReward({ promotionCode: PROMOTION_CODE, amount: REWARD_AMOUNT });
    state = 'done';
    logImpression('promo_grant_ok');
  } catch (error) {
    // 이미 받음·한도 초과·예산 소진은 정상적으로 생길 수 있어 사용자에게 보이지 않는다.
    state = 'idle';
    logImpression(`promo_grant_err_${toErrorToken(error)}`);
  }
}
