/**
 * 외부 링크를 `openURL`(React Native `Linking.openURL`)로 연다.
 *
 * 동시 재진입(한 번의 탭이 터치+클릭 등으로 두 번 발화하는 경우)만 막고, 서로 다른 링크를
 * 연달아 여는 것은 절대 막지 않는다 — 예전엔 "마지막으로 연 시각부터 1.5초"를 모든 링크에
 * 공통으로 적용하는 쿨다운이었는데, 이 때문에 카드를 하나 연 뒤 1.5초 안에 다른 카드를 누르면
 * 아무 반응이 없어 "링크가 정상적으로 열리지 않는다"는 검수 반려로 이어졌다.
 * `opening` 락은 `openURL` 호출이 실제로 끝날 때(보통 거의 즉시)만 풀리므로 정상적인 연속
 * 탭을 막지 않는다.
 *
 * `openURL`이 성공하면 이미 열린 것이므로 그 뒤에 다시 열지 않는다. 예전 구현은 응답이 1.5초 안에
 * 오지 않으면 "실패"로 보고 `window.open`으로 한 번 더 열었는데, 그 결과 외부 창과 미니앱 화면 자체의
 * 이동이 동시에 일어나 뒤로가기가 되지 않는 문제가 있었다. 폴백(`window.open`)은 `openURL` 호출이
 * 실제로 거부됐을 때(브라우저 미리보기 등 토스 앱 밖)에만 쓴다.
 */
let opening = false;

export async function openExternal(url: string): Promise<void> {
  if (opening) return;
  opening = true;
  try {
    const { openURL } = await import('@apps-in-toss/web-framework');
    await openURL(url);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  } finally {
    opening = false;
  }
}
