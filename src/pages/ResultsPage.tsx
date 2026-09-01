import { Fragment, useEffect, useRef, useState } from 'react';
import { Badge, Button, Paragraph, TextField } from '@toss/tds-mobile';
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  LAST_UPDATED,
  REGIONS,
  type AgeGroup,
  type Category,
  type Gender,
  type Region,
  type Subsidy,
} from '../data/subsidies';
import { fetchSubsidiesFallback } from '../data/api';
import { useBookmarks } from '../hooks/useBookmarks';

const BANNER_AD_ID = 'ait.v2.live.d197bbbda78c417c';
const INFEED_BANNER_AD_ID = 'ait.v2.live.ee27252f33184337';
const REWARDED_AD_ID = 'ait.v2.live.327ced0813c8420f';
const INFEED_BANNER_INTERVAL = 6;

type SortKey = 'default' | 'amount' | 'deadline';

/**
 * TossAds.attachBanner()는 initialize()로 광고 SDK를 먼저 불러오지 않으면
 * "Call initialize() before attaching an ad" 에러로 조용히 실패합니다.
 */
function attachTossBanner(
  adGroupId: string,
  el: HTMLElement,
  onResult: (result: { destroy: () => void } | undefined) => void
) {
  let cancelled = false;
  import('@apps-in-toss/web-framework')
    .then(({ TossAds }) => {
      if (cancelled || !TossAds.attachBanner.isSupported()) return;
      TossAds.initialize({
        callbacks: {
          onInitialized: () => {
            if (cancelled) return;
            onResult(TossAds.attachBanner(adGroupId, el));
          },
        },
      });
    })
    .catch(() => {});
  return () => {
    cancelled = true;
  };
}

interface ResultsPageProps {
  ageGroup: AgeGroup | null;
  gender: Gender;
  onBack: () => void;
}

