/**
 * 혜택 탭 프로모션 리워드 지급 — "혜택탭에서 들어와 내 순위 확인까지 마친 사람"에게만 10원.
 *
 * 혜택 탭 카드의 랜딩 URL에 `src=benefit_tab` 마커를 심어뒀다. 자체 진입(아이콘·공유 링크
 * 등)은 이 마커가 없어 지급되지 않는다. 결과 화면에 도달했다는 것 자체가 "실제로 써본
 * 사람"의 증거라, 결과 화면 노출(result_view) 시점에 지급한다.
 *
 * 광고 시청을 리워드 조건으로 쓰지 않는다 — 애드몹 정책상 광고 시청에 대한 별도 포인트
 * 지급은 허용되지 않는다(실제로 그렇게 만들었던 이전 버전은 토스 자체 검토에서도
 * 자동 반려됐다). 입력→결과 전환 과정에 전면광고가 끼어 있지만 그건 기존 판정 흐름의
 * 일부일 뿐, 이 프로모션의 지급 조건과는 무관하다.
 */
export const PROMOTION_CODE = '01M3TGCZ5VFFMXTXESNPYPRJCE';
const REWARD_AMOUNT = 10;
const BENEFIT_TAB_MARKER = 'src=benefit_tab';
const CLAIMED_STORAGE_KEY = 'benefit_tab_reward_claimed';

export async function claimBenefitTabRewardIfEligible(): Promise<void> {
  try {
    const { Environment, Promotion, Storage } = await import('@apps-in-toss/web-framework');

    const initialUrl = Environment.initialURL;
    if (!initialUrl || !initialUrl.includes(BENEFIT_TAB_MARKER)) return;
    if (!Promotion.grantReward.isSupported()) return;

    const alreadyClaimed = await Storage.getItem(CLAIMED_STORAGE_KEY);
    if (alreadyClaimed) return;

    // 중복 지급 방지 로직은 파트너 책임이라, 지급 성공 여부를 확정하기 전에 먼저
    // "지급 시도함"으로 기록한다(실패 시 그 1회는 못 받지만, 두 번 지급되는 것보다 안전).
    await Storage.setItem(CLAIMED_STORAGE_KEY, 'true');
    await Promotion.grantReward({ promotionCode: PROMOTION_CODE, amount: REWARD_AMOUNT });
  } catch {
    // 리워드 지급 실패가 결과 확인을 막으면 안 된다 — 조용히 무시.
  }
}
