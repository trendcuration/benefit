import { TossAds, loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

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

/* ------------------------------- 배너광고 ------------------------------- */

let bannerInitPromise: Promise<boolean> | null = null;

/**
 * TossAds 배너 SDK 초기화. onInitialized 콜백을 기다린 뒤에 attachBanner 해야 배너가 뜬다
 * (초기화 전에 attachBanner부터 부르면 조용히 아무것도 안 뜬다 — 다른 자매앱들에서 이미
 * 겪은 문제). 중복 호출 안전.
 */
function ensureBannerInit(): Promise<boolean> {
  if (bannerInitPromise) return bannerInitPromise;
  bannerInitPromise = new Promise<boolean>((resolve) => {
    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };
    try {
      if (!isSupported(TossAds.initialize)) {
        done(false);
        return;
      }
      // 콜백이 안 오는 환경 대비 폴백(3초 뒤 그냥 진행)
      setTimeout(() => done(true), 3000);
      TossAds.initialize({
        callbacks: {
          onInitialized: () => done(true),
          onInitializationFailed: () => done(false),
        },
      });
    } catch {
      done(false);
    }
  });
  return bannerInitPromise;
}

/**
 * 배너를 target에 붙인다. 초기화 완료를 기다린 뒤 attach하며, 해제 함수를 돌려준다.
 * 미지원이거나 초기화 실패면 no-op 해제 함수를 반환한다.
 */
export async function attachBanner(adGroupId: string, target: HTMLElement): Promise<() => void> {
  if (!adGroupId) return () => {};
  const ready = await ensureBannerInit();
  if (!ready || !isSupported(TossAds.attachBanner)) return () => {};
  try {
    const result = TossAds.attachBanner(adGroupId, target);
    return () => {
      try {
        result.destroy();
      } catch {
        /* ignore */
      }
    };
  } catch {
    return () => {};
  }
}
