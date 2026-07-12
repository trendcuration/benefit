import { useState } from 'react';
import { InputPage } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';
import type { AgeGroup, Metric } from './data/percentiles';

// TODO: 토스 개발자센터에서 rank 앱 등록 후 실제 광고 그룹 ID로 교체
const INTERSTITIAL_AD_ID = 'ait.v2.live.RANK_INTERSTITIAL_TODO';

type Page = 'input' | 'result';

export interface JudgeParams {
  metric: Metric;
  ageGroup: AgeGroup;
  /** 판정 금액(만원). 소득은 연 환산 총급여, 순자산은 입력값 그대로 */
  value: number;
  /** 결과 화면에 표시할 입력 요약 (예: "월급 300만원") */
  inputLabel: string;
}

export function App() {
  const [page, setPage] = useState<Page>('input');
  const [params, setParams] = useState<JudgeParams | null>(null);

  const handleSubmit = (next: JudgeParams) => {
    setParams(next);
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
    setPage('result');
  };

  return (
    <>
      {page === 'input' && <InputPage onSubmit={handleSubmit} />}
      {page === 'result' && params && (
        <ResultPage params={params} onBack={() => setPage('input')} />
      )}
    </>
  );
}
