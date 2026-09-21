import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

export const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

const MIN_GAP_MS = 60_000;
/** 광고 로드를 기다리는 최대 시간. 넘기면 이번엔 광고 없이 진행한다(노출 중엔 타임아웃 없음). */
const LOAD_TIMEOUT_MS = 5000;
/** 노출 중 이벤트가 끝내 안 오는 최악의 경우에도 화면이 멈추지 않게 하는 안전장치. */
const SHOW_SAFETY_MS = 90_000;

function isSupported(api: { isSupported: () => boolean }): boolean {
  try {
    return api.isSupported();
  } catch {
    return false;
  }
}

let lastShownAt = 0;
let state: 'idle' | 'loading' | 'loaded' = 'idle';
let waiters: (() => void)[] = [];

function flushWaiters() {
  const pending = waiters;
  waiters = [];
  pending.forEach((cb) => cb());
}

/** 앱 진입 시 미리 로드해 두면 검색 시점에 지연 없이 보여줄 수 있다. */
export function preloadInterstitial(): void {
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
        state = 'idle';
        flushWaiters();
      },
    });
  } catch {
    state = 'idle';
    flushWaiters();
  }
}

/**
 * 지금 전면광고를 보여줄 수 있는지(지원 여부 + 직전 광고와의 최소 간격).
 * true일 때만 호출부가 "광고가 나와요" 안내 화면을 보여주고 showInterstitialAndWait()를 호출해야 한다.
 */
export function shouldShowInterstitial(): boolean {
  if (Date.now() - lastShownAt < MIN_GAP_MS) return false;
  return isSupported(loadFullScreenAd) && isSupported(showFullScreenAd);
}

/** 전면광고를 보여주고 광고가 끝나면(닫힘/실패/로드 지연) resolve. 결과 화면은 resolve 이후에 띄운다. */
export function showInterstitialAndWait(): Promise<void> {
  if (!shouldShowInterstitial()) return Promise.resolve();

  return new Promise<void>((resolve) => {
    let settled = false;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(safetyTimer);
      resolve();
    };

    const show = () => {
      if (settled) return;
      if (state !== 'loaded') {
        finish();
        return;
      }
      state = 'idle'; // 소모됨 — 노출 후 재로드 필요
      safetyTimer = setTimeout(finish, SHOW_SAFETY_MS);
      try {
        showFullScreenAd({
          options: { adGroupId: INTERSTITIAL_AD_ID },
          onEvent: (e) => {
            if (e.type === 'show' || e.type === 'impression') lastShownAt = Date.now();
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

    const loadTimer = setTimeout(finish, LOAD_TIMEOUT_MS);
    waiters.push(() => {
      clearTimeout(loadTimer);
      show();
    });
    preloadInterstitial();
    if (state === 'idle') finish(); // 로드를 시작하지 못한 경우
  }).finally(() => {
    preloadInterstitial(); // 다음 검색을 위해 다시 로드
  });
}
