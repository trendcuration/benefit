/**
 * TossAds.attachBanner()는 initialize()로 광고 SDK를 먼저 불러오지 않으면
 * "Call initialize() before attaching an ad" 에러로 조용히 실패합니다.
 */
export function attachTossBanner(
  adGroupId: string,
  el: HTMLElement,
  onResult: (result: { destroy: () => void } | undefined) => void
) {
  let cancelled = false;
  import('@apps-in-toss/web-framework')
    .then(({ TossAds }) => {
      if (cancelled || !TossAds.attachBanner.isSupported()) return;
      TossAds.initialize({
        callbacks: {
          onInitialized: () => {
            if (cancelled) return;
            onResult(TossAds.attachBanner(adGroupId, el));
          },
        },
      });
    })
    .catch(() => {});
  return () => {
    cancelled = true;
  };
}
