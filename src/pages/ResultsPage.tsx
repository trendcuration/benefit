import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Paragraph } from '@toss/tds-mobile';
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  getDaysLeft,
  getDeadlineStatus,
  type AgeGroup,
  type Category,
  type Gender,
  type Subsidy,
} from '../data/subsidies';
import { fetchSubsidies, fetchSubsidiesFallback } from '../data/api';
import { loadBookmarks, persistBookmarks } from '../utils/storage';
import { shareMessage } from '../utils/share';

const BANNER_AD_ID = 'ait.v2.live.d197bbbda78c417c';

type SortKey = 'default' | 'amount';

interface ResultsPageProps {
  ageGroup: AgeGroup | null;
  gender: Gender;
  onBack: () => void;
}

export function ResultsPage({ ageGroup, gender, onBack }: ResultsPageProps) {
  const [sort, setSort] = useState<SortKey>('default');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [bookmarks, setBookmarks] = useState<Set<string>>(loadBookmarks);
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchSubsidies(ageGroup, gender)
      .then((data) => {
        if (cancelled) return;
        // 서버(공공데이터) 응답이 실제 금액 정보를 담고 있을 때만 라이브로 채택한다.
        // 현재 연동된 odcloud 데이터셋은 금액·마감일 필드가 없어 전부 '지원'/'상시'로
        // 내려오는데, 이 경우 큐레이션된 정적 데이터가 훨씬 정보량이 많으므로 그쪽을 쓴다.
        const hasRealAmounts = data.some(
          (d) => d.amount && d.amount !== '지원' && parseAmount(d.amount) > 0,
        );
        if (data.length > 0 && hasRealAmounts) {
          setSubsidies(data);
          setIsLive(true);
        } else {
          setSubsidies(fetchSubsidiesFallback(ageGroup, gender));
          setIsLive(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setSubsidies(fetchSubsidiesFallback(ageGroup, gender));
        setIsLive(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ageGroup, gender]);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let result: { destroy: () => void } | undefined;
    import('@apps-in-toss/web-framework').then(({ TossAds }) => {
      if (!TossAds.attachBanner.isSupported()) return;
      result = TossAds.attachBanner(BANNER_AD_ID, el);
    }).catch(() => {});
    return () => result?.destroy();
  }, []);

  const toggleBookmark = (title: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      persistBookmarks(next);
      return next;
    });
  };

  const handleShare = async () => {
    const total = totalAmount > 0 ? ` 다 받으면 최대 ${formatKoreanAmount(totalAmount)} 규모!` : '';
    const result = await shareMessage(
      `💰 ${ageGroup ?? '전체'}·${gender} 조건으로 받을 수 있는 지원금 ${subsidies.length}개를 찾았어요!${total}\n토스 '나의 지원금'에서 확인해보세요.`,
    );
    if (result === 'copied') {
      setShareNotice('공유 메시지를 복사했어요');
      setTimeout(() => setShareNotice(null), 2000);
    }
  };

  const normalizedKeyword = keyword.trim();
  const filtered = subsidies.filter((item) => {
    if (bookmarksOnly && !bookmarks.has(item.title)) return false;
    if (activeCategory && item.category !== activeCategory) return false;
    if (normalizedKeyword && !`${item.title} ${item.description}`.includes(normalizedKeyword)) return false;
    return true;
  });
  const statusRank: Record<string, number> = { urgent: 0, ongoing: 1, expired: 2 };
  const sorted = [...filtered].sort((a, b) => {
    // 마감된 항목은 항상 맨 아래로
    const rankA = statusRank[getDeadlineStatus(a.deadline)];
    const rankB = statusRank[getDeadlineStatus(b.deadline)];
    if (sort === 'amount') {
      if (rankA !== rankB) return rankA - rankB;
      return parseAmount(b.amount) - parseAmount(a.amount);
    }
    return rankA - rankB;
  });

  const urgentCount = subsidies.filter((sb) => getDeadlineStatus(sb.deadline) === 'urgent').length;
  const totalAmount = useMemo(
    () => subsidies.reduce((sum, item) => sum + parseAmount(item.amount), 0),
    [subsidies],
  );

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <button style={s.iconBtn} onClick={onBack} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#191F28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={s.headerCenter}>
          <Paragraph typography="t3" fontWeight="bold" style={s.headerTitle}>
            {ageGroup ?? '전체'} · {gender}
          </Paragraph>
          <Paragraph typography="t5" color="#3182F6">
            {loading ? '불러오는 중...' : `${subsidies.length}개 지원금`}
          </Paragraph>
        </div>
        <button style={s.iconBtn} onClick={handleShare} aria-label="공유하기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v13M7 8l5-5 5 5" stroke="#191F28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {shareNotice && (
        <div style={s.shareNotice} className="benefit-fade-up">
          <Paragraph typography="t5" style={{ color: '#FFFFFF' }}>
            ✅ {shareNotice}
          </Paragraph>
        </div>
      )}

      {/* 배너 광고 */}
      <div ref={bannerRef} style={s.banner} />

      {/* 로딩 스켈레톤 */}
      {loading && (
        <div style={s.list}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={s.skeletonCard} className="benefit-shimmer">
              <div style={{ ...s.skeletonBar, width: '30%' }} />
              <div style={{ ...s.skeletonBar, width: '80%', height: 18 }} />
              <div style={{ ...s.skeletonBar, width: '95%' }} />
              <div style={{ ...s.skeletonBar, width: '45%' }} />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <>
          {/* 결과 요약 히어로 */}
          <div style={s.hero} className="benefit-fade-up">
            <Paragraph typography="t4" style={{ color: 'rgba(255,255,255,0.85)' }}>
              🎉 조건에 맞는 지원금을 <strong>{subsidies.length}개</strong> 찾았어요
            </Paragraph>
            {totalAmount > 0 && (
              <div style={s.heroAmountRow}>
                <Paragraph typography="t6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  전부 받는다면 최대
                </Paragraph>
                <CountUpAmount target={totalAmount} />
              </div>
            )}
            <Paragraph typography="t7" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {isLive ? '공공데이터 실시간 기준 · 금액은 단순 합산 추정치예요' : '자체 선별 데이터 기준 · 금액은 단순 합산 추정치예요'}
            </Paragraph>
          </div>

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
          <div style={s.categoryRow}>
            <Button
              size="small"
              color="primary"
              variant={activeCategory === null && !bookmarksOnly ? 'fill' : 'weak'}
              onClick={() => {
                setActiveCategory(null);
                setBookmarksOnly(false);
              }}
              style={s.chipBtn}
            >
              전체
            </Button>
            {bookmarks.size > 0 && (
              <Button
                size="small"
                color="primary"
                variant={bookmarksOnly ? 'fill' : 'weak'}
                onClick={() => setBookmarksOnly((v) => !v)}
                style={s.chipBtn}
              >
                ❤️ 찜 {bookmarks.size}
              </Button>
            )}
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

          {/* 키워드 검색 */}
          <div style={s.searchRow}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="지원금 이름·내용 검색 (예: 월세, 취업)"
              inputMode="search"
            />
            {keyword && (
              <button style={s.searchClear} onClick={() => setKeyword('')} aria-label="검색어 지우기">
                ✕
              </button>
            )}
          </div>

          {/* 정렬 + 결과 수 */}
          <div style={s.sortRow}>
            <Paragraph typography="t5" color="#6B7684">
              {bookmarksOnly
                ? '❤️ 찜한 지원금 '
                : activeCategory
                  ? `${CATEGORY_EMOJI[activeCategory]} ${activeCategory} `
                  : '전체 '}
              {sorted.length}개
            </Paragraph>
            <div style={s.sortBtns}>
              {(['default', 'amount'] as SortKey[]).map((key) => (
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
              <EmptyState bookmarksOnly={bookmarksOnly} hasKeyword={!!normalizedKeyword} />
            ) : (
              sorted.map((item, index) => (
                <SubsidyCard
                  key={`${item.id}-${item.title}`}
                  item={item}
                  index={index}
                  bookmarked={bookmarks.has(item.title)}
                  onToggleBookmark={() => toggleBookmark(item.title)}
                />
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
        </>
      )}
    </div>
  );
}

// ── 총액 카운트업 ──
function CountUpAmount({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return <span style={s.heroAmount}>{formatKoreanAmount(value)}</span>;
}

// ── 지원금 카드 ──
function SubsidyCard({
  item,
  index,
  bookmarked,
  onToggleBookmark,
}: {
  item: Subsidy;
  index: number;
  bookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const status = getDeadlineStatus(item.deadline);
  const daysLeft = getDaysLeft(item.deadline);
  const isExpired = status === 'expired';
  const isUrgent = status === 'urgent';

  return (
    <div
      style={{
        ...s.card,
        ...(isUrgent ? s.cardUrgent : {}),
        ...(isExpired ? s.cardExpired : {}),
        animationDelay: `${Math.min(index, 8) * 50}ms`,
      }}
      className="benefit-fade-up benefit-card"
    >
      <button
        style={s.bookmarkBtn}
        onClick={onToggleBookmark}
        aria-label={bookmarked ? '찜 해제' : '찜하기'}
        className={bookmarked ? 'benefit-pop' : undefined}
      >
        {bookmarked ? '❤️' : '🤍'}
      </button>

      <a href={item.url} target="_blank" rel="noopener noreferrer" style={s.cardLink}>
        {isUrgent && (
          <Badge size="small" variant="fill" color="yellow" style={s.urgentBadge}>
            🔥 마감 임박{daysLeft !== null ? ` · D-${daysLeft}` : ''}
          </Badge>
        )}
        {isExpired && (
          <Badge size="small" variant="weak" color="elephant" style={s.urgentBadge}>
            지원 종료
          </Badge>
        )}

        {/* 카테고리 + 마감일 */}
        <div style={s.cardMeta}>
          <Badge size="xsmall" variant="weak" color="blue">
            {CATEGORY_EMOJI[item.category]} {item.category}
          </Badge>
          <Paragraph typography="t6" color="#B0B8C1">
            {isExpired ? `마감 (${item.deadline})` : item.deadline}
          </Paragraph>
        </div>

        {/* 제목 */}
        <Paragraph typography="t3" fontWeight="bold" style={s.cardTitle}>
          {item.title}
        </Paragraph>

        {/* 설명 */}
        <Paragraph typography="t5" color="#6B7684" style={s.cardDesc}>
          {item.description}
        </Paragraph>

        {/* 금액 + 출처 */}
        <div style={s.cardBottom}>
          <Badge size="medium" variant="fill" color="blue">
            {item.amount}
          </Badge>
          <Paragraph typography="t6" color="#B0B8C1">
            {item.source}
          </Paragraph>
        </div>
      </a>
    </div>
  );
}

// ── 빈 상태 ──
function EmptyState({ bookmarksOnly, hasKeyword }: { bookmarksOnly: boolean; hasKeyword: boolean }) {
  return (
    <div style={s.empty}>
      <span style={s.emptyIcon}>{bookmarksOnly ? '🤍' : '🔍'}</span>
      <Paragraph typography="t3" fontWeight="bold">
        {bookmarksOnly ? '아직 찜한 지원금이 없어요' : '해당 조건의 지원금이 없어요'}
      </Paragraph>
      <Paragraph typography="t5" color="#B0B8C1">
        {bookmarksOnly
          ? '마음에 드는 지원금의 하트를 눌러 저장해보세요'
          : hasKeyword
            ? '검색어를 바꾸거나 지워보세요'
            : '다른 카테고리를 선택해보세요'}
      </Paragraph>
    </div>
  );
}

// ── 유틸 ──
function parseAmount(str: string): number {
  const nums = str.replace(/[^0-9]/g, '');
  if (!nums) return 0;
  let n = parseInt(nums, 10);
  if (str.includes('억')) n *= 100_000_000;
  else if (str.includes('천만')) n *= 10_000_000;
  else if (str.includes('만')) n *= 10_000;
  return n;
}

function formatKoreanAmount(n: number): string {
  if (n >= 100_000_000) {
    const eok = n / 100_000_000;
    return `${eok >= 10 ? Math.round(eok) : Math.round(eok * 10) / 10}억원`;
  }
  if (n >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

const SORT_LABEL: Record<SortKey, string> = {
  default: '추천순',
  amount: '금액순',
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
  iconBtn: {
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
  shareNotice: {
    position: 'fixed',
    top: '64px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(25, 31, 40, 0.9)',
    borderRadius: '99px',
    padding: '8px 16px',
    zIndex: 100,
  },
  banner: {
    width: '100%',
    minHeight: '60px',
  },
  hero: {
    margin: '12px 16px 0',
    padding: '18px 20px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3182F6 0%, #1B64DA 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  heroAmountRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  heroAmount: {
    color: '#FFFFFF',
    fontSize: '28px',
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  skeletonBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EDF0F3',
  },
  urgentBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFF4E5',
    padding: '12px 16px',
    marginTop: '12px',
  },
  categoryRow: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    overflowX: 'auto',
    backgroundColor: '#FFFFFF',
    scrollbarWidth: 'none',
    marginTop: '12px',
  },
  chipBtn: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    padding: '0 16px 12px',
  },
  searchIcon: {
    fontSize: '14px',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: '#F2F4F6',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    color: '#191F28',
  },
  searchClear: {
    border: 'none',
    background: 'none',
    color: '#B0B8C1',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '4px',
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
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  card: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px',
    borderLeft: '4px solid transparent',
  },
  cardUrgent: {
    borderLeft: '4px solid #F59E0B',
  },
  cardExpired: {
    opacity: 0.6,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    zIndex: 1,
    WebkitTapHighlightColor: 'transparent',
  },
  urgentBadge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '36px',
  },
  cardTitle: {
    letterSpacing: '-0.3px',
    lineHeight: 1.4,
    paddingRight: '28px',
  },
  cardDesc: {
    lineHeight: 1.6,
  },
  cardBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '4px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 0',
    gap: '12px',
  },
  emptyIcon: {
    fontSize: '48px',
  },
  moreWrap: {
    padding: '8px 16px 32px',
  },
};
