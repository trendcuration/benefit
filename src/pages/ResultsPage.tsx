import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextField } from '@toss/tds-mobile';
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  CATEGORY_ICON,
  filterSubsidies,
  type Category,
} from '../data/subsidies';
import { loadNational, loadSido, type GovItem } from '../data/gov24';
import { CURATED_DUP_IDS, fromCurated, fromGov, govMatches, type ListItem } from '../data/items';
import { FREE_BOOKMARK_LIMIT, useBookmarks } from '../hooks/useBookmarks';
import { RewardUnlockDialog } from '../components/RewardUnlockDialog';
import { EmojiIcon } from '../components/EmojiIcon';
import { CrossPromoSheet, PROMO_APPS, type PromoApp } from '../components/CrossPromoSheet';
import { markAsked, recordDetailView, shouldAskReview } from '../lib/reviewPrompt';
import { requestTossReview } from '../lib/review';
import { DetailPage, govPageUrl } from './DetailPage';
import type { SearchParams } from './FilterPage';
import { logClick } from '../lib/analytics';
import { attachTossBanner } from '../lib/banner';
import { openExternal } from '../lib/links';
import { grantSubsidyDetailReward, IS_PROMOTION_TEST } from '../lib/promotion';
import { isFromBenefitMission } from '../lib/referrer';
import { loadSeenKeys, saveSeenKeys } from '../lib/seenItems';
import { canShowPushPopup, isPushAgreed, markPushPopupShown, pushSupported, requestWeeklyPush } from '../lib/push';
import { PushAskSheet } from '../components/PushAskSheet';

const BANNER_AD_ID = 'ait.v2.live.d197bbbda78c417c';
const INFEED_BANNER_AD_ID = 'ait.v2.live.ee27252f33184337';
const REWARDED_AD_ID = 'ait.v2.live.327ced0813c8420f';
const INFEED_BANNER_INTERVAL = 6;
const MAX_INFEED_BANNERS = 4;
const PAGE_SIZE = 30;
/** 부록 미니앱 '2027 바뀌는 지원금'(miniApp 85249) */
const BENEFIT_2027_APP_URL = 'intoss://benefit-2027';

/** 지원금 상세를 이만큼 보고 목록으로 돌아오면 자매 앱 안내 시트를 띄운다(하루 한 번). */
const CROSS_PROMO_AFTER_VIEWS = 3;
/** 상세를 이만큼 보거나 결과 화면에 이만큼 머물면 매주 알림 팝업을 권한다(자매 앱 시트보다 먼저). */
const PUSH_POPUP_AFTER_VIEWS = 2;
const PUSH_POPUP_AFTER_MS = 30_000;
const CROSS_PROMO_DATE_KEY = 'benefit:cross-promo-date';
const CROSS_PROMO_NEXT_KEY = 'benefit:cross-promo-next';

/** 오늘 아직 안 보여줬으면 이번에 보여줄 앱(두 앱을 번갈아)을 고르고 '오늘 보여줌'으로 기록한다. */
function pickCrossPromo(): PromoApp | null {
  try {
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(CROSS_PROMO_DATE_KEY) === today) return null;
    const next = Number(localStorage.getItem(CROSS_PROMO_NEXT_KEY)) || 0;
    localStorage.setItem(CROSS_PROMO_DATE_KEY, today);
    localStorage.setItem(CROSS_PROMO_NEXT_KEY, String((next + 1) % PROMO_APPS.length));
    return PROMO_APPS[next % PROMO_APPS.length];
  } catch {
    return null; // 저장소를 못 쓰면 매번 뜨는 걸 막기 위해 아예 띄우지 않는다
  }
}

type SortKey = 'default' | 'amount' | 'deadline';
/** 탭: 전체 | 우리 구 | 카테고리 */
type TabKey = 'all' | 'local' | Category;

interface ResultsPageProps {
  params: SearchParams;
  onBack: () => void;
}

