/** 같은 링크를 연달아 눌러도 한 번만 열리도록 하는 최소 간격(ms) */
const DOUBLE_TAP_GUARD_MS = 1500;
let lastOpenAt = 0;

/**
 * 외부 링크를 `openURL`(React Native `Linking.openURL`)로 한 번만 연다.
 *
 * `openURL`이 성공하면 이미 열린 것이므로 그 뒤에 다시 열지 않는다. 예전 구현은 응답이 1.5초 안에
 * 오지 않으면 "실패"로 보고 `window.open`으로 한 번 더 열었는데, 그 결과 외부 창과 미니앱 화면 자체의
 * 이동이 동시에 일어나 뒤로가기가 되지 않는 문제가 있었다. 폴백(`window.open`)은 `openURL` 호출이
 * 실제로 거부됐을 때(브라우저 미리보기 등 토스 앱 밖)에만 쓴다.
 */
export async function openExternal(url: string): Promise<void> {
  const now = Date.now();
  if (now - lastOpenAt < DOUBLE_TAP_GUARD_MS) return;
  lastOpenAt = now;

  try {
    const { openURL } = await import('@apps-in-toss/web-framework');
    await openURL(url);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
