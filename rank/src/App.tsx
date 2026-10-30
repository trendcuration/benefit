import { useState } from 'react';
import { AdNoticePage } from './pages/AdNoticePage';
import { InputPage } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';
import type { AgeGroup, Metric } from './data/percentiles';

type Page = 'input' | 'ad' | 'result';

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
    // 광고 안내 → 광고 노출(완료/실패 모두 대기) → 결과. 결과 화면 뒤로 광고가 끼어들지 않는다.
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
