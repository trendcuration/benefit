/**
 * 혜택 탭 프로모션 리워드 지급 — "혜택탭에서 들어온 사람 중 실제 광고를 본 사람"에게만 10원.
 *
 * 혜택 탭 카드의 랜딩 URL에 `src=benefit_tab` 마커를 심어뒀다. 자체 진입(아이콘·공유 링크
 * 등)은 이 마커가 없어 애초에 리워드 CTA 자체가 안 보인다. "광고를 봤다"는 보상형
 * 광고(RewardedAd)의 `userEarnedReward` 이벤트로만 판정한다 — 일반 전면광고의
 * dismissed/failedToShow는 끝까지 봤는지 구분이 안 돼서 쓸 수 없다(low-price-shop/
 * promotion-guide 세션에서 확인한 제약과 동일한 이유로, 여기서는 처음부터 보상형
 * 광고로 설계).
 */
export const PROMOTION_CODE = '01M3TG23DSZMMT5GD16MGASE80';
const REWARD_AMOUNT = 10;
const BENEFIT_TAB_MARKER = 'src=benefit_tab';
const CLAIMED_STORAGE_KEY = 'benefit_tab_ad_reward_claimed';
/** 지역 비교 잠금해제와 같은 보상형 광고 지면을 재사용한다(ResultPage.tsx REGION_REWARD_AD_ID). */
const AD_GROUP_ID = 'ait.v2.live.75f767ef7002430e';

export type ClaimResult = 'granted' | 'ad_not_watched' | 'unsupported' | 'already_claimed' | 'error';

/** 혜택 탭 카드를 거쳐 들어왔는지 — 앱 최초 진입 URL에 마커가 있는지로 판정. */
export async function cameFromBenefitTab(): Promise<boolean> {
  try {
    const { Environment } = await import('@apps-in-toss/web-framework');
    return !!Environment.initialURL?.includes(BENEFIT_TAB_MARKER);
  } catch {
    return false;
  }
}

/** 이미 지급받았는지(기기 기준). */
export async function hasClaimedBenefitTabReward(): Promise<boolean> {
  try {
    const { Storage } = await import('@apps-in-toss/web-framework');
    return !!(await Storage.getItem(CLAIMED_STORAGE_KEY));
  } catch {
    return false;
  }
}

/**
 * 보상형 광고를 띄우고, 끝까지 봤을 때만(userEarnedReward) 리워드를 지급한다.
 * 호출 전에 "탭하면 광고가 나와요" 안내를 이미 보여줬다는 전제.
 */
export function watchAdAndClaimReward(onSettle: (result: ClaimResult) => void): void {
  import('@apps-in-toss/web-framework')
    .then(({ loadFullScreenAd, showFullScreenAd, Promotion, Storage }) => {
      if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported() || !Promotion.grantReward.isSupported()) {
        onSettle('unsupported');
        return;
      }

      const finishWithGrant = () => {
        Storage.setItem(CLAIMED_STORAGE_KEY, 'true')
          .catch(() => {})
          .finally(() => {
            Promotion.grantReward({ promotionCode: PROMOTION_CODE, amount: REWARD_AMOUNT })
              .then(() => onSettle('granted'))
              .catch(() => onSettle('error'));
          });
      };

      loadFullScreenAd({
        options: { adGroupId: AD_GROUP_ID },
        onEvent: (event) => {
          if (event.type !== 'loaded') return;
          showFullScreenAd({
            options: { adGroupId: AD_GROUP_ID },
            onEvent: (e) => {
              if (e.type === 'userEarnedReward') finishWithGrant();
              else if (e.type === 'dismissed' || e.type === 'failedToShow') onSettle('ad_not_watched');
            },
            onError: () => onSettle('error'),
          });
        },
        onError: () => onSettle('error'),
      });
    })
    .catch(() => onSettle('error'));
}
