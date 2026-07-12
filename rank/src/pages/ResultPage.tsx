import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Paragraph } from '@toss/tds-mobile';
import {
  AVERAGE,
  MEDIAN,
  METRIC_META,
  POPULATION,
  SOURCE_NOTE,
} from '../data/percentiles';
import {
  formatCount,
  formatManwon,
  formatPercentile,
  getRank,
  valueAtPercentile,
  TOP_CAP,
} from '../data/rank';
import { getTier } from '../data/tiers';
import type { JudgeParams } from '../App';

// TODO: 토스 개발자센터에서 rank 앱 등록 후 실제 광고 그룹 ID로 교체
const BANNER_AD_ID = 'ait.v2.live.RANK_BANNER_TODO';

interface ResultPageProps {
  params: JudgeParams;
  onBack: () => void;
}

export function ResultPage({ params, onBack }: ResultPageProps) {
  const { metric, ageGroup, value, inputLabel } = params;
  const meta = METRIC_META[metric];
  const { pAll, pAge } = getRank(metric, ageGroup, value);
  const tier = getTier(pAll);
  const [canShare, setCanShare] = useState(false);
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

  useEffect(() => {
    // 토스 앱 안에서만 공유 버튼 노출 (웹 브라우저에서는 브릿지가 없어 숨김)
    import('@apps-in-toss/web-framework')
      .then(({ getPlatformOS }) => {
        try {
          const os = getPlatformOS();
          setCanShare(os === 'ios' || os === 'android');
        } catch {
          setCanShare(false);
        }
      })
      .catch(() => {});
  }, []);

  const handleShare = () => {
    import('@apps-in-toss/web-framework')
      .then(async ({ share, getTossShareLink }) => {
        const link = await getTossShareLink('intoss://rank').catch(() => '');
        await share({
          message: `나 대한민국 ${meta.label} 상위 ${formatPercentile(pAll)}래요 ${tier.emoji} 너도 확인해봐! ${link}`.trim(),
        });
      })
      .catch(() => {});
  };

  const belowCount = ((100 - pAll) / 100) * POPULATION[metric];
  const top10Line = valueAtPercentile(metric, '전체', 10);
  const top10Diff = value - top10Line;
  const yearPrefix = metric === 'income' ? '연 ' : '';

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
            판정 결과
          </Paragraph>
          <Paragraph typography="t5" color="#3182F6">
            {inputLabel} · {ageGroup}
          </Paragraph>
        </div>
        <div style={{ width: 40 }} />
      </header>

      {/* 배너 광고 */}
      <div ref={bannerRef} style={s.banner} />

      <div style={s.body}>
        {/* 히어로 카드 */}
        <div style={s.heroCard}>
          <span style={s.heroEmoji}>{tier.emoji}</span>
          <Paragraph typography="t4" color="#6B7684">
            {meta.baseLabel}
          </Paragraph>
          <div style={s.heroNumberRow}>
            <span style={s.heroPrefix}>상위</span>
            <span style={s.heroNumber}>{pAll <= TOP_CAP ? TOP_CAP.toFixed(1) : pAll.toFixed(1)}</span>
            <span style={s.heroUnit}>%{pAll <= TOP_CAP && ' 이내'}</span>
          </div>
          <Badge size="large" variant="weak" color="blue">
            {tier.title}
          </Badge>
          <Paragraph typography="t4" color="#4E5968" style={s.oneLiner}>
            {tier.oneLiner}
          </Paragraph>
          <DistributionBar p={pAll} />
          <span style={s.watermark}>나는 상위 몇 %? · 토스 앱인토스</span>
        </div>

        {/* 동년배 비교 */}
        <div style={s.card}>
          <Paragraph typography="t3" fontWeight="bold" style={s.cardTitle}>
            비교해보면
          </Paragraph>
          <CompareRow
            label={`🇰🇷 대한민국 전체`}
            percentile={pAll}
          />
          {pAge !== null ? (
            <CompareRow
              label={`🧑 동년배 ${ageGroup} 중에서`}
              percentile={pAge}
            />
          ) : (
            <Paragraph typography="t5" color="#8B95A1" style={s.ageNudge}>
              연령대를 선택하면 동년배와도 비교해드려요
            </Paragraph>
          )}
        </div>

        {/* 파생 통계 */}
        <div style={s.card}>
          <Paragraph typography="t3" fontWeight="bold" style={s.cardTitle}>
            숫자로 보면
          </Paragraph>
          <StatRow
            label={`나보다 ${meta.label} 아래`}
            value={`${formatCount(belowCount)} ${meta.countUnit}`}
          />
          <StatRow
            label="전체 평균"
            value={`${yearPrefix}${formatManwon(AVERAGE[metric])}`}
          />
          <StatRow
            label="전체 중앙값"
            value={`${yearPrefix}${formatManwon(MEDIAN[metric])}`}
          />
          <StatRow
            label="상위 10% 진입선"
            value={`${yearPrefix}${formatManwon(top10Line)}`}
          />
          <StatRow
            label={top10Diff >= 0 ? '진입선을 이미' : '진입선까지'}
            value={
              top10Diff >= 0
                ? `${formatManwon(top10Diff)} 넘었어요 🎉`
                : `${formatManwon(-top10Diff)} 남았어요`
            }
            highlight
          />
        </div>

        {/* 공유 */}
        {canShare && (
          <Button
            display="full"
            size="xlarge"
            color="primary"
            variant="weak"
            onClick={handleShare}
          >
            결과 공유하기 📤
          </Button>
        )}

        {/* 면책 */}
        <Paragraph typography="t6" color="#8B95A1" style={s.disclaimer}>
          {SOURCE_NOTE}
          {pAge !== null && ' · 연령대별 순위는 공표 통계 기반 근사치예요'}
        </Paragraph>
      </div>

      {/* 하단 CTA */}
      <div style={s.footer}>
        <Button display="full" size="xlarge" color="primary" variant="fill" onClick={onBack}>
          다른 항목도 판정하기
        </Button>
      </div>
    </div>
  );
}

