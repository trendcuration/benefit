import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Paragraph } from '@toss/tds-mobile';
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  filterSubsidies,
  type AgeGroup,
  type Category,
  type Gender,
  type Subsidy,
} from '../data/subsidies';

const BANNER_AD_ID = 'ait.v2.live.81fc627450514ce2';

type SortKey = 'default' | 'amount';

interface ResultsPageProps {
  ageGroup: AgeGroup | null;
  gender: Gender;
  onBack: () => void;
}

export function ResultsPage({ ageGroup, gender, onBack }: ResultsPageProps) {
  const [sort, setSort] = useState<SortKey>('default');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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

  const base = filterSubsidies(ageGroup, gender);
  const categoryFiltered = activeCategory
    ? base.filter((s) => s.category === activeCategory)
    : base;
  const sorted = [...categoryFiltered].sort((a, b) => {
    if (sort === 'amount') return parseAmount(b.amount) - parseAmount(a.amount);
    return (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0);
  });

  const urgentCount = base.filter((s) => s.isUrgent).length;

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
          <Paragraph typography="t5" color="primary">
            {base.length}개 지원금
          </Paragraph>
        </div>
        <div style={{ width: 40 }} />
      </header>

      {/* 배너 광고 */}
      <div ref={bannerRef} style={s.banner} />

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
          variant={activeCategory === null ? 'fill' : 'weak'}
          onClick={() => setActiveCategory(null)}
          style={s.chipBtn}
        >
          전체
        </Button>
        {CATEGORIES.map((cat) => {
          const count = base.filter((item) => item.category === cat).length;
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

      {/* 정렬 + 결과 수 */}
      <div style={s.sortRow}>
        <Paragraph typography="t5" color="secondary">
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
              color={sort === key ? 'primary' : 'dark'}
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
          <EmptyState />
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
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={s.cardLink}>
      <div style={{ ...s.card, ...(item.isUrgent ? s.cardUrgent : {}) }}>
        {item.isUrgent && (
          <Badge size="small" style={s.urgentBadge}>
            🔥 마감 임박
          </Badge>
        )}

        {/* 카테고리 + 마감일 */}
        <div style={s.cardMeta}>
          <Badge size="xsmall" style={s.categoryBadge}>
            {CATEGORY_EMOJI[item.category]} {item.category}
          </Badge>
          <Paragraph typography="t6" color="tertiary">
            {item.deadline}
          </Paragraph>
        </div>

        {/* 제목 */}
        <Paragraph typography="t3" fontWeight="bold" style={s.cardTitle}>
          {item.title}
        </Paragraph>

        {/* 설명 */}
        <Paragraph typography="t5" color="secondary" style={s.cardDesc}>
          {item.description}
        </Paragraph>

        {/* 금액 + 출처 */}
        <div style={s.cardBottom}>
          <Badge size="medium" style={s.amountBadge}>
            {item.amount}
          </Badge>
          <Paragraph typography="t6" color="tertiary">
            {item.source}
          </Paragraph>
        </div>
      </div>
    </a>
  );
}

// ── 빈 상태 ──
function EmptyState() {
  return (
    <div style={s.empty}>
      <span style={s.emptyIcon}>🔍</span>
      <Paragraph typography="t3" fontWeight="bold">
        해당 조건의 지원금이 없어요
      </Paragraph>
      <Paragraph typography="t5" color="tertiary">
        다른 카테고리를 선택해보세요
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
    minHeight: '60px',
  },
  urgentBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFF4E5',
    padding: '12px 16px',
  },
  categoryRow: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    overflowX: 'auto',
    backgroundColor: '#FFFFFF',
    scrollbarWidth: 'none',
  },
  chipBtn: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
  urgentBadge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    color: '#B45309',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: '#EBF3FE',
    color: '#3182F6',
  },
  cardTitle: {
    letterSpacing: '-0.3px',
    lineHeight: 1.4,
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
  amountBadge: {
    backgroundColor: '#3182F6',
    color: '#FFFFFF',
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