export function ResultsPage({ params, onBack }: ResultsPageProps) {
  const { birthYear, gender, sido, sidoName, sgg } = params;
  const [sort, setSort] = useState<SortKey>('default');
  const [tab, setTab] = useState<TabKey>('all');
  const [query, setQuery] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  // 지난 방문까지 본 지원금. 첫 방문(빈 집합)이면 '새로 올라옴'을 표시하지 않는다.
  const [seenBefore] = useState(loadSeenKeys);
  const [newKeys, setNewKeys] = useState<Set<string>>(() => new Set());
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [govItems, setGovItems] = useState<GovItem[] | null>(null);
  const [govFailed, setGovFailed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  // 무료 한도 초과 시 리워드 광고를 보기 전에 안내/확인을 받기 위한 대상 항목 키
  const [confirmUnlockId, setConfirmUnlockId] = useState<string | null>(null);
  // 상세 요약 화면에 띄운 지원금
  const [detailItem, setDetailItem] = useState<ListItem | null>(null);
  const [promoApp, setPromoApp] = useState<PromoApp | null>(null);
  const viewedCount = useRef(0);
  const {
    isBookmarked,
    toggle: toggleBookmark,
    add: addBookmark,
    bookmarkedIds,
    isLimitReached,
    unlockUnlimited,
  } = useBookmarks();
  // 리워드 대상은 혜택탭 미션 카드 경유자뿐이다. 화면 진입만으로는 주지 않고,
  // 아래 handleOpenDetail에서 '지원금 상세보기를 실제로 1건 이상'했을 때 지급한다.
  // 테스트 번들에서만 진입 경로 판정을 건너뛴다(카드가 RUNNING 전에는 안 보이기 때문).
  const [fromBenefitMission] = useState(() => IS_PROMOTION_TEST || isFromBenefitMission());
  const [rewardGranted, setRewardGranted] = useState(false);
  // 매주 월요일 새 지원금 알림: 지원하는 기기이고 아직 동의 전일 때만 카드를 보여준다.
  const [pushCard, setPushCard] = useState<'hidden' | 'ask' | 'agreed'>(() =>
    pushSupported() && !isPushAgreed() ? 'ask' : 'hidden',
  );
  const handleAskPush = (from: 'card' | 'popup' = 'card') => {
    logClick('weekly_push_click', { from });
    void requestWeeklyPush().then((result) => {
      logClick('weekly_push_result', { result, from });
      if (result === 'agreed') setPushCard('agreed');
    });
  };
  // 팝업은 조건(상세 2개 또는 30초)이 되면 '대기'로 두고, 다른 화면·시트가 다 닫혔을 때 띄운다.
  const [pushDue, setPushDue] = useState<'views' | 'dwell' | null>(null);
  const [pushPopup, setPushPopup] = useState<'views' | 'dwell' | null>(null);
  const pushPopupDone = useRef(!canShowPushPopup());
  useEffect(() => {
    if (pushPopupDone.current) return;
    const timer = setTimeout(() => setPushDue((d) => d ?? 'dwell'), PUSH_POPUP_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);


  // 정부24 데이터: 전국 + 고른 시도. 실패해도 직접 정리한 지원금만으로 화면이 동작한다.
  useEffect(() => {
    let alive = true;
    setGovItems(null);
    setGovFailed(false);
    Promise.all([loadNational(), sido ? loadSido(sido) : Promise.resolve([])])
      .then(([national, local]) => alive && setGovItems([...local, ...national]))
      .catch(() => {
        if (!alive) return;
        setGovFailed(true);
        setGovItems([]);
      });
    return () => {
      alive = false;
    };
  }, [sido]);

  const allItems = useMemo(() => {
    const curated = filterSubsidies(birthYear, gender, sido).map(fromCurated);
    const gov = (govItems ?? [])
      .filter((g) => !CURATED_DUP_IDS.has(g.i) && govMatches(g, { birthYear, gender, sgg }))
      .map(fromGov);
    return [...curated, ...gov];
  }, [govItems, birthYear, gender, sido, sgg]);

  // 정부24 목록이 다 온 뒤에 한 번: 지난 방문 이후 새로 올라온 지원금을 고르고, 이번에 본 목록을 저장한다.
  // 불러오기에 실패한 날은 비교하지 않는다(대표 지원금만 보여 전부 '새로 올라옴'처럼 보이는 것 방지).
  const seenSaved = useRef(false);
  useEffect(() => {
    if (govItems === null || govFailed || seenSaved.current) return;
    seenSaved.current = true;
    const keys = allItems.map((x) => x.key);
    if (seenBefore.size > 0) {
      const fresh = keys.filter((k) => !seenBefore.has(k));
      setNewKeys(new Set(fresh));
      if (fresh.length > 0) logClick('new_items_view', { count: fresh.length });
    }
    saveSeenKeys(seenBefore, keys);
  }, [govItems, govFailed, allItems, seenBefore]);

  // 특정 대상(소상공인·장애인·임산부 등) 전용 사업은 기본으로 숨기고, '우리 구' 탭에서는 모두 보여준다.
  const baseItems = includeSpecial ? allItems : allItems.filter((x) => !x.special);
  const localItems = sgg ? allItems.filter((x) => x.sgg === sgg) : [];

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [tab, query, sort, showBookmarkedOnly, showNewOnly, includeSpecial]);

  const handleOpenDetail = (item: ListItem) => {
    // 전환지표: 지원금을 눌러 자세히 보는 것이 이 앱의 서비스 가치 완료 시점(신청 사이트 이동은 subsidy_apply_click)
    logClick('subsidy_click', { subsidy_id: item.key, category: item.category, kind: item.kind });
    recordDetailView();
    setDetailItem(item);
    if (!fromBenefitMission) return;
    void grantSubsidyDetailReward().then((outcome) => {
      if (outcome === 'ok') setRewardGranted(true);
    });
  };

  const closeDetail = useCallback(() => {
    setDetailItem(null);
    viewedCount.current += 1;
    // 앱을 잘 쓰고 있다는 신호(상세 5번 이상 + 신청 이동 경험)가 있는 사용자에게만 별점을 묻고,
    // 그날은 자매 앱 시트를 띄우지 않는다. 조건이 안 되면 기존대로 자매 앱 시트를 고려한다.
    if (shouldAskReview()) {
      markAsked();
      // 우리 안내 시트 없이 토스 별점 화면을 바로 요청한다(토스가 안 띄울 때 버튼이 먹통처럼 보였다).
      setTimeout(requestTossReview, 350);
    } else if (viewedCount.current === PUSH_POPUP_AFTER_VIEWS && !pushPopupDone.current) {
      setPushDue('views');
    } else if (viewedCount.current === CROSS_PROMO_AFTER_VIEWS) {
      const app = pickCrossPromo();
      // 상세가 닫히고 목록이 보인 뒤에 올라오도록 살짝 늦춘다.
      if (app) setTimeout(() => setPromoApp(app), 350);
    }
  }, []);
  const closePromo = useCallback(() => setPromoApp(null), []);
  const closePushPopup = useCallback(() => setPushPopup(null), []);

  useEffect(() => {
    if (!pushDue || pushPopupDone.current) return;
    if (detailItem || promoApp || confirmUnlockId !== null || unlockingId !== null) return;
    if (pushCard !== 'ask') {
      pushPopupDone.current = true;
      return;
    }
    // 상세가 닫히는 애니메이션 뒤에 올라오도록 살짝 늦춘다. 그 사이 다른 화면이 열리면 다음 기회로 미룬다.
    const timer = setTimeout(() => {
      pushPopupDone.current = true;
      markPushPopupShown();
      setPushPopup(pushDue);
    }, 350);
    return () => clearTimeout(timer);
  }, [pushDue, detailItem, promoApp, confirmUnlockId, unlockingId, pushCard]);

  const open2027App = () => {
    logClick('benefit2027_banner_click');
    openExternal(BENEFIT_2027_APP_URL);
  };

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let result: { destroy: () => void } | undefined;
    const cancel = attachTossBanner(BANNER_AD_ID, el, (r) => {
      result = r;
    });
    return () => {
      cancel();
      result?.destroy();
    };
  }, []);

  const tabItems =
    tab === 'all' ? baseItems : tab === 'local' ? localItems : baseItems.filter((x) => x.category === tab);
  const newFiltered = showNewOnly ? tabItems.filter((x) => newKeys.has(x.key)) : tabItems;
  const bookmarkFiltered = showBookmarkedOnly ? newFiltered.filter((x) => isBookmarked(x.key)) : newFiltered;
  const newCount = baseItems.filter((x) => newKeys.has(x.key)).length;
  const trimmedQuery = query.trim().toLowerCase();
  const searchFiltered = trimmedQuery
    ? bookmarkFiltered.filter((x) => x.searchText.includes(trimmedQuery))
    : bookmarkFiltered;
  const sorted = [...searchFiltered].sort((a, b) => {
    if (sort === 'amount') return parseAmount(b.amountText) - parseAmount(a.amountText);
    if (sort === 'deadline') return deadlineRank(a.deadline) - deadlineRank(b.deadline);
    return (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0) || b.rank - a.rank;
  });
  const shown = sorted.slice(0, visible);

  const urgentCount = baseItems.filter((x) => x.isUrgent).length;
  const specialCount = allItems.length - allItems.filter((x) => !x.special).length;

  const handleToggleBookmark = (id: string) => {
    if (isBookmarked(id) || !isLimitReached) {
      toggleBookmark(id);
      return;
    }
    // 무료 북마크 한도 초과: 광고를 바로 띄우지 않고, 무엇을 얻는지 안내한 뒤 사용자가 선택했을 때만 광고를 보여준다.
    setConfirmUnlockId(id);
  };

  const handleShare = (item: ListItem) => {
    const url = item.curated?.url ?? (item.gov ? govPageUrl(item.gov.i) : '');
    const title = item.curated?.title ?? item.headline;
    const line = item.curated ? item.headline : (item.gov?.a ?? item.gov?.s ?? '');
    import('@apps-in-toss/web-framework')
      .then(({ share }) => share({ message: `[${title}]\n${line}\n${url}` }))
      .catch(() => {});
  };

  // 사용자가 안내에서 "광고 보고 무제한 북마크"를 선택한 경우: 리워드 광고 시청 후 무제한 해제 + 해당 항목 북마크
  const startBookmarkUnlock = (id: string) => {
    setUnlockingId(id);
    import('@apps-in-toss/web-framework')
      .then(({ loadFullScreenAd, showFullScreenAd }) => {
        if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported()) {
          setUnlockingId(null);
          return;
        }
        loadFullScreenAd({
          options: { adGroupId: REWARDED_AD_ID },
          onEvent: (event) => {
            if (event.type !== 'loaded') return;
            showFullScreenAd({
              options: { adGroupId: REWARDED_AD_ID },
              onEvent: (e) => {
                if (e.type === 'userEarnedReward') {
                  unlockUnlimited();
                  addBookmark(id);
                }
                if (e.type === 'dismissed' || e.type === 'failedToShow') {
                  setUnlockingId(null);
                }
              },
              onError: () => setUnlockingId(null),
            });
          },
          onError: () => setUnlockingId(null),
        });
      })
      .catch(() => setUnlockingId(null));
  };

  const loading = govItems === null;
  const condition = [
    birthYear ? `${String(birthYear).slice(2)}년생` : '전체 연령',
    sgg ?? sidoName ?? '전국',
    gender === '전체' ? null : gender,
  ]
    .filter(Boolean)
    .join(' · ');
  const tabTitle = tab === 'all' ? '전체' : tab === 'local' ? `우리 ${sgg}` : tab;

  return (
    <div style={s.container}>
      {confirmUnlockId !== null && (
        <RewardUnlockDialog
          limit={FREE_BOOKMARK_LIMIT}
          onConfirm={() => {
            const id = confirmUnlockId;
            setConfirmUnlockId(null);
            startBookmarkUnlock(id);
          }}
          onCancel={() => setConfirmUnlockId(null)}
        />
      )}

      {detailItem && (
        <DetailPage
          item={detailItem}
          bookmarked={isBookmarked(detailItem.key)}
          unlocking={unlockingId === detailItem.key}
          onToggleBookmark={() => handleToggleBookmark(detailItem.key)}
          onShare={() => handleShare(detailItem)}
          onClose={closeDetail}
        />
      )}

      {promoApp && !detailItem && <CrossPromoSheet app={promoApp} onClose={closePromo} />}

      {pushPopup && !detailItem && (
        <PushAskSheet
          trigger={pushPopup}
          onAgree={() => {
            setPushPopup(null);
            handleAskPush('popup');
          }}
          onClose={closePushPopup}
        />
      )}

      {/* 조건 요약 (토스 네이티브 내비게이션 바의 뒤로가기 버튼과 중복되지 않도록
          자체 헤더/뒤로가기 버튼 없이 본문 상단에만 표기) */}
      <div style={s.hero}>
        <p style={s.heroSub}>
          <span style={s.heroCond}>{condition}</span> 조건으로 골랐어요
        </p>
        <h1 style={s.heroTitle}>
          {loading ? '지원금을 고르고 있어요' : `놓치면 아까운 지원금 ${baseItems.length}개`}
        </h1>
        <p style={s.heroNote}>
          {govFailed ? '정부24 정보를 불러오지 못해 대표 지원금만 보여드려요' : '정부24 공공서비스 정보 기준'}
          {urgentCount > 0 && <span style={s.heroUrgent}> · 🔥 마감 임박 {urgentCount}개</span>}
        </p>
        {newCount > 0 && (
          <button
            type="button"
            style={s.newBadgeBtn}
            onClick={() => {
              logClick('new_items_click', { count: newCount });
              setShowNewOnly(true);
            }}
          >
            {`🆕 지난번 확인 이후 새로 올라온 지원금 ${newCount}개 보기 ›`}
          </button>
        )}
      </div>

      {/* 매주 월요일 새 지원금 알림 동의 (정부24 데이터는 매주 토요일 갱신) */}
      {pushCard !== 'hidden' && (
        <div style={s.infoCardWrap}>
          {pushCard === 'ask' ? (
            <button type="button" style={s.pushCard} onClick={() => handleAskPush('card')}>
              <EmojiIcon codepoint="1F514" fallback="🔔" size={32} />
              <span style={s.infoCardTexts}>
                <span style={s.pushCardTitle}>새 지원금 알림 받기</span>
                <span style={s.infoCardSub}>매주 월요일 12시, 새로 올라온 지원금을 알려드려요</span>
              </span>
              <span style={s.chevron}>›</span>
            </button>
          ) : (
            <p style={s.pushDone}>✅ 매주 월요일 12시에 새 지원금을 알려드릴게요</p>
          )}
        </div>
      )}

      {/* 혜택탭 미션 안내: 유저가 노력을 들이기 전에 지급 조건을 먼저 밝힌다.
          지급이 실제로 성공했을 때만 완료 문구로 바꾼다(주지 않은 걸 줬다고 말하지 않기 위함). */}
      {fromBenefitMission && (
        <div style={s.missionNotice}>
          <p style={s.missionNoticeText}>
            {rewardGranted
              ? '✅ 5원을 지급했어요! 토스 혜택탭에서 확인할 수 있어요'
              : '💰 지원금 1개를 눌러 자세히 보면 5원을 받아요'}
          </p>
        </div>
      )}

      {/* 부록 미니앱 '2027 바뀌는 지원금'으로 연결 */}
      <div style={s.infoCardWrap}>
        <button type="button" style={s.infoCard} onClick={open2027App}>
          <EmojiIcon codepoint="1F4C5" fallback="📅" size={32} />
          <span style={s.infoCardTexts}>
            <span style={s.infoCardTitle}>2027 바뀌는 지원금</span>
            <span style={s.infoCardSub}>내년에 달라지는 지원금 미리 보기</span>
          </span>
          <span style={s.chevron}>›</span>
        </button>
      </div>

      {/* 배너 광고 */}
      <div ref={bannerRef} style={s.banner} />

      {/* 탭 (스크롤해도 상단에 고정) */}
      <div style={s.tabsWrap}>
        <div style={s.tabs} role="tablist">
          <Tab label="전체" active={tab === 'all'} onClick={() => setTab('all')} />
          {localItems.length > 0 && (
            <Tab label={`📍 ${sgg}`} active={tab === 'local'} onClick={() => setTab('local')} />
          )}
          {CATEGORIES.map((cat) => {
            if (!baseItems.some((x) => x.category === cat)) return null;
            return <Tab key={cat} label={cat} active={tab === cat} onClick={() => setTab(cat)} />;
          })}
        </div>
      </div>

      {/* 찜·대상 필터 + 검색 */}
      <div style={s.filterPanel}>
        <div style={s.pillRow}>
          <Pill
            label={`${showBookmarkedOnly ? '💙' : '🤍'} 찜 ${bookmarkedIds.length}`}
            active={showBookmarkedOnly}
            onClick={() => setShowBookmarkedOnly((v) => !v)}
          />
          {newCount > 0 && (
            <Pill
              label={`🆕 새로 올라옴 ${newCount}`}
              active={showNewOnly}
              onClick={() => setShowNewOnly((v) => !v)}
            />
          )}
          {specialCount > 0 && (
            <Pill
              label={`소상공인·장애인 등 특정 대상 ${specialCount}개도 보기`}
              active={includeSpecial}
              onClick={() => setIncludeSpecial((v) => !v)}
            />
          )}
        </div>
        <div style={s.searchWrap}>
          <TextField.Clearable
            variant="box"
            placeholder="지원금 검색 (예: 청년, 월세, 육아)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {isLimitReached && (
          <p style={s.limitHint}>
            📺 무료 찜 5개를 다 채웠어요 · 하트를 누르면 광고를 본 뒤 찜이 무제한으로 늘어나요
          </p>
        )}
      </div>

      {/* 결과 목록 */}
      <div style={s.listPanel}>
        <div style={s.sortRow}>
          <span style={s.listTitle}>
            {tabTitle} <span style={s.listCount}>{sorted.length}</span>
          </span>
          <div style={s.sortBtns}>
            {(['default', 'amount', 'deadline'] as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                style={sort === key ? { ...s.sortBtn, ...s.sortBtnActive } : s.sortBtn}
                onClick={() => setSort(key)}
              >
                {SORT_LABEL[key]}
              </button>
            ))}
          </div>
        </div>
        {tab === 'local' && (
          <p style={s.localHint}>{sgg}에서 직접 운영하는 사업이에요. 특정 대상 사업도 함께 보여드려요.</p>
        )}

        {sorted.length === 0 && !loading ? (
          <EmptyState onBack={onBack} />
        ) : (
          shown.map((item, index) => (
            <Fragment key={item.key}>
              <SubsidyRow
                item={item}
                bookmarked={isBookmarked(item.key)}
                unlocking={unlockingId === item.key}
                onToggleBookmark={() => handleToggleBookmark(item.key)}
                onOpen={() => handleOpenDetail(item)}
              />
              {(index + 1) % INFEED_BANNER_INTERVAL === 0 &&
                (index + 1) / INFEED_BANNER_INTERVAL <= MAX_INFEED_BANNERS &&
                index !== shown.length - 1 && <InFeedBanner key={`banner-${item.key}`} />}
            </Fragment>
          ))
        )}
        {loading && <p style={s.localHint}>우리 동네 지원금까지 불러오고 있어요…</p>}
        {sorted.length > visible && (
          <button type="button" style={s.loadMoreBtn} onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            {`더 보기 (${sorted.length - visible}개 남음)`}
          </button>
        )}
      </div>

      {/* 더보기 */}
      <div style={s.moreWrap}>
        <button type="button" style={s.moreBtn} onClick={onBack}>
          다른 조건으로 다시 찾기 ›
        </button>
      </div>
    </div>
  );
}

