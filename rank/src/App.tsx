import { useState } from 'react';
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
 * 전면광고 노출.
 * 이전 구현은 광고 로드와 동시에 결과 화면으로 넘어가서, 로드가 늦으면 광고가
 * 뜨기도 전에 유저가 결과를 보고 있어 노출이 누락됐다(임프레션당 유저 비율 0.4~0.98로 들쭉날쭉).
 * 로딩 화면에서 광고 로드를 기다린 뒤 넘어가도록 Promise로 감싼다.
 */
function showInterstitialAd(): Promise<void> {
  return new Promise((resolve) => {
    import('@apps-in-toss/web-framework')
      .then(({ loadFullScreenAd, showFullScreenAd }) => {
        if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported()) {
          resolve();
          return;
        }
        loadFullScreenAd({
          options: { adGroupId: INTERSTITIAL_AD_ID },
          onEvent: (event) => {
            if (event.type === 'loaded') {
              showFullScreenAd({
                options: { adGroupId: INTERSTITIAL_AD_ID },
                onEvent: () => {},
                onError: () => resolve(),
              });
              // 전면광고는 표시 즉시 다음 화면으로 넘어가도 자연스럽다(광고가 화면을 덮으므로).
              resolve();
            }
          },
          onError: () => resolve(),
        });
      })
      .catch(() => resolve());
  });
}

export function App() {
  const [page, setPage] = useState<Page>('input');
  const [params, setParams] = useState<JudgeParams | null>(null);

  const handleSubmit = async (next: JudgeParams) => {
    setParams(next);
    setPage('loading');
    // 광고 로드(최대 ~2초 내외)와 최소 로딩 시간을 함께 기다려 자연스러운 전환 + 노출 보장
    await Promise.all([showInterstitialAd(), new Promise((r) => setTimeout(r, 900))]);
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
