import { useEffect, useState } from 'react';
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