// ── 탭·필 ──
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      style={active ? { ...s.tab, ...s.tabActive } : s.tab}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" style={active ? { ...s.pill, ...s.pillActive } : s.pill} onClick={onClick}>
      {label}
    </button>
  );
}

// ── 인피드 배너 광고 ──
function InFeedBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let result: { destroy: () => void } | undefined;
    const cancel = attachTossBanner(INFEED_BANNER_AD_ID, el, (r) => {
      result = r;
    });
    return () => {
      cancel();
      result?.destroy();
    };
  }, []);

  return <div ref={ref} style={s.infeedBanner} />;
}

// ── 지원금 한 줄 ──
interface SubsidyRowProps {
  item: ListItem;
  bookmarked: boolean;
  unlocking: boolean;
  onToggleBookmark: () => void;
  /** 상세 요약 화면을 연다 — 리워드 지급 조건(상세보기 1건)이다. */
  onOpen: () => void;
}

function SubsidyRow({ item, bookmarked, unlocking, onToggleBookmark, onOpen }: SubsidyRowProps) {
  const icon = CATEGORY_ICON[item.category];
  const dday = item.isUrgent ? getDday(item.deadline) : null;

  return (
    <div style={s.row}>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${item.headline} 자세히 보기`}
        style={s.rowMain}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <div style={{ ...s.rowIcon, backgroundColor: icon.bg }}>
          <EmojiIcon codepoint={icon.codepoint} fallback={CATEGORY_EMOJI[item.category]} size={28} />
        </div>
        <div style={s.rowTexts}>
          <div style={s.rowProgram}>
            <span style={s.ellipsis}>{item.label}</span>
            {item.isUrgent && <span style={s.ddayBadge}>{dday ?? '마감 임박'}</span>}
            {item.sgg && <span style={s.localBadge}>우리 동네</span>}
          </div>
          <p style={{ ...s.rowHeadline, ...s.ellipsis }}>{item.headline}</p>
          <p style={{ ...s.rowSub, ...s.ellipsis }}>{item.sub}</p>
          {(item.meta || item.tags.length > 0) && (
            <p style={{ ...s.rowMeta, ...s.ellipsis }}>
              {item.tags.length > 0 && <span style={s.tagText}>{item.tags.join('·')} 대상 · </span>}
              {item.meta}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label={bookmarked ? '찜 해제' : '찜하기'}
        style={s.heartBtn}
        onClick={onToggleBookmark}
        disabled={unlocking}
      >
        {unlocking ? '⏳' : bookmarked ? '💙' : '🤍'}
      </button>
    </div>
  );
}

// ── 빈 상태 ──
function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div style={s.empty}>
      <EmojiIcon codepoint="1F50D" fallback="🔍" size={44} />
      <p style={s.emptyTitle}>해당 조건의 지원금이 없어요</p>
      <p style={s.emptySub}>탭이나 지역, 검색어를 바꿔 보세요</p>
      <button type="button" style={s.moreBtn} onClick={onBack}>
        조건 다시 선택하기 ›
      </button>
    </div>
  );
}

// ── 유틸 ──
function getDday(deadline: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
  const diffMs = new Date(`${deadline}T23:59:59`).getTime() - Date.now();
  const days = Math.ceil(diffMs / 86_400_000);
  if (days < 0) return null;
  return days === 0 ? 'D-day' : `D-${days}`;
}

/** 마감임박순 정렬용 순위값. 유효한 날짜면 오늘로부터 남은 일수, 날짜가 아니면(상시 등) 맨 뒤로 보냅니다. */
function deadlineRank(deadline: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return Number.POSITIVE_INFINITY;
  const diffMs = new Date(`${deadline}T23:59:59`).getTime() - Date.now();
  return Math.ceil(diffMs / 86_400_000);
}

function parseAmount(str: string): number {
  const eokMatch = str.match(/([\d,.]+)\s*억/);
  if (eokMatch) return parseFloat(eokMatch[1].replace(/,/g, '')) * 100_000_000;

  const manMatch = str.match(/([\d,]+)\s*만(?:\s*([\d,]+))?/);
  if (manMatch) {
    const manPart = parseInt(manMatch[1].replace(/,/g, ''), 10) || 0;
    const restPart = manMatch[2] ? parseInt(manMatch[2].replace(/,/g, ''), 10) || 0 : 0;
    return manPart * 10_000 + restPart;
  }

  const nums = str.replace(/[^0-9]/g, '');
  return nums ? parseInt(nums, 10) : 0;
}

const SORT_LABEL: Record<SortKey, string> = {
  default: '추천순',
  amount: '금액순',
  deadline: '마감순',
};


// ── 스타일 ──
const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: '#F2F4F6',
  },
  hero: {
    padding: '20px 20px 18px',
    backgroundColor: '#FFFFFF',
  },
  heroSub: {
    fontSize: '15px',
    color: '#6B7684',
  },
  heroCond: {
    color: '#4E5968',
    fontWeight: 600,
    textDecoration: 'underline',
    textDecorationColor: '#D1D6DB',
    textUnderlineOffset: '3px',
  },
  heroTitle: {
    marginTop: '4px',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: '#191F28',
  },
  heroNote: {
    marginTop: '6px',
    fontSize: '13px',
    color: '#8B95A1',
  },
  heroUrgent: {
    color: '#D97706',
    fontWeight: 600,
  },
  newBadgeBtn: {
    marginTop: '10px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#EBF3FE',
    color: '#1B64DA',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'left',
  },
  missionNotice: {
    backgroundColor: '#EEF3FF',
    padding: '12px 16px',
  },
  missionNoticeText: {
    textAlign: 'center',
    color: '#1B64DA',
    fontSize: '14px',
  },
  infoCardWrap: {
    backgroundColor: '#FFFFFF',
    padding: '0 16px 12px',
  },
  infoCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    border: 'none',
    borderRadius: '16px',
    backgroundColor: '#EEF4FF',
    textAlign: 'left',
    cursor: 'pointer',
  },
  infoCardTexts: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  infoCardTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#1B64DA',
  },
  infoCardSub: {
    fontSize: '14px',
    color: '#4E5968',
  },
  pushCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    border: '1px solid #D6E4FB',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
    textAlign: 'left',
    cursor: 'pointer',
  },
  pushCardTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#191F28',
  },
  pushDone: {
    padding: '14px 4px 2px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#1B64DA',
  },
  chevron: {
    fontSize: '24px',
    color: '#8BB4F5',
  },
  banner: {
    width: '100%',
    minHeight: '60px',
  },
  tabsWrap: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E8EB',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '0 12px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  tab: {
    flexShrink: 0,
    outline: 'none',
    padding: '14px 10px 12px',
    border: 'none',
    borderBottom: '2px solid transparent',
    background: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#8B95A1',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  tabActive: {
    color: '#191F28',
    fontWeight: 700,
    borderBottom: '2px solid #191F28',
  },
  filterPanel: {
    backgroundColor: '#FFFFFF',
    padding: '12px 0 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  pillRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 16px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  pill: {
    flexShrink: 0,
    padding: '7px 12px',
    borderRadius: '999px',
    border: '1px solid #E5E8EB',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    color: '#4E5968',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  pillActive: {
    border: '1px solid #3182F6',
    backgroundColor: '#EBF3FE',
    color: '#1B64DA',
    fontWeight: 600,
  },
  pillDivider: {
    flexShrink: 0,
    width: '1px',
    height: '16px',
    backgroundColor: '#E5E8EB',
    margin: '0 2px',
  },
  searchWrap: {
    padding: '0 16px',
  },
  limitHint: {
    padding: '0 16px',
    fontSize: '13px',
    lineHeight: 1.5,
    color: '#8B95A1',
  },
  listPanel: {
    marginTop: '10px',
    backgroundColor: '#FFFFFF',
    paddingBottom: '8px',
  },
  sortRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px 6px',
  },
  listTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#191F28',
  },
  listCount: {
    color: '#3182F6',
  },
  sortBtns: {
    display: 'flex',
    gap: '2px',
  },
  sortBtn: {
    border: 'none',
    background: 'none',
    padding: '6px 6px',
    fontSize: '13px',
    color: '#8B95A1',
    cursor: 'pointer',
  },
  sortBtnActive: {
    color: '#191F28',
    fontWeight: 700,
  },
  infeedBanner: {
    width: '100%',
    minHeight: '60px',
    padding: '4px 0',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px 0 0',
  },
  rowMain: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 4px 16px 20px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  rowIcon: {
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTexts: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  rowProgram: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#6B7684',
    minWidth: 0,
  },
  ddayBadge: {
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: 700,
    color: '#D97706',
    backgroundColor: '#FFF4E5',
    borderRadius: '6px',
    padding: '2px 6px',
  },
  rowHeadline: {
    fontSize: '19px',
    fontWeight: 700,
    color: '#191F28',
    letterSpacing: '-0.3px',
    lineHeight: 1.4,
  },
  rowSub: {
    fontSize: '15px',
    color: '#6B7684',
  },
  localBadge: {
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: 700,
    color: '#1B64DA',
    backgroundColor: '#EBF3FE',
    borderRadius: '6px',
    padding: '2px 6px',
  },
  tagText: {
    color: '#7C3AED',
    fontWeight: 600,
  },
  localHint: {
    padding: '4px 20px 10px',
    fontSize: '14px',
    color: '#8B95A1',
  },
  loadMoreBtn: {
    display: 'block',
    width: 'calc(100% - 40px)',
    margin: '8px 20px 12px',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#F2F4F6',
    fontSize: '15px',
    fontWeight: 600,
    color: '#4E5968',
    cursor: 'pointer',
  },
  rowMeta: {
    marginTop: '2px',
    fontSize: '13px',
    color: '#8B95A1',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
  heartBtn: {
    flexShrink: 0,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 0',
    gap: '8px',
  },
  emptyTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#191F28',
    marginTop: '8px',
  },
  emptySub: {
    fontSize: '14px',
    color: '#8B95A1',
  },
  moreWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '16px 16px 40px',
  },
  moreBtn: {
    border: 'none',
    background: 'none',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#4E5968',
    cursor: 'pointer',
  },
};