export function ResultsPage({ ageGroup, gender, onBack }: ResultsPageProps) {
  const [sort, setSort] = useState<SortKey>('default');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [query, setQuery] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [unlockingId, setUnlockingId] = useState<number | null>(null);
  const {
    isBookmarked,
    toggle: toggleBookmark,
    add: addBookmark,
    bookmarkedIds,
    isLimitReached,
    unlockUnlimited,
  } = useBookmarks();

  useEffect(() => {
    setLoading(true);
    setSubsidies(fetchSubsidiesFallback(ageGroup, gender));
    setLoading(false);
  }, [ageGroup, gender]);

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

  const categoryFiltered = activeCategory
    ? subsidies.filter((s) => s.category === activeCategory)
    : subsidies;
  const regionFiltered = activeRegion
    ? categoryFiltered.filter((s) => s.regions.includes('전국') || s.regions.includes(activeRegion))
    : categoryFiltered;
  const bookmarkFiltered = showBookmarkedOnly
    ? regionFiltered.filter((s) => isBookmarked(s.id))
    : regionFiltered;
  const trimmedQuery = query.trim().toLowerCase();
  const searchFiltered = trimmedQuery
    ? bookmarkFiltered.filter(
        (s) =>
          s.title.toLowerCase().includes(trimmedQuery) ||
          s.description.toLowerCase().includes(trimmedQuery)
      )
    : bookmarkFiltered;
  const sorted = [...searchFiltered].sort((a, b) => {
    if (sort === 'amount') return parseAmount(b.amount) - parseAmount(a.amount);
    if (sort === 'deadline') return deadlineRank(a.deadline) - deadlineRank(b.deadline);
    return (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0);
  });

  const urgentCount = subsidies.filter((s) => s.isUrgent).length;

  const handleToggleBookmark = (id: number) => {
    if (isBookmarked(id) || !isLimitReached) {
      toggleBookmark(id);
      return;
    }
    // 무료 북마크 한도 초과: 리워드 광고 시청 후 무제한 해제 + 해당 항목 북마크
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

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <button style={s.backBtn} onClick={onBack} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#191F28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={s.headerCenter}>
          <Paragraph typography="t3" fontWeight="bold" style={s.headerTitle}>
            {ageGroup ?? '전체'} · {gender}
          </Paragraph>
          <Paragraph typography="t4" color="#3182F6">
            {loading ? '불러오는 중...' : `${subsidies.length}개 지원금 · ${LAST_UPDATED} 업데이트`}
          </Paragraph>
        </div>
        <div style={{ width: 40 }} />
      </header>

      {/* 배너 광고 */}
      <div ref={bannerRef} style={s.banner} />

      {/* 로딩 */}
      {loading && (
        <div style={s.loadingWrap}>
          <Paragraph typography="t4" color="#6B7684">
            지원금 정보를 불러오고 있어요...
          </Paragraph>
        </div>
      )}

      {/* 마감 임박 알림 */}
      {urgentCount > 0 && (
        <div style={s.urgentBanner}>
          <span>🔥</span>
          <Paragraph typography="t4" style={{ color: '#B45309' }}>
            마감 임박 지원금 <strong>{urgentCount}개</strong>가 있어요! 서둘러 확인하세요
          </Paragraph>
        </div>
      )}

      {/* 카테고리 필터 */}
      <div style={s.categoryRowWrap}>
        <div style={s.categoryRow}>
          <Button
            size="small"
            color="primary"
            variant={activeCategory === null ? 'fill' : 'weak'}
            onClick={() => setActiveCategory(null)}
            style={s.chipBtn}
          >
            전체
          </Button>
          {CATEGORIES.map((cat) => {
            const count = subsidies.filter((item) => item.category === cat).length;
            if (count === 0) return null;
            const isActive = activeCategory === cat;
            return (
              <Button
                key={cat}
                size="small"
                color="primary"
                variant={isActive ? 'fill' : 'weak'}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                style={s.chipBtn}
              >
                {CATEGORY_EMOJI[cat]} {cat}
              </Button>
            );
          })}
        </div>
        <div style={s.categoryFade} />
      </div>

      {/* 지역 필터 */}
      <div style={s.categoryRowWrap}>
        <div style={s.categoryRow}>
          <Button
            size="small"
            color="primary"
            variant={activeRegion === null ? 'fill' : 'weak'}
            onClick={() => setActiveRegion(null)}
            style={s.chipBtn}
          >
            전체 지역
          </Button>
          {REGIONS.map((region) => {
            const isActive = activeRegion === region;
            return (
              <Button
                key={region}
                size="small"
                color="primary"
                variant={isActive ? 'fill' : 'weak'}
                onClick={() => setActiveRegion(isActive ? null : region)}
                style={s.chipBtn}
              >
                📍 {region}
              </Button>
            );
          })}
        </div>
        <div style={s.categoryFade} />
      </div>

      {/* 검색 */}
      <div style={s.searchWrap}>
        <TextField.Clearable
          variant="box"
          placeholder="지원금 검색 (예: 청년, 월세, 육아)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 찜한 것만 보기 */}
      <div style={s.bookmarkToggleWrap}>
        <Button
          size="small"
          color="primary"
          variant={showBookmarkedOnly ? 'fill' : 'weak'}
          onClick={() => setShowBookmarkedOnly((v) => !v)}
        >
          {showBookmarkedOnly ? '💙' : '🤍'} 찜한 지원금만 보기 ({bookmarkedIds.length})
        </Button>
        {isLimitReached && (
          <Paragraph typography="t5" color="#8B95A1" style={s.limitHint}>
            무료 북마크를 다 채웠어요 · 하트를 누르면 광고 보고 무제한으로 늘려드려요
          </Paragraph>
        )}
      </div>

      {/* 정렬 + 결과 수 */}
      <div style={s.sortRow}>
        <Paragraph typography="t4" color="#6B7684">
          {activeCategory
            ? `${CATEGORY_EMOJI[activeCategory]} ${activeCategory} `
            : '전체 '}
          {sorted.length}개
        </Paragraph>
        <div style={s.sortBtns}>
          {(['default', 'amount', 'deadline'] as SortKey[]).map((key) => (
            <Button
              key={key}
              size="small"
              color="primary"
              variant={sort === key ? 'fill' : 'weak'}
              onClick={() => setSort(key)}
            >
              {SORT_LABEL[key]}
            </Button>
          ))}
        </div>
      </div>

      {/* 결과 목록 */}
      <div style={s.list}>
        {sorted.length === 0 ? (
          <EmptyState onBack={onBack} />
        ) : (
          sorted.map((item, index) => (
            <Fragment key={item.id}>
              <SubsidyCard
                item={item}
                bookmarked={isBookmarked(item.id)}
                unlocking={unlockingId === item.id}
                onToggleBookmark={() => handleToggleBookmark(item.id)}
              />
              {(index + 1) % INFEED_BANNER_INTERVAL === 0 && index !== sorted.length - 1 && (
                <InFeedBanner key={`banner-${item.id}`} />
              )}
            </Fragment>
          ))
        )}
      </div>

      {/* 더보기 */}
      <div style={s.moreWrap}>
        <Button
          as="a"
          display="full"
          size="xlarge"
          color="primary"
          variant="weak"
          href="https://www.bokjiro.go.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          복지로에서 더 많은 지원금 보기 →
        </Button>
      </div>
    </div>
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

// ── 지원금 카드 ──
interface SubsidyCardProps {
  item: Subsidy;
  bookmarked: boolean;
  unlocking: boolean;
  onToggleBookmark: () => void;
}

function SubsidyCard({ item, bookmarked, unlocking, onToggleBookmark }: SubsidyCardProps) {
  const dday = item.isUrgent ? getDday(item.deadline) : null;

  const handleShare = () => {
    import('@apps-in-toss/web-framework')
      .then(({ share }) => share({ message: `[${item.title}]\n${item.amount}\n${item.url}` }))
      .catch(() => {});
  };

  return (
    <div style={s.cardWrap}>
      <a href={item.url} target="_blank" rel="noopener noreferrer" style={s.cardLink}>
        <div style={{ ...s.card, ...(item.isUrgent ? s.cardUrgent : {}) }}>
          {/* 카테고리 + 마감일 */}
          <div style={s.cardMeta}>
            <Badge size="xsmall" variant="weak" color="blue">
              {CATEGORY_EMOJI[item.category]} {item.category}
            </Badge>
            {item.isUrgent ? (
              <Badge size="xsmall" variant="fill" color="yellow">
                🔥 {dday ?? '마감 임박'}
              </Badge>
            ) : (
              <Paragraph typography="t5" color="#6B7684">
                {item.deadline}
              </Paragraph>
            )}
          </div>

          {/* 제목 */}
          <Paragraph typography="t3" fontWeight="bold" style={{ ...s.cardTitle, paddingRight: '60px' }}>
            {item.title}
          </Paragraph>

          {/* 설명 */}
          <Paragraph typography="t4" color="#6B7684" style={s.cardDesc}>
            {item.description}
          </Paragraph>

          {/* 금액 + 출처 */}
          <div style={s.cardBottom}>
            <Badge size="large" variant="fill" color="blue">
              {item.amount}
            </Badge>
            <Paragraph typography="t5" color="#6B7684" style={s.cardSource}>
              {item.source}
            </Paragraph>
          </div>
        </div>
      </a>
      <div style={s.cardActions}>
        <button type="button" aria-label="공유하기" style={s.cardActionBtn} onClick={handleShare}>
          🔗
        </button>
        <button
          type="button"
          aria-label={bookmarked ? '찜 해제' : '찜하기'}
          style={s.cardActionBtn}
          onClick={onToggleBookmark}
          disabled={unlocking}
        >
          {unlocking ? '⏳' : bookmarked ? '💙' : '🤍'}
        </button>
      </div>
    </div>
  );
}

// ── 빈 상태 ──
function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div style={s.empty}>
      <span style={s.emptyIcon}>🔍</span>
      <Paragraph typography="t3" fontWeight="bold">
        해당 조건의 지원금이 없어요
      </Paragraph>
      <Paragraph typography="t4" color="#6B7684">
        연령대나 성별을 다시 선택해보세요
      </Paragraph>
      <Button size="medium" color="primary" variant="weak" onClick={onBack} style={s.emptyResetBtn}>
        필터 다시 선택하기
      </Button>
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
  deadline: '마감임박순',
};

// ── 스타일 ──
const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: '#F2F4F6',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 8px 8px 4px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F2F4F6',
  },
  backBtn: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
  },
  headerCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  headerTitle: {
    letterSpacing: '-0.3px',
  },
  banner: {
    width: '100%',
    minHeight: '60px',
  },
  loadingWrap: {
    padding: '32px 16px',
    display: 'flex',
    justifyContent: 'center',
  },
  urgentBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFF4E5',
    padding: '12px 16px',
  },
  categoryRowWrap: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  categoryRow: {
    display: 'flex',
    gap: '8px',
    padding: '8px 16px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  categoryFade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '28px',
    background: 'linear-gradient(to right, rgba(255,255,255,0), #FFFFFF)',
    pointerEvents: 'none',
  },
  chipBtn: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  searchWrap: {
    padding: '8px 16px 0',
    backgroundColor: '#FFFFFF',
  },
  bookmarkToggleWrap: {
    padding: '8px 16px 12px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'flex-start',
  },
  limitHint: {
    lineHeight: 1.5,
  },
  sortRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
  },
  sortBtns: {
    display: 'flex',
    gap: '6px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 16px 16px',
  },
  infeedBanner: {
    width: '100%',
    minHeight: '60px',
  },
  cardWrap: {
    position: 'relative',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  cardActions: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    gap: '4px',
  },
  cardActionBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px',
    borderLeft: '4px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardUrgent: {
    borderLeft: '4px solid #F59E0B',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '60px',
  },
  cardTitle: {
    letterSpacing: '-0.3px',
    lineHeight: 1.4,
  },
  cardDesc: {
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    paddingTop: '4px',
  },
  cardSource: {
    margin: 0,
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 0',
    gap: '12px',
  },
  emptyResetBtn: {
    marginTop: '8px',
  },
  emptyIcon: {
    fontSize: '48px',
  },
  moreWrap: {
    padding: '8px 16px 32px',
  },
};
