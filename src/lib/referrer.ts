import { getSchemeUri } from '@apps-in-toss/web-framework';

/**
 * 최초 진입 스킴의 referrer에 benefit_tab이 포함되는지 확인한다(혜택탭 경유 진입 여부).
 * 참고: https://developers-apps-in-toss.toss.im/documentation/common/growth/analytics/referrer.md
 *
 * 실기기 진단으로 실제 파라미터 이름과 값 형식을 확인함(2026-10-02):
 * - 파라미터 이름은 문서/과거 코드에 있던 `referrer`가 아니라 `toss_referrer`.
 * - 값도 "benefit_tab" 단독이 아니라 `{id}_push_{id}`처럼 채널명이 양쪽 id 사이에
 *   끼는 형태(푸시 진입 케이스로 실측)라, 정확히 일치(===)시키지 않고 부분 문자열로 검사한다.
 *
 * getSchemeUri() 파싱에 실패하면 false로 처리한다(수동 선택 화면 그대로 유지).
 */
export function isFromBenefitTab(): boolean {
  try {
    const referrer = new URL(getSchemeUri()).searchParams.get('toss_referrer') ?? '';
    return referrer.includes('benefit_tab');
  } catch {
    return false;
  }
}
