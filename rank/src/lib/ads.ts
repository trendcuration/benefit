import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

export const INTERSTITIAL_AD_ID = 'ait.v2.live.b8ff888fe7524f5c';

function isSupported(api: { isSupported: () => boolean }): boolean {
  try {
    return api.isSupported();
  } catch {
    return false;
  }
}

/**
 * 전면광고 프리로드 상태.
 *
 * 광고 SDK는 앱 세션의 첫 로드 요청이 초기화 중이라 실패·지연이 잦다("첫 판정엔 안 뜨고 두 번째부터 뜬다").
 * 그래서 입력 화면 진입 시점부터 미리 로드해 두고, 광고를 보여준 뒤에는 다음 판정을 위해 다시 프리로드한다.
 */
let state: 'idle' | 'loading' | 'loaded' = 'idle';
let waiters: (() => void)[] = [];

function flushWaiters() {
  const pending = waiters;
  waiters = [];
  pending.forEach((cb) => cb());
}

export function preloadInterstitial() {
  if (state !== 'idle') return;
  if (!isSupported(loadFullScreenAd) || !isSupported(showFullScreenAd)) return;
  state = 'loading';
  try {
    loadFullScreenAd({
      options: { adGroupId: INTERSTITIAL_AD_ID },
      onEvent: (event) => {
        if (event.type !== 'loaded') return;
        state = 'loaded';
        flushWaiters();
      },
      onError: () => {
        state = 'idle'; // 다음 시도에서 재시도 가능하도록
        flushWaiters();
      },
    });
  } catch {
    state = 'idle';
    flushWaiters();
  }
}

/**
 * 결과 화면으로 넘어가기 전 전면광고를 보여주고, 광고가 끝나면(닫힘/실패/로드 지연 모두) resolve한다.
 * 호출부에서 "광고가 나와요" 안내를 먼저 보여준 뒤 호출할 것. 결과 화면은 resolve 이후에 띄우므로
 * 광고가 결과 화면 위로 뒤늦게 끼어들지 않는다. 미지원 환경이거나 로드가 안 되면 광고 없이 진행한다.
 */
export function showInterstitialAndWait(loadTimeoutMs = 4000): Promise<void> {
  if (!isSupported(loadFullScreenAd) || !isSupported(showFullScreenAd)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const show = () => {
      if (settled) return;
      if (state !== 'loaded') {
        finish();
        return;
      }
      state = 'idle'; // 소모됨 — 다음 판정을 위해 재프리로드 필요
      try {
        showFullScreenAd({
          options: { adGroupId: INTERSTITIAL_AD_ID },
          onEvent: (e) => {
            if (e.type === 'dismissed' || e.type === 'failedToShow') finish();
          },
          onError: finish,
        });
      } catch {
        finish();
      }
    };

    if (state === 'loaded') {
      show();
      return;
    }

    const timer = setTimeout(finish, loadTimeoutMs);
    waiters.push(() => {
      clearTimeout(timer);
      show();
    });
    preloadInterstitial();
    if (state === 'idle') finish(); // 프리로드가 시작되지 못한 경우
  });
}
