import { useEffect, useRef, useState } from 'react';
import { graniteEvent, Screen } from '@apps-in-toss/web-framework';
import { AdNoticePage } from './pages/AdNoticePage';
import { FilterPage } from './pages/FilterPage';
import { ResultsPage } from './pages/ResultsPage';
import { preloadInterstitial, shouldShowInterstitial } from './lib/ads';
import type { AgeGroup, Gender } from './data/subsidies';

type Page = 'filter' | 'ad' | 'results';

interface SearchParams {
  ageGroup: AgeGroup | null;
  gender: Gender;
}

export function App() {
  const [page, setPage] = useState<Page>('filter');
  const [params, setParams] = useState<SearchParams>({ ageGroup: null, gender: '전체' });

  // 필터 화면에 있는 동안 전면광고를 미리 로드해 둔다.
  useEffect(() => {
    preloadInterstitial();
  }, []);

  // 화면 전환을 useState로만 관리해 브라우저 히스토리 엔트리가 없다 — 시스템
  // 뒤로가기(하드웨어/제스처)를 그대로 두면 되돌아갈 곳이 없어 보여 미니앱 자체가
  // 종료돼버린다(검수 반려 사유). backEvent를 구독하면 기본 동작(미니앱 종료)이
  // 자동으로 막히므로, 화면 스택 한 단계를 직접 되돌리거나 최상위 화면(filter)에서만
  // 명시적으로 Screen.close()를 호출한다.
  const pageRef = useRef(page);
  pageRef.current = page;

  useEffect(() => {
    const unsubscribe = graniteEvent.addEventListener('backEvent', {
      onEvent: () => {
        if (pageRef.current === 'results' || pageRef.current === 'ad') {
          setPage('filter');
        } else {
          Screen.close();
        }
      },
      onError: () => {
        Screen.close();
      },
    });
    return unsubscribe;
  }, []);

  const handleSearch = (ageGroup: AgeGroup | null, gender: Gender) => {
    setParams({ ageGroup, gender });
    // 광고 안내 → 광고 노출(닫힘/실패 모두 대기) → 결과. 결과 화면 위로 광고가 뒤늦게 끼어들지 않는다.
    // 광고를 보여줄 수 없는 상황(직전 광고 60초 이내 등)이면 안내 없이 바로 결과로 간다.
    setPage(shouldShowInterstitial() ? 'ad' : 'results');
  };

  return (
    <>
      {page === 'filter' && <FilterPage onSearch={handleSearch} />}
      {page === 'ad' && <AdNoticePage onDone={() => setPage('results')} />}
      {page === 'results' && (
        <ResultsPage
          ageGroup={params.ageGroup}
          gender={params.gender}
          onBack={() => setPage('filter')}
        />
      )}
    </>
  );
}