// ── 분포 바 ──
function DistributionBar({ p, compact = false }: { p: number; compact?: boolean }) {
  const position = Math.min(Math.max(100 - p, 3), 97);
  return (
    <div style={{ ...s.distWrap, ...(compact ? { marginTop: 8 } : {}) }}>
      <div style={s.distTrack}>
        <div style={{ ...s.distMarker, left: `${position}%` }}>
          {!compact && <span style={s.distMe}>나</span>}
          <span style={{ ...s.distDot, ...(compact ? { width: 10, height: 10 } : {}) }} />
        </div>
      </div>
      {!compact && (
        <div style={s.distLabels}>
          <span>하위</span>
          <span>상위 50%</span>
          <span>상위 0.1%</span>
        </div>
      )}
    </div>
  );
}

// ── 비교 행 ──
function CompareRow({ label, percentile }: { label: string; percentile: number }) {
  return (
    <div style={s.compareRow}>
      <div style={s.compareHead}>
        <Paragraph typography="t4" color="#4E5968">
          {label}
        </Paragraph>
        <Paragraph typography="t4" fontWeight="bold" color="#3182F6">
          상위 {formatPercentile(percentile)}
        </Paragraph>
      </div>
      <DistributionBar p={percentile} compact />
    </div>
  );
}

// ── 통계 행 ──
function StatRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={s.statRow}>
      <Paragraph typography="t5" color="#6B7684">
        {label}
      </Paragraph>
      <Paragraph typography="t4" fontWeight={highlight ? 'bold' : 'medium'} color={highlight ? '#3182F6' : '#191F28'}>
        {value}
      </Paragraph>
    </div>
  );
}

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
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px 16px 16px',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    padding: '32px 24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'center',
  },
  heroEmoji: {
    fontSize: '44px',
    lineHeight: 1,
  },
  heroNumberRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  heroPrefix: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#191F28',
  },
  heroNumber: {
    fontSize: '52px',
    fontWeight: 800,
    color: '#3182F6',
    letterSpacing: '-1px',
    lineHeight: 1.1,
  },
  heroUnit: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#3182F6',
  },
  oneLiner: {
    lineHeight: 1.5,
  },
  watermark: {
    marginTop: '10px',
    fontSize: '11px',
    color: '#B0B8C1',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardTitle: {
    letterSpacing: '-0.3px',
  },
  compareRow: {
    display: 'flex',
    flexDirection: 'column',
  },
  compareHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ageNudge: {
    textAlign: 'center',
    padding: '4px 0',
  },
  distWrap: {
    width: '100%',
    marginTop: '34px', // "나" 말풍선이 트랙 위로 뜨는 공간
  },
  distTrack: {
    position: 'relative',
    height: '12px',
    borderRadius: '6px',
    background: 'linear-gradient(to right, #E5E8EB, #90C2FF, #3182F6)',
  },
  distMarker: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  distMe: {
    position: 'absolute',
    bottom: '16px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#FFFFFF',
    backgroundColor: '#191F28',
    padding: '2px 7px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
  },
  distDot: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: '4px solid #191F28',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
  },
  distLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '11px',
    color: '#8B95A1',
  },
  statRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disclaimer: {
    textAlign: 'center',
    lineHeight: 1.6,
    padding: '0 8px',
  },
  footer: {
    padding: '16px 16px 32px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #F2F4F6',
  },
};
