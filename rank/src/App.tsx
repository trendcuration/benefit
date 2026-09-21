import { useEffect, useState } from 'react';
import { AdNoticePage } from './pages/AdNoticePage';
import { InputPage } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';
import { preloadInterstitial } from './lib/ads';
import type { AgeGroup, Metric, Region } from './data/percentiles';

type Page = 'input' | 'ad' | 'result';

export interface JudgeParams {
  metric: Metric;
  ageGroup: AgeGroup;
  region: Region;
  /** 판정 금액(만원). 소득은 연 환산 총급여, 순자산은 입력값 그대로 */
  value: number;
  /** 결과 화면에 표시할 입력 요약 (예: "월급 300만원") */
  inputLabel: string;
}

export function App() {
  const [page, setPage] = useState<Page>('input');
  const [params, setParams] = useState<JudgeParams | null>(null);

  // 입력 화면에 있는 동안 전면광고를 미리 로드해 둔다 (판정 시점엔 바로 보여줄 수 있도록)
  useEffect(() => {
    if (page === 'input') preloadInterstitial();
  }, [page]);

  const handleSubmit = (next: JudgeParams) => {
    setParams(next);
    // 광고 안내 → 광고 노출(닫힘/실패 모두 대기) → 결과. 결과 화면 위로 광고가 끼어들지 않는다.
    setPage('ad');
  };

  return (
    <>
      {page === 'input' && <InputPage onSubmit={handleSubmit} />}
      {page === 'ad' && <AdNoticePage onDone={() => setPage('result')} />}
      {page === 'result' && params && (
        <ResultPage params={params} onBack={() => setPage('input')} />
      )}
    </>
  );
}
