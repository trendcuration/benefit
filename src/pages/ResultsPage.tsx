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
import { markAsked, recordDetailView, shouldAskReview } from '../lib/reviewPrompt';
import { requestTossReview } from '../lib/review';
import { DetailPage, govPageUrl } from './DetailPage';
import type { SearchParams } from './FilterPage';
import { logClick } from '../lib/analytics';
import { attachTossBanner } from '../lib/banner';
import { loadSeenKeys, saveSeenKeys } from '../lib/seenItems';
import { canShowPushPopup, isPushAgreed, markPushPopupShown, pushSupported, requestWeeklyPush } from '../lib/push';
import { PushAskSheet } from '../components/PushAskSheet';
import { tagsOf } from '../lib/situations';
import { appliedKeys } from '../lib/applyProgress';
import { ddayLabel } from '../lib/deadline';
import { parseAmount, totalAmount, type BenefitType } from '../lib/benefitType';

const BANNER_AD_ID = 'ait.v2.live.d197bbbda78c417c';
const INFEED_BANNER_AD_ID = 'ait.v2.live.ee27252f33184337';
const REWARDED_AD_ID = 'ait.v2.live.327ced0813c8420f';
const INFEED_BANNER_INTERVAL = 6;
const MAX_INFEED_BANNERS = 4;
const PAGE_SIZE = 30;
const TOP_AMOUNT_CAP = 50_000_000;

/** 상세를 이만큼 보거나 결과 화면에 이만큼 머물면 매주 알림 팝업을 권한다. */
const PUSH_POPUP_AFTER_VIEWS = 2;
const PUSH_POPUP_AFTER_MS = 30_000;


type SortKey = 'default' | 'amount' | 'deadline';
/** 요약 카드에서 고른 지원 형태 */
type TypeFilter = 'cash' | 'loan' | 'other' | null;
/** 탭: 전체 | 우리 구 | 카테고리 */
type TabKey = 'all' | 'local' | Category;

interface ResultsPageProps {
  params: SearchParams;
  onBack: () => void;
}

