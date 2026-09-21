import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

export const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

function isSupported(api: { isSupported: () => boolean }): boolean {
  try {
    return api.isSupported();
  } catch {
    return false;
  }
}

/**
 * 결과 화면 전환 전에 보여주는 전면광고. 반드시 호출부에서 "광고가 나와요" 안내를 먼저 보여준 뒤 호출할 것.
 * 광고 노출이 끝나면(닫힘/실패 모두) resolve하므로, 그 뒤에 결과 화면으로 넘어가면 광고가 결과 위로
 * 뒤늦게 끼어드는 일이 없다. 로드가 안 되거나(광고 없음) 미지원 환경이면 짧은 타임아웃 후 그냥 진행한다.
 */
export function showInterstitialAndWait(adGroupId = INTERSTITIAL_AD_ID, loadTimeoutMs = 6000): Promise<void> {
  if (!adGroupId || !isSupported(loadFullScreenAd) || !isSupported(showFullScreenAd)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const loadTimer = setTimeout(finish, loadTimeoutMs);

    try {
      loadFullScreenAd({
        options: { adGroupId },
        onEvent: (event) => {
          if (event.type !== 'loaded') return;
          clearTimeout(loadTimer);
          try {
            showFullScreenAd({
              options: { adGroupId },
              onEvent: (e) => {
                if (e.type === 'dismissed' || e.type === 'failedToShow') finish();
              },
              onError: finish,
            });
          } catch {
            finish();
          }
        },
        onError: finish,
      });
    } catch {
      finish();
    }
  });
}
