import { logClick } from './analytics';

/**
 * 콘솔 프로모션 코드(id 59049, '지원금 자세히 보고 10원 받기'(10/20부터 지급액 5원으로 축소), 1인 1일 한도 10원).
 * 혜택탭 미션 카드의 landingUrl이 `intoss://benefit/?src=benefit_mission`으로 등록돼 있고,
 * referrer.ts의 BENEFIT_MISSION_SRC가 그 값과 일치해야 지급이 일어난다.
 * ⚠️ 프로모션을 새로 만들면 반드시 이 값을 교체한다 — 코드가 어긋나면 지급이 전부 실패한다.
 */
const LIVE_PROMOTION_CODE = '01M43MSF4HJAWJ89CW7H0TES8D';

/**
 * 2026-10-26 추가: '숨은 지원금 찾고 최대 1,000원 받기'(id 144597, 혜택탭 '숨은 지원금 찾기 · 최대 1,000원',
 * landingUrl `intoss://benefit/?src=benefit_mission_max`, 예산 2,700원, 1인 1일 한도 1,000원).
 * 지급액은 pickMaxMissionAmount()가 정한다.
 */
const LIVE_MAX_PROMOTION_CODE = '01M5V3Y3Z4GW7Q4YB0CXD63ATK';

/**
 * 테스트 번들 여부. `VITE_PROMOTION_TEST=1 npm run build` 로만 true가 되고,
 * 플래그 없이 빌드하면 항상 false다 — 테스트 설정이 라이브에 섞일 일이 없다.
 *
 * 프로모션은 시작(RUNNING) 전에 테스트 지급을 한 번 성공시켜야 하는데(콘솔 isTested),
 * 혜택탭 미션 카드는 RUNNING이 돼야 노출된다. 그래서 테스트 시점에는 카드를 눌러
 * `src=benefit_mission`을 받을 방법이 없고, 진입 경로 게이트가 테스트 자체를 막는다.
 * 이 플래그는 그 고리를 끊기 위해 테스트 번들에서만 게이트를 우회하는 데 쓴다
 * (실제 게이트 동작은 출시 후 promo_grant_ok 로그 건수로 검증한다).
 */
export const IS_PROMOTION_TEST = import.meta.env.VITE_PROMOTION_TEST === '1';

/** 테스트 번들에서는 'TEST_' 를 붙인 코드로 호출해야 콘솔 isTested가 기록된다. */
function codeFor(mission: 'fixed' | 'max'): string {
  const live = mission === 'max' ? LIVE_MAX_PROMOTION_CODE : LIVE_PROMOTION_CODE;
  return IS_PROMOTION_TEST ? `TEST_${live}` : live;
}

/**
 * 1회 지급액. 콘솔의 maxSingleRewardAmount·benefitTabSpec.rewardAmount와 반드시 일치해야 한다.
 * (혜택탭을 켠 프로모션은 1인 1회 최대 지급액이 benefitTabSpec.rewardAmount로 저장된다)
 */
const REWARD_AMOUNT = 5;

/**
 * '최대 1,000원' 미션의 지급액. 95% 1원, 4.9% 10원, 0.1% 1,000원(기댓값 약 2.4원).
 * 1,000원은 콘솔 maxSingleRewardAmount·benefitTabSpec.rewardAmount와 같아야 한다(넘으면 지급 실패).
 * 앱 화면에서도 "대부분 1~10원"이라고 미리 밝힌다.
 */
export const MAX_MISSION_TIERS: { amount: number; chance: number }[] = [
  { amount: 1000, chance: 0.001 },
  { amount: 10, chance: 0.049 },
  { amount: 1, chance: 0.95 },
];

/** r은 [0,1) 난수. 테스트에서 고정값을 넣을 수 있게 분리했다. */
export function pickMaxMissionAmount(r: number): number {
  let acc = 0;
  for (const t of MAX_MISSION_TIERS) {
    acc += t.chance;
    if (r < acc) return t.amount;
  }
  return 1;
}

function random01(): number {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] / 2 ** 32;
  } catch {
    return Math.random();
  }
}

export type GrantOutcome = { status: 'ok'; amount: number } | { status: 'failed' } | { status: 'skipped' };

/**
 * 같은 세션에서 중복 호출을 막는 상태.
 * 'done'이 되면 더 시도하지 않고, 실패는 'idle'로 되돌려 다음 상세보기에서 한 번 더 시도한다
 * (하루 1회 한도는 콘솔의 dailyUserRewardLimitAmount가 막아주므로 재시도는 무해하다).
 */
let state: 'idle' | 'pending' | 'done' = 'idle';

/** 로그 이름에 쓸 수 있도록 실패 코드를 안전한 토큰으로 바꾼다. */
function toErrorToken(error: unknown): string {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code: unknown }).code)
      : 'unknown';
  return code.replace(/[^A-Za-z0-9]/g, '_').slice(0, 40).toLowerCase() || 'unknown';
}

/**
 * 지원금 상세보기를 실제로 1건 이상 한 혜택탭 미션 경유자에게 리워드를 지급한다.
 *
 * 성공/실패를 모두 로그 '이름'에 담아 남긴다(promo_grant_ok, promo_grant_err_<코드> 등).
 * 콘솔은 로그 파라미터의 값은 보여주지 않고 로그 이름 목록과 건수는 보여주기 때문에,
 * 이렇게 해두면 배포 후 실제로 지급이 되는지/어떤 코드로 막히는지 콘솔에서 바로 확인할 수 있다.
 */
export function grantSubsidyDetailReward(mission: 'fixed' | 'max'): Promise<GrantOutcome> {
  if (state !== 'idle') return Promise.resolve({ status: 'skipped' } as GrantOutcome);
  state = 'pending';

  return import('@apps-in-toss/web-framework')
    .then(async ({ Promotion }) => {
      if (!Promotion.grantReward.isSupported()) {
        // 토스 앱 버전이 낮아 지급 API 자체를 쓸 수 없는 경우(Android/iOS 5.232.0 미만).
        state = 'done';
        logClick('promo_grant_unsupported');
        return { status: 'skipped' } as GrantOutcome;
      }

      try {
        const amount = mission === 'max' ? pickMaxMissionAmount(random01()) : REWARD_AMOUNT;
        await Promotion.grantReward({ promotionCode: codeFor(mission), amount });
        state = 'done';
        // 'max' 미션은 금액대별로 로그 이름을 나눠 콘솔에서 당첨 분포를 볼 수 있게 한다.
        logClick(mission === 'max' ? `promo_max_grant_ok_${amount}` : 'promo_grant_ok');
        return { status: 'ok', amount } as GrantOutcome;
      } catch (error) {
        // 이미 받음·한도 초과·예산 소진 등은 정상적으로 발생할 수 있어 사용자에게 노출하지 않는다.
        state = 'idle';
        logClick(`${mission === 'max' ? 'promo_max' : 'promo'}_grant_err_${toErrorToken(error)}`);
        return { status: 'failed' } as GrantOutcome;
      }
    })
    .catch(() => {
      state = 'idle';
      logClick('promo_grant_err_import');
      return { status: 'failed' } as GrantOutcome;
    });
}
