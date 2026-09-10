const OPEN_URL_TIMEOUT_MS = 1500;

/**
 * 외부 링크를 토스 외부 브라우저로 엽니다.
 *
 * raw `<a target="_blank">` 는 토스 웹뷰에서 동작하지 않거나 웹뷰 안에서 열려
 * 비(非)토스 도메인이 렌더링될 수 있어, `@apps-in-toss/web-framework` 의 `openURL` 을
 * 우선 사용하고 실패 시에만 `window.open` 으로 폴백합니다.
 */
export async function openExternal(url: string): Promise<void> {
  try {
    const { openURL } = await import('@apps-in-toss/web-framework');
    await Promise.race([
      openURL(url),
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('openURL timeout')), OPEN_URL_TIMEOUT_MS);
      }),
    ]);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
