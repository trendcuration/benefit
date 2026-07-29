import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Paragraph } from '@toss/tds-mobile';
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  type AgeGroup,
  type Category,
  type Gender,
  type Subsidy,
} from '../data/subsidies';
import { fetchSubsidiesFallback } from '../data/api';
import { showInterstitialAd } from '../data/ads';

const BANNER_AD_ID = 'ait.v2.live.d197bbbda78c417c';
const URGENT_THRESHOLD_DAYS = 30;

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
  const [totalRevealed, setTotalRevealed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const categoryRowRef = useRef<HTMLDivElement>(null);
  const [chipScroll, setChipScroll] = useState({ atStart: true, atEnd: true });

  useEffect(() => {
    setLoading(true);
    setSubsidies(fetchSubsidiesFallback(ageGroup, gender));
    setLoading(false);
    setTotalRevealed(false);
  }, [ageGroup, gender]);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let result: { destroy: () => void } | undefined;
    import('@apps-in-toss/web-framework').then(({ TossAds }) => {
      if (!TossAds.attachBanner.isSupported()) return;
      // 광고 SDK가 노출을 정상 집계하려면 attach 시점에 컨테이너가 이미 실제 크기를
      // 갖고 있어야 하므로, React state가 아니라 DOM에 동기적으로 먼저 적용한다.
      el.style.minHeight = '60px';
      result = TossAds.attachBanner(BANNER_AD_ID, el);
    }).catch(() => {});
    return () => result?.destroy();
  }, []);

  useEffect(() => {
    const el = categoryRowRef.current;
    if (!el) return;
    const updateScroll = () => {
      setChipScroll({
        atStart: el.scrollLeft <= 0,
        atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    };
    updateScroll();
    el.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      el.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [subsidies]);

  const categoryFiltered = activeCategory
    ? subsidies.filter((s) => s.category === activeCategory)
    : subsidies;
  const sorted = [...categoryFiltered].sort((a, b) => {
    if (sort === 'amount') return parseAmount(b.amount) - parseAmount(a.amount);
    return (isNearDeadline(b.deadline) ? 1 : 0) - (isNearDeadline(a.deadline) ? 1 : 0);
  });

  const urgentCount = subsidies.filter((s) => isNearDeadline(s.deadline)).length;
  const totalAmount = subsidies.reduce((sum, item) => sum + parseAmount(item.amount), 0);

  const handleRevealTotal = () => {
    showInterstitialAd();
    setTotalRevealed(true);
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
          <Paragraph typography="t5" color="#3182F6">
            {loading ? '불러오는 중...' : `${subsidies.length}개 지원금`}
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
        <div ref={categoryRowRef} style={s.categoryRow}>
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
        {!chipScroll.atStart && <div style={s.categoryFadeLeft} />}
        {!chipScroll.atEnd && <div style={s.categoryFadeRight} />}
      </div>

      {/* 총액 확인 CTA */}
      {!loading && subsidies.length > 0 && (
        <div style={s.totalCtaWrap}>
          {totalRevealed ? (
            <div style={s.totalRevealBox}>
              <Paragraph typography="t4" fontWeight="bold" style={{ color: '#191F28' }}>
                💰 지금 조건으로 최대 <span style={{ color: '#3182F6' }}>{formatTotal(totalAmount)}</span>까지 받을 수 있어요!
              </Paragraph>
            </div>
          ) : (
            <Button
              display="full"
              size="large"
              color="primary"
              variant="fill"
              onClick={handleRevealTotal}
            >
              💰 내가 받을 수 있는 지원금 총액 확인하기
            </Button>
          )}
        </div>
      )}

      {/* 정렬 + 결과 수 */}
      <div style={s.sortRow}>
        <Paragraph typography="t5" color="#6B7684">
          {activeCategory
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
          <EmptyState onBack={onBack} />
        ) : (
          sorted.map((item) => <SubsidyCard key={item.id} item={item} />)
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

// ── 지원금 카드 ──
function SubsidyCard({ item }: { item: Subsidy }) {
  const ddayInfo = getDdayInfo(item.deadline);
  const urgent = ddayInfo !== null && ddayInfo.days <= URGENT_THRESHOLD_DAYS;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={s.cardLink}>
      <div style={{ ...s.card, ...(urgent ? s.cardUrgent : {}) }}>
        {/* 카테고리 + 마감일 */}
        <div style={s.cardMeta}>
          <Badge size="xsmall" variant="weak" color="blue">
            {CATEGORY_EMOJI[item.category]} {item.category}
          </Badge>
          {urgent ? (
            <Badge size="xsmall" variant="fill" color="yellow">
              🔥 {ddayInfo?.label}
            </Badge>
          ) : (
            <Paragraph typography="t6" color="#8B95A1">
              {item.deadline}
            </Paragraph>
          )}
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
          <Badge size="large" variant="fill" color="blue">
            {item.amount}
          </Badge>
          <Paragraph typography="t6" color="#8B95A1" style={s.cardSource}>
            {item.source}
          </Paragraph>
        </div>
      </div>
    </a>
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
      <Paragraph typography="t5" color="#8B95A1">
        연령대나 성별을 다시 선택해보세요
      </Paragraph>
      <Button size="medium" color="primary" variant="weak" onClick={onBack} style={s.emptyResetBtn}>
        필터 다시 선택하기
      </Button>
    </div>
  );
}

// ── 유틸 ──
function getDdayInfo(deadline: string): { label: string; days: number } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
  const diffMs = new Date(`${deadline}T23:59:59`).getTime() - Date.now();
  const days = Math.ceil(diffMs / 86_400_000);
  if (days < 0) return null;
  return { label: days === 0 ? 'D-day' : `D-${days}`, days };
}

function isNearDeadline(deadline: string): boolean {
  const info = getDdayInfo(deadline);
  return info !== null && info.days <= URGENT_THRESHOLD_DAYS;
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

function formatTotal(amount: number): string {
  if (amount <= 0) return '0원';
  const eok = Math.floor(amount / 100_000_000);
  const man = Math.round((amount % 100_000_000) / 10_000);
  if (eok > 0) return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  return `${man.toLocaleString()}만원`;
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
    overflow: 'hidden',
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
    padding: '12px 16px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  categoryFadeLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '28px',
    background: 'linear-gradient(to left, rgba(255,255,255,0), #FFFFFF)',
    pointerEvents: 'none',
  },
  categoryFadeRight: {
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
  totalCtaWrap: {
    padding: '4px 16px 8px',
  },
  totalRevealBox: {
    backgroundColor: '#EBF3FE',
    borderRadius: '12px',
    padding: '14px 16px',
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
    display: 'block',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '4px 8px',
    paddingTop: '4px',
  },
  cardSource: {
    whiteSpace: 'nowrap',
    flexShrink: 0,
    marginLeft: 'auto',
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
