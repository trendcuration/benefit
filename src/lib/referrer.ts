import { getSchemeUri } from '@apps-in-toss/web-framework';

/**
 * 최초 진입 스킴의 referrer가 benefit_tab인지 확인한다(혜택탭 경유 진입 여부).
 * 참고: https://developers-apps-in-toss.toss.im/documentation/common/growth/analytics/referrer.md
 * getSchemeUri() 파싱에 실패하면 false로 처리한다(수동 선택 화면 그대로 유지).
 */
export function isFromBenefitTab(): boolean {
  try {
    return new URL(getSchemeUri()).searchParams.get('referrer') === 'benefit_tab';
  } catch {
    return false;
  }
}
