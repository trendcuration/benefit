import { useState } from 'react';
import { FilterPage } from './pages/FilterPage';
import { ResultsPage } from './pages/ResultsPage';
import type { AgeGroup, Gender } from './data/subsidies';
import { loadSavedSearch, saveSearch } from './utils/storage';

const INTERSTITIAL_AD_ID = 'ait.v2.live.f7c40079c7494d4f';

type Page = 'filter' | 'results';

interface SearchParams {
  ageGroup: AgeGroup | null;
  gender: Gender;
}

export function App() {
  const [page, setPage] = useState<Page>('filter');
  const [params, setParams] = useState<SearchParams>({ ageGroup: null, gender: '전체' });
  const [savedSearch] = useState(loadSavedSearch);
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (ageGroup: AgeGroup | null, gender: Gender) => {
    setParams({ ageGroup, gender });
    if (ageGroup) saveSearch({ ageGroup, gender });

    const isFirstSearchOfSession = searchCount === 0;
    setSearchCount((c) => c + 1);

    // 세션 첫 검색은 광고 없이 결과를 바로 보여주고, 재검색부터 매번 노출
    if (isFirstSearchOfSession) {
      setPage('results');
      return;
    }

    import('@apps-in-toss/web-framework').then((mod) => {
      const { loadFullScreenAd, showFullScreenAd } = mod;
      if (loadFullScreenAd?.isSupported?.() && showFullScreenAd?.isSupported?.()) {
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
        return;
      }
      // 구버전 프레임워크 폴백
      const legacyShow = (mod as { TossAds?: { showInterstitial?: ((id: string) => void) & { isSupported?: () => boolean } } })
        .TossAds?.showInterstitial;
      if (legacyShow?.isSupported?.()) {
        legacyShow(INTERSTITIAL_AD_ID);
      }
    }).catch(() => {});
    setPage('results');
  };

  return (
    <>
      {page === 'filter' && (
        <FilterPage onSearch={handleSearch} savedSearch={savedSearch} />
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
