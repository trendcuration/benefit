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

  const handleSearch = (ageGroup: AgeGroup | null, gender: Gender) => {
    setParams({ ageGroup, gender });
    if (ageGroup) saveSearch({ ageGroup, gender });

    // 검색할 때마다 매번 전면광고 노출 (세션/횟수 기반 스킵 로직 없음)
    // 참고: 이 앱은 한 세션당 검색 1회로 끝나는 사용자가 대부분이라
    // "세션당 1회 스킵" 같은 조건은 사실상 "거의 항상 스킵"과 같아져
    // 광고 요청 자체가 급감하는 사고로 이어진 적이 있음 (2026-07-20)
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
