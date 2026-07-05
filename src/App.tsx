import { useState } from 'react';
import { FilterPage } from './pages/FilterPage';
import { ResultsPage } from './pages/ResultsPage';
import type { AgeGroup, Gender } from './data/subsidies';

const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

type Page = 'filter' | 'results';

interface SearchParams {
  ageGroup: AgeGroup | null;
  gender: Gender;
}

export function App() {
  const [page, setPage] = useState<Page>('filter');
  const [params, setParams] = useState<SearchParams>({ ageGroup: null, gender: '전체' });

  const handleSearch = (ageGroup: AgeGroup | null, gender: Gender) => {
    setParams({ ageGroup, gender });
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
    setPage('results');
  };

  return (
    <>
      {page === 'filter' && (
        <FilterPage onSearch={handleSearch} />
      )}
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
