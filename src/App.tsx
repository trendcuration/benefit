import { useCallback, useEffect, useRef, useState } from 'react';
import { graniteEvent, Screen } from '@apps-in-toss/web-framework';
import { AdNoticePage } from './pages/AdNoticePage';
import { FilterPage, type SearchParams } from './pages/FilterPage';
import { ResultsPage } from './pages/ResultsPage';
import { preloadInterstitial, shouldShowInterstitial } from './lib/ads';
import { popBackHandler } from './lib/backStack';
import { logClick } from './lib/analytics';
import { PushAskSheet } from './components/PushAskSheet';
import {
  cameFromAlarmMission,
  IS_PROMOTION_TEST,
  isPushAgreed,
  pushRewardAvailable,
  pushSupported,
  requestWeeklyPush,
} from './lib/push';

type Page = 'filter' | 'ad' | 'results';

const PARAMS_KEY = 'benefit:search-params';
const EMPTY_PARAMS: SearchParams = { birthYear: null, gender: '전체', sido: null, sidoName: null, sgg: null, situations: [] };

/** 다시 들어왔을 때 같은 조건을 바로 고를 수 있도록 마지막 검색 조건을 기억한다. */
function readSavedParams(): SearchParams {
  try {
    const raw = localStorage.getItem(PARAMS_KEY);
    return raw ? { ...EMPTY_PARAMS, ...(JSON.parse(raw) as Partial<SearchParams>) } : EMPTY_PARAMS;
  } catch {
    return EMPTY_PARAMS;
  }
}

export function App() {
  const [page, setPage] = useState<Page>('filter');
  const [params, setParams] = useState<SearchParams>(readSavedParams);

  // 혜택탭 미션 '알림 동의하기'로 들어오면 첫 화면 위에 알림 시트를 바로 띄운다.
  const [missionSheet, setMissionSheet] = useState(() => {
    // 테스트 번들은 3원 지급을 바로 확인할 수 있게 열 때마다 띄운다.
    if (IS_PROMOTION_TEST) return true;
    if (!cameFromAlarmMission()) return false;
    logClick('alarm_mission_enter');
    return pushSupported() && (IS_PROMOTION_TEST || !isPushAgreed());
  });
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  const closeMissionSheet = useCallback(() => setMissionSheet(false), []);
  const agreeFromMission = () => {
    setMissionSheet(false);
    logClick('weekly_push_click', { from: 'mission' });
    void requestWeeklyPush().then((result) => {
      logClick('weekly_push_result', { result, from: 'mission' });
      if (result === 'rewarded') setToast('토스포인트 3원을 드렸어요');
      else if (result === 'agreed') setToast('매주 월요일 12시에 새 지원금을 알려드릴게요');
      else if (result === 'error') setToast('잠시 후 다시 시도해 주세요');
    });
  };

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
        // 상세 화면처럼 위에 덧씌운 화면이 열려 있으면 그것부터 닫는다.
        if (popBackHandler()) return;
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

  const handleSearch = (next: SearchParams) => {
    logClick('search_submit', {
      situations: next.situations.join(',') || 'none',
      has_sgg: !!next.sgg,
      has_birth: next.birthYear != null,
    });
    setParams(next);
    try {
      localStorage.setItem(PARAMS_KEY, JSON.stringify(next));
    } catch {
      /* 저장 실패는 무시 */
    }
    // 광고 안내 → 광고 노출(닫힘/실패 모두 대기) → 결과. 결과 화면 위로 광고가 뒤늦게 끼어들지 않는다.
    // 광고를 보여줄 수 없는 상황(직전 광고 60초 이내 등)이면 안내 없이 바로 결과로 간다.
    setPage(shouldShowInterstitial() ? 'ad' : 'results');
  };

  return (
    <>
      {page === 'filter' && <FilterPage initial={params} onSearch={handleSearch} />}
      {page === 'ad' && <AdNoticePage onDone={() => setPage('results')} />}
      {page === 'results' && (
        <ResultsPage params={params} onBack={() => setPage('filter')} />
      )}
      {missionSheet && (
        <PushAskSheet trigger="mission" reward={pushRewardAvailable()} onAgree={agreeFromMission} onClose={closeMissionSheet} />
      )}
      {toast && <div style={toastStyle}>{toast}</div>}
    </>
  );
}

const toastStyle: React.CSSProperties = {
  position: 'fixed',
  left: '50%',
  bottom: 'calc(24px + env(safe-area-inset-bottom))',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  maxWidth: 'calc(100% - 32px)',
  padding: '12px 18px',
  borderRadius: '14px',
  backgroundColor: 'rgba(25, 31, 40, 0.92)',
  color: '#FFFFFF',
  fontSize: '15px',
  fontWeight: 600,
  textAlign: 'center',
};
