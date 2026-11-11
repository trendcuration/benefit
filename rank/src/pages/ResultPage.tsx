import { useEffect, useState } from 'react';
import { Button } from '@toss/tds-mobile';
import {
  AGE_GROUPS,
  AVERAGE,
  MEDIAN,
  METRIC_META,
  POPULATION,
  REGIONS,
  SOURCE_NOTE,
  type AgeGroup,
  type Region,
} from '../data/percentiles';
import {
  formatCount,
  formatManwon,
  formatPercentile,
  formatPercentileParts,
  getRank,
  valueAtPercentile,
} from '../data/rank';
import { getTier, type TierTheme } from '../data/tiers';
import { logClick, logImpression } from '../lib/analytics';
import { markReviewAsked, recordJudge, reviewAlreadyAsked, todayString } from '../lib/history';
import { loadAgeGroup, loadRegion, saveAgeGroup, saveRegion } from '../lib/prefs';
import { AptGoalCard } from '../components/AptGoalCard';
import { requestTossReview } from '../lib/review';
import { card, chip, color, font, footer } from '../lib/ui';
import type { JudgeParams } from '../App';
import type { InputMode } from './InputPage';

/** 결과를 이만큼 읽은 뒤에만 토스 별점 화면을 요청한다(결과를 보자마자 가리지 않게). */
const REVIEW_DELAY_MS = 8000;

const REGION_REWARD_AD_ID = 'ait.v2.live.75f767ef7002430e';

/** 다음 목표로 보여줄 구간(상위 %). 지금 위치보다 한 칸 위의 진입선을 안내한다. */
const GOAL_STEPS = [50, 30, 20, 10, 5, 1, 0.1];

function formatShortDate(value: string): string {
  const [, m, d] = value.split('-').map(Number);
  return `${m}월 ${d}일`;
}

/** 리워드광고 시청 완료(userEarnedReward) 시에만 true. dismissed/failedToShow에서 로딩 상태를 푼다. */
function showRewardedAd(onEarned: () => void, onSettle: () => void) {
  import('@apps-in-toss/web-framework')
    .then(({ loadFullScreenAd, showFullScreenAd }) => {
      if (!loadFullScreenAd.isSupported() || !showFullScreenAd.isSupported()) {
        onSettle();
        return;
      }
      loadFullScreenAd({
        options: { adGroupId: REGION_REWARD_AD_ID },
        onEvent: (event) => {
          if (event.type !== 'loaded') return;
          showFullScreenAd({
            options: { adGroupId: REGION_REWARD_AD_ID },
            onEvent: (e) => {
              if (e.type === 'userEarnedReward') onEarned();
              if (e.type === 'dismissed' || e.type === 'failedToShow') onSettle();
            },
            onError: () => onSettle(),
          });
        },
        onError: () => onSettle(),
      });
    })
    .catch(() => onSettle());
}

/** "100명 줄 세우면 앞에서 13번째"에 쓰는 줄 길이와 순번. 상위 1% 안쪽은 줄을 늘려 순번이 1로 뭉치지 않게 한다. */
function lineUp(p: number): { size: string; nth: number } {
  if (p >= 1) return { size: '100', nth: Math.min(100, Math.ceil(p)) };
  if (p >= 0.01) return { size: '1만 ', nth: Math.max(1, Math.ceil(p * 100)) };
  return { size: '10만 ', nth: Math.max(1, Math.ceil(p * 1000)) };
}

