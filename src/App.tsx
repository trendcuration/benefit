import { useState } from 'react';
import { AdNoticePage } from './pages/AdNoticePage';
import { FilterPage } from './pages/FilterPage';
import { ResultsPage } from './pages/ResultsPage';
import type { AgeGroup, Gender } from './data/subsidies';

type Page = 'filter' | 'ad' | 'results';

interface SearchParams {
  ageGroup: AgeGroup | null;
  gender: Gender;
}

export function App() {
  const [page, setPage] = useState<Page>('filter');
  const [params, setParams] = useState<SearchParams>({ ageGroup: null, gender: '전체' });

  const handleSearch = (ageGroup: AgeGroup | null, gender: Gender) => {
    setParams({ ageGroup, gender });
    // 광고 안내 → 광고 노출(완료/실패 모두 대기) → 결과. 결과 화면 뒤로 광고가 끼어들지 않는다.
    setPage('ad');
  };

  return (
    <>
      {page === 'filter' && (
        <FilterPage onSearch={handleSearch} />
      )}
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
