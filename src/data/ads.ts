export const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

const REQUEST_COOLDOWN_MS = 3000;
let lastRequestedAt = 0;

// 전면광고를 시도하고, 결과를 기다리지 않고 즉시 반환합니다(비차단).
// 같은 세션에서 검색·CTA 등 여러 진입점이 같은 광고 유닛을 짧은 간격으로 중복 요청하는 것을 방지합니다.
export function showInterstitialAd() {
  const now = Date.now();
  if (now - lastRequestedAt < REQUEST_COOLDOWN_MS) return;
  lastRequestedAt = now;

  import('@apps-in-toss/web-framework').then(({ loadFullScreenAd, showFullScreenAd }) => {
    if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported()) return;
    loadFullScreenAd({
      options: { adGroupId: INTERSTITIAL_AD_ID },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          showFullScreenAd({
            options: { adGroupId: INTERSTITIAL_AD_ID },
            onEvent: () => {},
            onError: () => {},
          });
        }
      },
      onError: () => {},
    });
  }).catch(() => {});
}