/** 큰 숫자가 99.9%에서 내 순위까지 빠르게 내려오는 연출 */
function useCountTo(target: number, durationMs = 900): number {
  const [value, setValue] = useState(() => {
    const reduce =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return reduce ? target : 99.9;
  });

  useEffect(() => {
    const from = 99.9;
    if (value === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 4;
      setValue(t >= 1 ? target : from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}

interface ResultPageProps {
  params: JudgeParams;
  /** 입력 화면으로 돌아간다. 항목을 넘기면 그 항목으로 연다 */
  onBack: (nextMode?: InputMode) => void;
}

export function ResultPage({ params, onBack }: ResultPageProps) {
  const { metric, value, inputLabel, mode } = params;
  const meta = METRIC_META[metric];
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(loadAgeGroup);
  const [region, setRegion] = useState<Region>(loadRegion);
  const { pAll, pAge, pRegion } = getRank(metric, ageGroup, region, value);
  const tier = getTier(pAll);
  const [canShare, setCanShare] = useState(import.meta.env.DEV);
  const [regionUnlocked, setRegionUnlocked] = useState(false);
  const [unlockingRegion, setUnlockingRegion] = useState(false);
  // 결과 화면이 처음 그려질 때 한 번만 기록·비교한다(리렌더마다 다시 저장하지 않게).
  const [prevJudge] = useState(() => recordJudge(metric, { value, pAll, date: todayString() }));
  // 상위 퍼센트는 작을수록 좋으므로, 지난번보다 작아졌으면 "올랐다"
  const rankDelta = prevJudge ? prevJudge.pAll - pAll : 0;
  const shownP = useCountTo(pAll);

  useEffect(() => {
    if (reviewAlreadyAsked()) return;
    const timer = setTimeout(() => {
      markReviewAsked();
      requestTossReview();
    }, REVIEW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 토스 앱 안에서만 공유 버튼 노출 (웹 브라우저에서는 브릿지가 없어 숨김)
    import('@apps-in-toss/web-framework')
      .then(({ getPlatformOS }) => {
        try {
          const os = getPlatformOS();
          if (os === 'ios' || os === 'android') setCanShare(true);
        } catch {
          // 브라우저에서는 그대로 둔다.
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // 전환지표용: 판정 결과까지 실제로 확인했는지가 이 앱의 서비스 가치 완료 시점
    logImpression('result_view', { metric, mode, age_group: ageGroup, region });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAgeSelect = (next: AgeGroup) => {
    const picked = next === ageGroup ? '전체' : next;
    logClick('age_select_click', { age_group: picked, metric });
    setAgeGroup(picked);
    saveAgeGroup(picked);
  };

  const handleRegionSelect = (next: Region) => {
    const picked = next === region ? '전국' : next;
    logClick('region_select_click', { region: picked, metric });
    setRegion(picked);
    saveRegion(picked);
  };

  const handleUnlockRegion = () => {
    logClick('region_unlock_click', { region });
    setUnlockingRegion(true);
    showRewardedAd(
      () => setRegionUnlocked(true),
      () => setUnlockingRegion(false),
    );
  };

  const line = lineUp(pAll);
  const unit = meta.countUnit;

  const handleShare = () => {
    logClick('share_click', { metric });
    import('@apps-in-toss/web-framework')
      .then(async ({ share, getTossShareLink }) => {
        const link = await getTossShareLink('intoss://income-rank').catch(() => '');
        await share({
          message:
            `나 대한민국 ${meta.label} 상위 ${formatPercentile(pAll)}래 ${tier.emoji}\n` +
            `${line.size}${unit} 줄 세우면 앞에서 ${line.nth.toLocaleString('ko-KR')}번째!\n` +
            `너는 상위 몇 %야? ${link}`.trim(),
        });
      })
      .catch(() => {});
  };

  const belowCount = ((100 - pAll) / 100) * POPULATION[metric];
  const aboveCount = (pAll / 100) * POPULATION[metric];
  const yearPrefix = metric === 'income' ? '연 ' : '';
  const heroParts = formatPercentileParts(shownP);
  const isElite = pAll <= 1;

  // 다음 목표: 지금보다 한 칸 위 구간의 진입선까지 얼마가 남았는지
  const goal = GOAL_STEPS.map((step) => ({ step, gap: valueAtPercentile(metric, '전체', step) - value })).find(
    ({ step, gap }) => step < pAll && gap > 0,
  );

  const otherMode: InputMode = metric === 'income' ? 'asset' : 'monthly';
  const otherLabel = metric === 'income' ? '순자산도 확인하기' : '월급도 확인하기';

  return (
    <div style={s.container}>
      <div style={s.body}>
        {/* 무엇으로 판정했는지 (네이티브 내비게이션 바와 겹치지 않게 자체 헤더·뒤로가기는 두지 않는다) */}
        <div style={s.summaryLine}>
          <span style={s.summaryText}>{inputLabel} 기준</span>
          <button style={s.editBtn} onClick={() => onBack(mode)}>
            금액 바꾸기
          </button>
        </div>

        <RankCard
          theme={tier.theme}
          baseLabel={meta.baseLabel}
          number={heroParts.number}
          suffix={heroParts.suffix}
          emoji={tier.emoji}
          title={tier.title}
          oneLiner={tier.oneLiner}
          p={pAll}
          lineText={`${line.size}${unit} 줄 세우면 앞에서 ${line.nth.toLocaleString('ko-KR')}번째`}
        />

        {canShare && (
          <button style={s.shareBtn} onClick={handleShare}>
            <ShareIcon />
            친구에게 결과 보내기
          </button>
        )}

        {/* 다시 방문: 지난번 판정과 비교 (같은 지표, 다른 날짜일 때만) */}
        {prevJudge && (
          <div style={card}>
            <h2 style={font.title}>지난번과 비교하면</h2>
            <div>
              <p style={font.body}>{`${formatShortDate(prevJudge.date)}엔 상위 ${formatPercentile(prevJudge.pAll)}였어요`}</p>
              <p style={{ ...font.body, fontWeight: 700, color: rankDelta > 0.05 ? color.blue : color.text }}>
                {rankDelta > 0.05
                  ? `${rankDelta.toFixed(1)}%p 올라 상위 ${formatPercentile(pAll)}가 됐어요 🎉`
                  : rankDelta < -0.05
                    ? `${Math.abs(rankDelta).toFixed(1)}%p 내려 상위 ${formatPercentile(pAll)}예요`
                    : `지난번과 거의 같은 상위 ${formatPercentile(pAll)}예요`}
              </p>
            </div>
          </div>
        )}

        {/* 또래·지역과 비교: 결과를 본 뒤 여기서 바로 골라 본다 */}
        <div style={card}>
          <h2 style={font.title}>또래·우리 동네에서는?</h2>

          <div style={s.pickBlock}>
            <p style={s.pickLabel}>나이대를 골라 보세요</p>
            <div style={s.ageRow}>
              {AGE_GROUPS.filter((a) => a !== '전체').map((age) => (
                <button
                  key={age}
                  style={{ ...chip(ageGroup === age), padding: 0, flex: 1 }}
                  onClick={() => handleAgeSelect(age)}
                >
                  {age}
                </button>
              ))}
            </div>
            {pAge !== null && <CompareRow label={`${ageGroup} 중에서`} percentile={pAge} />}
          </div>

          <div style={s.divider} />

          <div style={s.pickBlock}>
            <p style={s.pickLabel}>사는 곳을 골라 보세요</p>
            <div style={s.regionRow}>
              {REGIONS.filter((r) => r !== '전국').map((r) => (
                <button key={r} style={chip(region === r)} onClick={() => handleRegionSelect(r)}>
                  {r}
                </button>
              ))}
            </div>
            {region !== '전국' &&
              (regionUnlocked && pRegion !== null ? (
                <CompareRow label={`${region}에서`} percentile={pRegion} />
              ) : (
                <div style={s.lockedBox}>
                  <p style={{ ...font.sub, color: color.textSub }}>
                    🔒 {region} 순위는 광고를 본 뒤 열려요
                  </p>
                  <Button
                    display="block"
                    size="large"
                    color="primary"
                    variant="weak"
                    disabled={unlockingRegion}
                    onClick={handleUnlockRegion}
                  >
                    {unlockingRegion ? '광고 불러오는 중…' : '광고 보고 지역 순위 확인하기'}
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* 숫자로 보면 */}
        <div style={card}>
          <h2 style={font.title}>숫자로 보면</h2>
          {goal && (
            <div style={s.goalBox}>
              <p style={s.goalLabel}>상위 {goal.step}%까지</p>
              <p style={s.goalValue}>
                {yearPrefix}
                {formatManwon(Math.ceil(goal.gap))} 더
              </p>
            </div>
          )}
          <div style={s.statGrid}>
            {isElite ? (
              <StatTile label="나보다 위" value={`${formatCount(aboveCount)}${unit}`} />
            ) : (
              <StatTile label={`내 아래 ${unit === '명' ? '사람' : '가구'}`} value={`${formatCount(belowCount)}${unit}`} />
            )}
            <StatTile label="상위 10% 기준" value={`${yearPrefix}${formatManwon(valueAtPercentile(metric, '전체', 10))}`} />
            <StatTile label="전체 평균" value={`${yearPrefix}${formatManwon(AVERAGE[metric])}`} />
            <StatTile label="딱 중간" value={`${yearPrefix}${formatManwon(MEDIAN[metric])}`} />
          </div>
        </div>

        {/* 이 돈이면 어디까지 (내 집 마련 목표) */}
        <AptGoalCard
          initialAssetManwon={metric === 'asset' ? value : undefined}
          initialIncomeManwon={metric === 'income' ? value : undefined}
        />

        {/* 면책 */}
        <p style={s.disclaimer}>
          {SOURCE_NOTE}
          {pAge !== null && ' · 연령대별 순위는 공표 통계 기반 근사치예요'}
          {pRegion !== null && ' · 지역별 순위는 방향성을 반영한 추정치예요'}
          {pAll < 0.1 && ' · 0.1% 미만 구간은 파레토 분포 추정치예요'}
        </p>
      </div>

      {/* 하단 버튼: 다른 항목 판정으로 이어 준다(광고 안내는 입력 화면의 버튼 위에 있다) */}
      <div style={footer}>
        <Button
          display="block"
          size="xlarge"
          color="primary"
          variant="fill"
          onClick={() => {
            logClick('other_metric_click', { from: metric });
            onBack(otherMode);
          }}
        >
          {otherLabel}
        </Button>
      </div>
    </div>
  );
}

// ── 결과 카드: 캡처해서 보내기 좋게 한 장에 순위·등급·줄 세우기 그림을 담는다 ──
interface RankCardProps {
  theme: TierTheme;
  baseLabel: string;
  number: string;
  suffix: string;
  emoji: string;
  title: string;
  oneLiner: string;
  /** 실제 순위(애니메이션 값이 아닌 최종값) */
  p: number;
  lineText: string;
}

function RankCard({ theme, baseLabel, number, suffix, emoji, title, oneLiner, p, lineText }: RankCardProps) {
  return (
    <div style={{ ...s.rankCard, background: `linear-gradient(155deg, ${theme.from} 0%, ${theme.to} 100%)` }}>
      <div style={{ ...s.glow, background: `radial-gradient(circle, ${theme.accent}55 0%, transparent 68%)` }} />
      <div style={s.rankInner}>
        <p style={s.rankBase}>{baseLabel}</p>
        <div style={s.rankNumberRow}>
          <span style={s.rankPrefix}>상위</span>
          <span style={{ ...s.rankNumber, fontSize: number.length > 4 ? '64px' : '80px' }}>{number}</span>
          <span style={s.rankUnit}>%</span>
          {suffix.includes('이내') && <span style={s.rankWithin}>이내</span>}
        </div>
        <span style={{ ...s.tierPill, color: theme.accent }}>
          {emoji} {title}
        </span>
        <p style={s.rankOneLiner}>{oneLiner}</p>

        <div style={s.lineBox}>
          <PeopleDots p={p} accent={theme.accent} />
          <p style={s.lineText}>{lineText}</p>
        </div>

        <div style={s.rankFoot}>
          <span>내소득은 상위 몇프로</span>
          <span>토스에서 확인</span>
        </div>
      </div>
    </div>
  );
}

/** 100명을 순위대로 세운 점 그림. 내 앞은 흐리게, 나는 흰 점, 내 뒤는 강조색으로 칠한다. */
function PeopleDots({ p, accent }: { p: number; accent: string }) {
  const me = Math.min(100, Math.max(1, Math.ceil(p))) - 1;
  return (
    <div style={s.dots} aria-hidden>
      {Array.from({ length: 100 }, (_, i) => {
        const isMe = i === me;
        return (
          <span
            key={i}
            style={{
              ...s.dot,
              backgroundColor: isMe ? '#FFFFFF' : i < me ? 'rgba(255,255,255,0.2)' : accent,
              ...(isMe ? { boxShadow: '0 0 0 3px rgba(255,255,255,0.35)', transform: 'scale(1.25)' } : {}),
            }}
          />
        );
      })}
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15V4m0 0L8 8m4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── 비교 행 ──
function CompareRow({ label, percentile }: { label: string; percentile: number }) {
  const position = Math.min(Math.max(100 - percentile, 2), 100);
  return (
    <div style={s.compareRow}>
      <div style={s.compareHead}>
        <span style={{ ...font.body, color: color.textSub }}>{label}</span>
        <span style={s.compareValue}>상위 {formatPercentile(percentile)}</span>
      </div>
      <div style={s.barTrack}>
        <div style={{ ...s.barFill, width: `${position}%` }} />
      </div>
    </div>
  );
}

// ── 숫자 타일 ──
function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div style={s.statTile}>
      <span style={font.caption}>{label}</span>
      <span style={s.statValue}>{value}</span>
    </div>
  );
}

// ── 스타일 ──
const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: color.bg,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px 16px 24px',
  },
  summaryLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px',
    minHeight: '36px',
  },
  summaryText: {
    ...font.sub,
    fontWeight: 600,
    color: color.textSub,
  },
  editBtn: {
    height: '36px',
    padding: '0 4px',
    border: 'none',
    background: 'transparent',
    color: color.blue,
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  rankCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '28px',
    color: '#FFFFFF',
    boxShadow: '0 12px 28px rgba(0, 27, 55, 0.18)',
  },
  glow: {
    position: 'absolute',
    top: '-90px',
    right: '-90px',
    width: '280px',
    height: '280px',
    pointerEvents: 'none',
  },
  rankInner: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '28px 24px 20px',
  },
  rankBase: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.72)',
  },
  rankNumberRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginTop: '6px',
    whiteSpace: 'nowrap',
  },
  rankPrefix: {
    fontSize: '24px',
    fontWeight: 700,
  },
  rankNumber: {
    fontWeight: 800,
    letterSpacing: '-3px',
    lineHeight: 1.05,
    fontVariantNumeric: 'tabular-nums',
  },
  rankUnit: {
    fontSize: '32px',
    fontWeight: 800,
  },
  rankWithin: {
    fontSize: '20px',
    fontWeight: 700,
  },
  tierPill: {
    marginTop: '14px',
    padding: '7px 14px',
    borderRadius: '999px',
    backgroundColor: 'rgba(255,255,255,0.14)',
    fontSize: '15px',
    fontWeight: 700,
  },
  rankOneLiner: {
    marginTop: '12px',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.45,
    wordBreak: 'keep-all',
  },
  lineBox: {
    alignSelf: 'stretch',
    marginTop: '24px',
    padding: '16px',
    borderRadius: '18px',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  dots: {
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gap: '5px',
  },
  dot: {
    aspectRatio: '1 / 1',
    borderRadius: '50%',
  },
  lineText: {
    marginTop: '14px',
    fontSize: '16px',
    fontWeight: 700,
    textAlign: 'center',
  },
  rankFoot: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '18px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.6)',
  },
  shareBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '56px',
    border: 'none',
    borderRadius: '18px',
    backgroundColor: color.text,
    color: '#FFFFFF',
    fontSize: '17px',
    fontWeight: 700,
    fontFamily: 'inherit',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  pickBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  pickLabel: {
    ...font.sub,
    color: color.textSub,
  },
  ageRow: {
    display: 'flex',
    gap: '6px',
  },
  regionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  divider: {
    height: '1px',
    backgroundColor: color.bg,
  },
  lockedBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
  },
  compareRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: color.blueWeak,
  },
  compareHead: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '8px',
  },
  compareValue: {
    fontSize: '22px',
    fontWeight: 800,
    color: color.blue,
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  },
  barTrack: {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    backgroundColor: color.blue,
  },
  goalBox: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '18px 16px',
    borderRadius: '16px',
    backgroundColor: color.blueWeak,
  },
  goalLabel: {
    fontSize: '17px',
    fontWeight: 600,
    color: color.textSub,
  },
  goalValue: {
    fontSize: '22px',
    fontWeight: 800,
    color: color.blue,
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  statTile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '14px 16px',
    borderRadius: '16px',
    backgroundColor: '#F9FAFB',
    minWidth: 0,
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: color.text,
    letterSpacing: '-0.3px',
    wordBreak: 'keep-all',
  },
  disclaimer: {
    ...font.caption,
    textAlign: 'center',
    padding: '4px 8px 0',
    wordBreak: 'keep-all',
  },
};
