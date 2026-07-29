export const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

const REQUEST_COOLDOWN_MS = 3000;
const SETTLE_TIMEOUT_MS = 8000;
let lastRequestedAt = 0;

// 전면광고를 요청합니다. 광고가 닫히거나(dismissed/failedToShow), 미지원/실패/쿨다운으로
// 애초에 뜨지 않는 경우 onSettled를 정확히 한 번 호출합니다. 화면 전환처럼 광고 노출과
// 동시에 일어나면 광고 시청을 방해할 수 있는 후속 동작은 onSettled 안에서 실행하세요.
// 광고가 응답이 없는 극단적인 경우를 대비해 최대 8초 후에는 강제로 settle됩니다.
export function showInterstitialAd(onSettled?: () => void) {
  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    onSettled?.();
  };

  const now = Date.now();
  if (now - lastRequestedAt < REQUEST_COOLDOWN_MS) {
    settle();
    return;
  }
  lastRequestedAt = now;

  const timeoutId = setTimeout(settle, SETTLE_TIMEOUT_MS);
  const settleNow = () => {
    clearTimeout(timeoutId);
    settle();
  };

  import('@apps-in-toss/web-framework').then(({ loadFullScreenAd, showFullScreenAd }) => {
    if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported()) {
      settleNow();
      return;
    }
    loadFullScreenAd({
      options: { adGroupId: INTERSTITIAL_AD_ID },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          showFullScreenAd({
            options: { adGroupId: INTERSTITIAL_AD_ID },
            onEvent: (adEvent) => {
              if (adEvent.type === 'dismissed' || adEvent.type === 'failedToShow') settleNow();
            },
            onError: settleNow,
          });
        }
      },
      onError: settleNow,
    });
  }).catch(settleNow);
}
