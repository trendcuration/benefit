import { useEffect, useState } from 'react';
import { InputPage } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';
import type { AgeGroup, Metric, Region } from './data/percentiles';

const INTERSTITIAL_AD_ID = 'ait.v2.live.b8ff888fe7524f5c';

type Page = 'input' | 'loading' | 'result';

export interface JudgeParams {
  metric: Metric;
  ageGroup: AgeGroup;
  region: Region;
  /** 판정 금액(만원). 소득은 연 환산 총급여, 순자산은 입력값 그대로 */
  value: number;
  /** 결과 화면에 표시할 입력 요약 (예: "월급 300만원") */
  inputLabel: string;
}

/**
 * 전면광고 프리로드/노출 컨트롤러.
 *
 * 이전 구현은 "제출하는 순간"에야 loadFullScreenAd를 호출했다. 광고 SDK(AdMob 계열
 * 미디에이션)는 앱 세션의 첫 요청이 초기화 중이라 로드 실패·지연이 잦고, 두 번째
 * 요청부터 안정적으로 뜨는 경우가 흔하다 — "첫 검색엔 안 뜨고 두 번째부터 뜬다"는
 * 증상이 정확히 이 패턴이다.
 *
 * 그래서 입력 화면이 뜨는 시점(=앱 진입 직후)부터 미리 로드를 시작해, 유저가 금액을
 * 입력하는 몇 초 동안 백그라운드에서 준비가 끝나도록 한다. 제출 시점엔 이미 로드된
 * 광고를 보여주기만 하면 되고, 보여준 뒤에는 다음 판정을 위해 즉시 다시 프리로드한다.
 */
let adState: 'idle' | 'loading' | 'loaded' = 'idle';
let onLoadedCallbacks: (() => void)[] = [];

function preloadInterstitial() {
  if (adState !== 'idle') return;
  adState = 'loading';
  import('@apps-in-toss/web-framework')
    .then(({ loadFullScreenAd }) => {
      if (!loadFullScreenAd.isSupported()) {
        adState = 'idle';
        return;
      }
      loadFullScreenAd({
        options: { adGroupId: INTERSTITIAL_AD_ID },
        onEvent: (event) => {
          if (event.type === 'loaded') {
            adState = 'loaded';
            onLoadedCallbacks.forEach((cb) => cb());
            onLoadedCallbacks = [];
          }
        },
        onError: () => {
          adState = 'idle'; // 다음 시도에서 재시도 가능하도록
          onLoadedCallbacks.forEach((cb) => cb());
          onLoadedCallbacks = [];
        },
      });
    })
    .catch(() => {
      adState = 'idle';
      onLoadedCallbacks.forEach((cb) => cb());
      onLoadedCallbacks = [];
    });
}

/** 이미 로드돼 있으면 즉시, 아니면 로드를 기다리되 timeoutMs를 넘기면 광고 없이 진행 */
function waitForInterstitial(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    if (adState === 'loaded') {
      resolve();
      return;
    }
    preloadInterstitial();
    const timer = setTimeout(resolve, timeoutMs);
    onLoadedCallbacks.push(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

function showInterstitialIfReady() {
  if (adState !== 'loaded') return;
  import('@apps-in-toss/web-framework')
    .then(({ showFullScreenAd }) => {
      showFullScreenAd({
        options: { adGroupId: INTERSTITIAL_AD_ID },
        onEvent: () => {},
        onError: () => {},
      });
    })
    .catch(() => {});
  adState = 'idle'; // 소모됨 — 다음 판정을 위해 재프리로드 필요
}

export function App() {
  const [page, setPage] = useState<Page>('input');
  const [params, setParams] = useState<JudgeParams | null>(null);

  // 입력 화면 진입 시점부터 미리 로드 시작 (유저가 입력하는 동안 백그라운드에서 준비)
  useEffect(() => {
    preloadInterstitial();
  }, []);

  const handleSubmit = async (next: JudgeParams) => {
    setParams(next);
    setPage('loading');
    // 이미 로드돼 있으면 거의 즉시 통과, 아니어도 최대 2.5초까지만 기다린다
    await Promise.all([waitForInterstitial(2500), new Promise((r) => setTimeout(r, 900))]);
    showInterstitialIfReady();
    preloadInterstitial(); // 다음 판정("다른 항목도 판정하기")을 위해 바로 재프리로드
    setPage('result');
  };

  return (
    <>
      {page === 'input' && <InputPage onSubmit={(next) => void handleSubmit(next)} />}
      {page === 'loading' && (
        <div style={loadingStyle}>
          <div style={spinnerStyle} />
          <p style={{ color: '#6B7684', fontSize: 15 }}>내 순위를 계산하는 중이에요…</p>
        </div>
      )}
      {page === 'result' && params && (
        <ResultPage params={params} onBack={() => setPage('input')} />
      )}
    </>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  minHeight: '100dvh',
  backgroundColor: '#F2F4F6',
};

const spinnerStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  border: '4px solid #E5E8EB',
  borderTopColor: '#3182F6',
  borderRadius: '50%',
  animation: 'spin 0.9s linear infinite',
};
