import { getSchemeUri } from '@apps-in-toss/web-framework';

/**
 * 혜택탭 미션 카드의 landingUrl에 우리가 직접 심어둔 값.
 * 콘솔 프로모션의 benefitTabSpec.landingUrl이 `intoss://benefit/?src=benefit_mission`
 * 으로 등록돼 있어야 하며, 두 값이 어긋나면 지급이 전혀 일어나지 않는다.
 */
const BENEFIT_MISSION_SRC = 'benefit_mission';

/**
 * 혜택탭 미션 카드를 눌러 들어온 진입인지 확인한다.
 *
 * 과거에는 토스가 붙여주는 referrer 파라미터(`referrer` → `toss_referrer`)를 읽었는데,
 * 이름이 문서와 달라 한 번 통째로 깨졌고(2026-10-02 수정) 혜택탭에서의 값 형식도
 * 실측하지 못해 그 뒤로도 지급이 0건이었다. 그래서 토스 내부 파라미터에 기대지 않고
 * 우리가 landingUrl에 심은 `src` 값만 본다 — 토스가 형식을 바꿔도 깨지지 않고,
 * 혜택탭의 다른 경로가 아니라 '미션 카드 경유'만 정확히 걸러낸다.
 *
 * getSchemeUri() 파싱에 실패하면 false로 처리한다(리워드 안내를 띄우지 않을 뿐,
 * 앱 기능은 그대로 쓸 수 있다).
 */
export function isFromBenefitMission(): boolean {
  try {
    return new URL(getSchemeUri()).searchParams.get('src') === BENEFIT_MISSION_SRC;
  } catch {
    return false;
  }
}
