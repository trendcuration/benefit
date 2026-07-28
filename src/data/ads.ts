export const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

// 전면광고를 시도하고, 결과를 기다리지 않고 즉시 반환합니다(비차단).
export function showInterstitialAd() {
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