export function ResultsPage({ params, onBack }: ResultsPageProps) {
  const { birthYear, gender, sido, sidoName, sgg } = params;
  const situationTags = useMemo(() => tagsOf(params.situations ?? []), [params.situations]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(null);
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);
  const [applied, setApplied] = useState<Set<string>>(appliedKeys);
  const listTopRef = useRef<HTMLDivElement>(null);
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
  const viewedCount = useRef(0);
  const {
    isBookmarked,
    toggle: toggleBookmark,
    add: addBookmark,
    bookmarkedIds,
    isLimitReached,
    unlockUnlimited,
  } = useBookmarks();
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

  // 특정 대상(소상공인·장애인·임산부 등) 전용 사업은 기본으로 숨기되, '지금 내 상황'에서 고른 대상이면 넣는다.
  // '우리 구' 탭에서는 모두 보여준다.
  const isMine = useCallback(
    (x: ListItem) => x.special && x.tags.some((t) => situationTags.has(t)),
    [situationTags],
  );
  const baseItems = includeSpecial ? allItems : allItems.filter((x) => !x.special || isMine(x));
  const mineCount = baseItems.filter(isMine).length;
  const localItems = sgg ? allItems.filter((x) => x.sgg === sgg) : [];

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [tab, query, sort, showBookmarkedOnly, showNewOnly, includeSpecial, typeFilter, showAppliedOnly]);

  const handleOpenDetail = (item: ListItem) => {
    // 전환지표: 지원금을 눌러 자세히 보는 것이 이 앱의 서비스 가치 완료 시점(신청 사이트 이동은 subsidy_apply_click)
    logClick('subsidy_click', { subsidy_id: item.key, category: item.category, kind: item.kind });
    recordDetailView();
    setDetailItem(item);
  };

  const closeDetail = useCallback(() => {
    setDetailItem(null);
    setApplied(appliedKeys());
    viewedCount.current += 1;
    // 앱을 잘 쓰고 있다는 신호(상세 5번 이상 + 신청 이동 경험)가 있는 사용자에게만 별점을 묻고,
    if (shouldAskReview()) {
      markAsked();
      // 우리 안내 시트 없이 토스 별점 화면을 바로 요청한다(토스가 안 띄울 때 버튼이 먹통처럼 보였다).
      setTimeout(requestTossReview, 350);
    } else if (viewedCount.current === PUSH_POPUP_AFTER_VIEWS && !pushPopupDone.current) {
      setPushDue('views');
    }
  }, []);
  const closePushPopup = useCallback(() => setPushPopup(null), []);

  useEffect(() => {
    if (!pushDue || pushPopupDone.current) return;
    if (detailItem || confirmUnlockId !== null || unlockingId !== null) return;
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
  }, [pushDue, detailItem, confirmUnlockId, unlockingId, pushCard]);

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

  // 찜·신청함만 볼 때는 특정 대상 사업도 빠짐없이 보이도록 전체에서 고른다.
  const pool = showBookmarkedOnly || showAppliedOnly ? allItems : baseItems;
  const tabItems =
    tab === 'all' ? pool : tab === 'local' ? localItems : pool.filter((x) => x.category === tab);
  const typeFiltered = typeFilter ? tabItems.filter((x) => typeGroup(x.type) === typeFilter) : tabItems;
  const newFiltered = showNewOnly ? typeFiltered.filter((x) => newKeys.has(x.key)) : typeFiltered;
  const appliedFiltered = showAppliedOnly ? newFiltered.filter((x) => applied.has(x.key)) : newFiltered;
  const bookmarkFiltered = showBookmarkedOnly
    ? appliedFiltered.filter((x) => isBookmarked(x.key))
    : appliedFiltered;
  const newCount = baseItems.filter((x) => newKeys.has(x.key)).length;
  const trimmedQuery = query.trim().toLowerCase();
  const searchFiltered = trimmedQuery
    ? bookmarkFiltered.filter((x) => x.searchText.includes(trimmedQuery))
    : bookmarkFiltered;
  const sorted = [...searchFiltered].sort((a, b) => {
    if (sort === 'amount') return parseAmount(b.amountText) - parseAmount(a.amountText);
    if (sort === 'deadline') return (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity);
    return (
      (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0) ||
      (b.kind === 'curated' ? 1 : 0) - (a.kind === 'curated' ? 1 : 0) ||
      (isMine(b) ? 1 : 0) - (isMine(a) ? 1 : 0) ||
      b.rank - a.rank
    );
  });
  const shown = sorted.slice(0, visible);

  const urgentCount = baseItems.filter((x) => x.isUrgent).length;
  const typeCounts = {
    cash: baseItems.filter((x) => typeGroup(x.type) === 'cash').length,
    loan: baseItems.filter((x) => typeGroup(x.type) === 'loan').length,
    other: baseItems.filter((x) => typeGroup(x.type) === 'other').length,
  };
  // 금액이 큰 지원금 3개: 갚아야 하는 대출은 빼고, '총 ○○원'이 있으면 그 금액으로 비교한다.
  // 5천만 원이 넘는 건 대개 창업·시설 사업비라 개인이 받는 돈과 거리가 멀어 뺀다.
  const topCash = useMemo(
    () =>
      baseItems
        // 직접 확인해 정리한 지원금 중 혜택 줄에 금액이 있는 것만(정부24 원문 금액은 사업비·한도가 섞여 있다)
        .filter((x) => x.kind === 'curated' && x.type === 'cash' && /\d/.test(x.headline))
        .map((x) => ({ x, won: totalAmount(x.amountText || x.headline) }))
        .filter((t) => t.won > 0 && t.won <= TOP_AMOUNT_CAP)
        .sort((a, b) => b.won - a.won)
        .slice(0, 3)
        .map((t) => t.x),
    [baseItems],
  );
  const bookmarkedItems = allItems.filter((x) => isBookmarked(x.key));
  const nextDeadline = bookmarkedItems
    .filter((x) => x.daysLeft != null && !applied.has(x.key))
    .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0))[0];
  const appliedCount = allItems.filter((x) => applied.has(x.key)).length;

  const scrollToList = () => listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const pickType = (t: TypeFilter) => {
    logClick('summary_type_click', { type: t ?? 'all' });
    setTypeFilter((cur) => (cur === t ? null : t));
    setTab('all');
    scrollToList();
  };
  const openMyList = () => {
    logClick('my_bookmarks_card_click', { count: bookmarkedItems.length });
    setShowBookmarkedOnly(true);
    setTab('all');
    scrollToList();
  };
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
        {mineCount > 0 && <p style={s.heroMine}>✨ 내 상황에 맞춘 지원금 {mineCount}개를 함께 골랐어요</p>}
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

      {/* 한눈에 보기: 지원 형태별 개수 + 금액이 큰 지원금 */}
      {!loading && baseItems.length > 0 && (
        <div style={s.summaryWrap}>
          <div style={s.summaryCard}>
            <p style={s.summaryTitle}>한눈에 보기</p>
            <div style={s.typeTiles}>
              {(
                [
                  ['cash', '💵', '받는 돈', '수당·바우처'],
                  ['loan', '🏦', '빌리는 돈', '저금리 대출'],
                  ['other', '🧾', '아끼는 돈', '감면·서비스'],
                ] as const
              ).map(([key, emoji, title, sub]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={typeFilter === key}
                  style={typeFilter === key ? { ...s.typeTile, ...s.typeTileOn } : s.typeTile}
                  onClick={() => pickType(key)}
                >
                  <span style={s.typeEmoji} aria-hidden>
                    {emoji}
                  </span>
                  <span style={s.typeTitle}>{title}</span>
                  <span style={s.typeCount}>{typeCounts[key]}개</span>
                  <span style={s.typeSub}>{sub}</span>
                </button>
              ))}
            </div>
            {topCash.length > 0 && (
              <div style={s.topList}>
                <p style={s.topTitle}>금액이 큰 지원금</p>
                {topCash.map((x, i) => (
                  <button
                    key={x.key}
                    type="button"
                    style={s.topRow}
                    onClick={() => {
                      logClick('top_amount_click', { subsidy_id: x.key, rank: i + 1 });
                      handleOpenDetail(x);
                    }}
                  >
                    <span style={s.topRank}>{i + 1}</span>
                    <span style={s.topTexts}>
                      <span style={s.topName}>{x.curated ? x.curated.title : x.headline}</span>
                      <span style={s.topAmount}>{x.curated ? x.headline : x.amountText}</span>
                    </span>
                    <span style={s.chevronSmall}>›</span>
                  </button>
                ))}
                <p style={s.topNote}>자격 조건에 따라 받을 수 있는 금액은 달라요</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 내 찜·신청 관리 */}
      {bookmarkedItems.length > 0 && (
        <div style={s.infoCardWrap}>
          <button type="button" style={s.myCard} onClick={openMyList}>
            <EmojiIcon codepoint="1F499" fallback="💙" size={32} />
            <span style={s.infoCardTexts}>
              <span style={s.pushCardTitle}>
                찜한 지원금 {bookmarkedItems.length}개{appliedCount > 0 ? ` · 신청함 ${appliedCount}개` : ''}
              </span>
              <span style={s.infoCardSub}>
                {nextDeadline
                  ? `${nextDeadline.curated ? nextDeadline.curated.title : nextDeadline.headline} 마감 ${ddayLabel(nextDeadline.daysLeft)}`
                  : '신청 준비 체크리스트로 하나씩 챙겨 보세요'}
              </span>
            </span>
            <span style={s.chevron}>›</span>
          </button>
        </div>
      )}

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
          {appliedCount > 0 && (
            <Pill
              label={`✅ 신청함 ${appliedCount}`}
              active={showAppliedOnly}
              onClick={() => setShowAppliedOnly((v) => !v)}
            />
          )}
          {typeFilter && (
            <Pill
              label={`${typeFilter === 'cash' ? '💵 받는 돈' : typeFilter === 'loan' ? '🏦 빌리는 돈' : '🧾 아끼는 돈'} ✕`}
              active
              onClick={() => setTypeFilter(null)}
            />
          )}
          {newCount > 0 && (
            <Pill
              label={`🆕 새로 올라옴 ${newCount}`}
              active={showNewOnly}
              onClick={() => setShowNewOnly((v) => !v)}
            />
          )}
          {specialCount > 0 && (
            <Pill
              label={
                mineCount > 0
                  ? `다른 특정 대상 ${specialCount - mineCount}개도 보기`
                  : `소상공인·장애인 등 특정 대상 ${specialCount}개도 보기`
              }
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
      <div ref={listTopRef} style={s.listPanel}>
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
                mine={isMine(item)}
                applied={applied.has(item.key)}
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
  /** '지금 내 상황'에 맞는 특정 대상 사업 */
  mine: boolean;
  applied: boolean;
  unlocking: boolean;
  onToggleBookmark: () => void;
  /** 상세 요약 화면을 연다. */
  onOpen: () => void;
}

function SubsidyRow({ item, bookmarked, mine, applied, unlocking, onToggleBookmark, onOpen }: SubsidyRowProps) {
  const icon = CATEGORY_ICON[item.category];
  const dday = item.isUrgent ? ddayLabel(item.daysLeft) : null;

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
            {mine && <span style={s.mineBadge}>내 상황</span>}
            {applied && <span style={s.appliedBadge}>신청함</span>}
          </div>
          <p style={{ ...s.rowHeadline, ...s.clamp2 }}>{item.headline}</p>
          <p style={{ ...s.rowSub, ...s.clamp2 }}>{item.sub}</p>
          {(item.meta || item.tags.length > 0) && (
            <p style={{ ...s.rowMeta, ...s.ellipsis }}>
              {item.tags.length > 0 && <span style={s.tagText}>{item.tags.slice(0, 2).join('·')} 대상 · </span>}
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
/** 요약 카드의 세 묶음: 받는 돈 / 빌리는 돈 / 아끼는 돈(감면·서비스) */
function typeGroup(t: BenefitType): Exclude<TypeFilter, null> {
  return t === 'cash' ? 'cash' : t === 'loan' ? 'loan' : 'other';
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
    fontSize: '17px',
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
    padding: '9px 14px',
    borderRadius: '999px',
    border: '1px solid #E5E8EB',
    backgroundColor: '#FFFFFF',
    fontSize: '15px',
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
    padding: '8px 7px',
    fontSize: '15px',
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
    fontSize: '15px',
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
    fontSize: '16px',
    lineHeight: 1.5,
    color: '#4E5968',
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
    fontSize: '15px',
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
    marginTop: '4px',
    fontSize: '14px',
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
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '22px',
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
    padding: '12px 14px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#4E5968',
    cursor: 'pointer',
  },
  clamp2: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  mineBadge: {
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: 700,
    color: '#7C3AED',
    backgroundColor: '#F3EEFF',
    borderRadius: '6px',
    padding: '2px 6px',
  },
  appliedBadge: {
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: 700,
    color: '#0A8754',
    backgroundColor: '#E6F7EF',
    borderRadius: '6px',
    padding: '2px 6px',
  },
  heroMine: {
    marginTop: '8px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#7C3AED',
  },
  summaryWrap: {
    backgroundColor: '#FFFFFF',
    padding: '0 16px 12px',
  },
  summaryCard: {
    border: '1px solid #E5E8EB',
    borderRadius: '16px',
    padding: '16px',
  },
  summaryTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#191F28',
    marginBottom: '12px',
  },
  typeTiles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  typeTile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    padding: '12px 10px',
    border: '1px solid transparent',
    borderRadius: '12px',
    backgroundColor: '#F2F4F6',
    textAlign: 'left',
    cursor: 'pointer',
    minWidth: 0,
    WebkitTapHighlightColor: 'transparent',
  },
  typeTileOn: {
    border: '1px solid #3182F6',
    backgroundColor: '#EBF3FE',
  },
  typeEmoji: {
    fontSize: '20px',
    marginBottom: '2px',
  },
  typeTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#4E5968',
  },
  typeCount: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#191F28',
  },
  typeSub: {
    fontSize: '12px',
    color: '#8B95A1',
  },
  topList: {
    marginTop: '14px',
    paddingTop: '12px',
    borderTop: '1px solid #F2F4F6',
  },
  topTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#4E5968',
    marginBottom: '4px',
  },
  topRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  topRank: {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#EBF3FE',
    color: '#3182F6',
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTexts: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  topName: {
    fontSize: '14px',
    color: '#6B7684',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  topAmount: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#1B64DA',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  topNote: {
    marginTop: '4px',
    fontSize: '13px',
    color: '#8B95A1',
  },
  chevronSmall: {
    fontSize: '20px',
    color: '#B0B8C1',
  },
  myCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    border: 'none',
    borderRadius: '16px',
    backgroundColor: '#F3F7FF',
    textAlign: 'left',
    cursor: 'pointer',
  },
};
