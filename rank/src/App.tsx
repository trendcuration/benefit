import { useCallback, useEffect, useRef, useState } from 'react';
import { graniteEvent, Screen } from '@apps-in-toss/web-framework';
import { AdNoticePage } from './pages/AdNoticePage';
import { InputPage, type InputMode } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';
import { preloadInterstitial } from './lib/ads';
import { logClick, logImpression } from './lib/analytics';
import type { Metric } from './data/percentiles';

type Page = 'input' | 'ad' | 'result';

export interface JudgeParams {
  metric: Metric;
  /** 판정 금액(만원). 소득은 연 환산 총급여, 순자산은 입력값 그대로 */
  value: number;
  /** 결과 화면에 표시할 입력 요약 (예: "월급 300만원") */
  inputLabel: string;
  /** 입력할 때 고른 방식. 로그 구분에 쓴다 */
  mode: InputMode;
}

export function App() {
  const [page, setPage] = useState<Page>('input');
  const [params, setParams] = useState<JudgeParams | null>(null);
  // 결과 화면에서 "순자산도 확인하기"로 돌아올 때 입력 화면이 그 항목으로 열리게 한다.
  const [inputMode, setInputMode] = useState<InputMode>('monthly');

  // 화면 전환을 useState로만 관리해 브라우저 히스토리 엔트리가 없다 — 시스템 뒤로가기를
  // 그대로 두면 되돌아갈 곳이 없어 보여 미니앱 자체가 종료돼버린다(검수 반려 사유). backEvent를
  // 구독하면 기본 동작(미니앱 종료)이 자동으로 막히므로, 결과 → 입력으로 한 단계 되돌리고
  // 최상위 화면(입력)에서만 명시적으로 Screen.close()를 호출한다. 광고 안내 중에는 무시한다.
  const pageRef = useRef(page);
  pageRef.current = page;

  useEffect(() => {
    // 토스 웹뷰 밖(로컬 브라우저)에선 addEventListener가 예외를 던지므로 감싼다.
    try {
      return graniteEvent.addEventListener('backEvent', {
        onEvent: () => {
          if (pageRef.current === 'result') {
            setPage('input');
          } else if (pageRef.current === 'input') {
            Screen.close();
          }
        },
        onError: () => {
          Screen.close();
        },
      });
    } catch {
      return undefined;
    }
  }, []);

  const handleAdDone = useCallback(() => {
    if (pageRef.current !== 'ad') return;
    // 광고 안내 화면을 끝까지 지나 결과로 넘어간 시점. submit_click과 비교하면 광고 구간 이탈을 알 수 있다.
    logImpression('ad_done');
    setPage('result');
  }, []);

  // 입력 화면에 있는 동안 전면광고를 미리 로드해 둔다 (판정 시점엔 바로 보여줄 수 있도록)
  useEffect(() => {
    if (page === 'input') preloadInterstitial();
  }, [page]);

  const handleSubmit = (next: JudgeParams) => {
    logClick('submit_click', { metric: next.metric, mode: next.mode });
    setParams(next);
    setInputMode(next.mode);
    // 광고 안내 → 광고 노출(닫힘/실패 모두 대기) → 결과. 결과 화면 위로 광고가 끼어들지 않는다.
    setPage('ad');
  };

  const handleBack = (nextMode?: InputMode) => {
    if (nextMode) setInputMode(nextMode);
    setPage('input');
  };

  return (
    <>
      {page === 'input' && <InputPage initialMode={inputMode} onSubmit={handleSubmit} />}
      {page === 'ad' && <AdNoticePage onDone={handleAdDone} />}
      {page === 'result' && params && <ResultPage params={params} onBack={handleBack} />}
    </>
  );
}
