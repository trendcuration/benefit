import { useMemo, useState } from 'react';
import { Paragraph } from '@toss/tds-mobile';
import { matchComplexes, ymToYear, REGION_TABS, type Horizon, type MatchedComplex } from '../lib/aptGoal';
import { logClick, logImpression } from '../lib/analytics';

interface AptGoalCardProps {
  /** 순자산 판정 값(만원)이 있으면 '내 자금' 초기값으로 미리 채워준다. */
  initialAssetManwon?: number;
}

const DOT_COLORS = ['#3182F6', '#F59E0B', '#10B981', '#EC4899'];

function formatEok(manwon: number): string {
  return `${(manwon / 10_000).toFixed(1)}억`;
}

export function AptGoalCard({ initialAssetManwon }: AptGoalCardProps) {
  const [horizon, setHorizon] = useState<Horizon>('now');
  const [regionId, setRegionId] = useState(REGION_TABS[0].id);
  const [myFundsEok, setMyFundsEok] = useState(
    initialAssetManwon && initialAssetManwon > 0 ? (initialAssetManwon / 10_000).toFixed(1) : '',
  );
  const [extraLoanEok, setExtraLoanEok] = useState('0');
  const [opened, setOpened] = useState(false);

  const myFundsManwon = Math.round((parseFloat(myFundsEok) || 0) * 10_000);
  const extraLoanManwon = Math.round((parseFloat(extraLoanEok) || 0) * 10_000);
  const budgetManwon = myFundsManwon + extraLoanManwon;

  const matched = useMemo(
    () => matchComplexes(regionId, budgetManwon, horizon, 4),
    [regionId, budgetManwon, horizon],
  );
  const closest = useMemo(() => {
    if (matched.length === 0) return null;
    return matched.reduce((a, b) =>
      Math.abs(a.displayManwon - budgetManwon) <= Math.abs(b.displayManwon - budgetManwon) ? a : b,
    );
  }, [matched, budgetManwon]);

  const handleOpen = () => {
    if (!opened) {
      logImpression('apt_goal_view', {});
      setOpened(true);
    }
  };

  const handleRegionChange = (id: string) => {
    setRegionId(id);
    logClick('apt_goal_region_click', { region: id });
  };

  return (
    <div style={s.card} onFocus={handleOpen} onClick={handleOpen}>
      <Paragraph typography="t3" fontWeight="bold" style={s.title}>
        이 돈이면 어디까지?
      </Paragraph>
      <Paragraph typography="t5" color="#8B95A1" style={s.subtitle}>
        예산 안에 들어오는 아파트를 찾아드려요
      </Paragraph>

      {/* 지금 / 5년 뒤 */}
      <div style={s.horizonRow}>
        {(['now', '5y'] as Horizon[]).map((h) => (
          <button
            key={h}
            style={{ ...s.horizonBtn, ...(horizon === h ? s.horizonBtnActive : {}) }}
            onClick={() => {
              setHorizon(h);
              logClick('apt_goal_horizon_click', { horizon: h });
            }}
          >
            {h === 'now' ? '당장' : '5년 뒤'}
          </button>
        ))}
      </div>

      {/* 자금 입력 */}
      <div style={s.fundsRow}>
        <FundInput label="내 자금" value={myFundsEok} onChange={setMyFundsEok} />
        <FundInput label="추가 대출" value={extraLoanEok} onChange={setExtraLoanEok} />
        <div style={s.budgetTotal}>
          <Paragraph typography="t6" color="#8B95A1">
            총 예산
          </Paragraph>
          <Paragraph typography="t2" fontWeight="bold" color="#3182F6">
            {formatEok(budgetManwon)}
          </Paragraph>
        </div>
      </div>

      {/* 지역 탭 */}
      <div style={s.regionTabs}>
        {REGION_TABS.map((r) => (
          <button
            key={r.id}
            style={{ ...s.regionTab, ...(regionId === r.id ? s.regionTabActive : {}) }}
            onClick={() => handleRegionChange(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {budgetManwon <= 0 ? (
        <Paragraph typography="t5" color="#8B95A1" style={s.emptyState}>
          내 자금을 입력하면 예산에 맞는 아파트를 찾아드려요
        </Paragraph>
      ) : (
        <>
          <AptTrendChart matched={matched} budgetManwon={budgetManwon} />
          <div style={s.list}>
            {matched.map((c, i) => (
              <div
                key={`${c.name}-${c.dong}`}
                style={{
                  ...s.listRow,
                  ...(c === closest ? s.listRowHighlight : {}),
                }}
              >
                <span style={{ ...s.dot, backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }} />
                <div style={s.listText}>
                  <Paragraph typography="t4" fontWeight="bold" color="#191F28">
                    {c.name}
                  </Paragraph>
                  <Paragraph typography="t6" color="#8B95A1">
                    {c.sggName} {c.dong} · {c.pyeong}평
                  </Paragraph>
                </div>
                <Paragraph typography="t4" fontWeight="bold" color="#191F28">
                  {formatEok(c.displayManwon)}
                </Paragraph>
              </div>
            ))}
          </div>
          <Paragraph typography="t6" color="#B0B8C1" style={s.disclaimer}>
            국토교통부 아파트매매 실거래가 기준 · 5년 뒤 가격은 단지별 최근 추세를 단순 연장한
            추정치예요
          </Paragraph>
        </>
      )}
    </div>
  );
}

// ── 자금 입력 필드 ──
function FundInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={s.fundInput}>
      <Paragraph typography="t6" color="#8B95A1">
        {label}
      </Paragraph>
      <div style={s.fundInputRow}>
        <input
          style={s.fundInputField}
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9.]/g, '');
            onChange(v);
          }}
          aria-label={`${label} (억원)`}
        />
        <span style={s.fundInputSuffix}>억</span>
      </div>
    </div>
  );
}

// ── 시세 추이 차트 (경량 커스텀 SVG, 별도 라이브러리 없이) ──
function AptTrendChart({ matched, budgetManwon }: { matched: MatchedComplex[]; budgetManwon: number }) {
  const W = 300;
  const H = 130;
  const PAD_TOP = 14;
  const PAD_BOTTOM = 18;

  const allPoints = matched.flatMap((c) => c.series);
  if (allPoints.length === 0) return null;

  const years = allPoints.map((p) => ymToYear(p.ym));
  const values = [...allPoints.map((p) => p.medianManwon), budgetManwon];
  const xMin = Math.min(...years);
  const xMax = Math.max(...years);
  const yMin = Math.min(...values) * 0.92;
  const yMax = Math.max(...values) * 1.08;

  const toX = (ym: string) => ((ymToYear(ym) - xMin) / (xMax - xMin || 1)) * W;
  const toY = (v: number) => H - PAD_BOTTOM - ((v - yMin) / (yMax - yMin || 1)) * (H - PAD_TOP - PAD_BOTTOM);

  const budgetY = toY(budgetManwon);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={s.chartSvg} preserveAspectRatio="none">
      {/* 예산선 */}
      <line x1={0} y1={budgetY} x2={W} y2={budgetY} stroke="#191F28" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={W} y={Math.max(budgetY - 5, 10)} textAnchor="end" fontSize="9" fill="#191F28" fontWeight={700}>
        내 예산 {formatEok(budgetManwon)}
      </text>

      {matched.map((c, i) => {
        const color = DOT_COLORS[i % DOT_COLORS.length];
        const isProjected = c.projectedFromIndex < c.series.length - 1;
        const solidPoints = c.series.slice(0, c.projectedFromIndex + 1);
        const solid = solidPoints.map((p) => `${toX(p.ym)},${toY(p.medianManwon)}`).join(' ');
        const last = c.series[c.series.length - 1];
        const beforeLast = c.series[c.projectedFromIndex];

        return (
          <g key={`${c.name}-${c.dong}`}>
            <polyline points={solid} fill="none" stroke={color} strokeWidth={i === 0 ? 2.5 : 1.5} opacity={i === 0 ? 1 : 0.55} />
            {isProjected && (
              <line
                x1={toX(beforeLast.ym)}
                y1={toY(beforeLast.medianManwon)}
                x2={toX(last.ym)}
                y2={toY(last.medianManwon)}
                stroke={color}
                strokeWidth={i === 0 ? 2.5 : 1.5}
                strokeDasharray="3 3"
                opacity={i === 0 ? 1 : 0.55}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── 스타일 ──
const s: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: { letterSpacing: '-0.3px' },
  subtitle: { marginBottom: '10px' },
  horizonRow: { display: 'flex', gap: '6px', marginBottom: '12px' },
  horizonBtn: {
    border: '1px solid #E5E8EB',
    background: '#FFFFFF',
    borderRadius: '999px',
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#8B95A1',
    cursor: 'pointer',
  },
  horizonBtnActive: {
    background: '#191F28',
    borderColor: '#191F28',
    color: '#FFFFFF',
  },
  fundsRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#F8F9FA',
    borderRadius: '12px',
    marginBottom: '12px',
  },
  fundInput: { display: 'flex', flexDirection: 'column', gap: '4px' },
  fundInputRow: { display: 'flex', alignItems: 'center', gap: '4px' },
  fundInputField: {
    width: '56px',
    border: 'none',
    borderBottom: '1px solid #D1D6DB',
    background: 'transparent',
    fontSize: '15px',
    fontWeight: 700,
    color: '#191F28',
    padding: '2px 0',
    outline: 'none',
  },
  fundInputSuffix: { fontSize: '13px', color: '#8B95A1' },
  budgetTotal: { marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' },
  regionTabs: { display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '4px' },
  regionTab: {
    flexShrink: 0,
    border: '1px solid #E5E8EB',
    background: '#FFFFFF',
    borderRadius: '999px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#4E5968',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  regionTabActive: {
    background: '#E8F3FF',
    borderColor: '#3182F6',
    color: '#3182F6',
  },
  emptyState: { textAlign: 'center', padding: '24px 0' },
  chartSvg: { width: '100%', height: '130px', marginTop: '8px' },
  list: { display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '8px' },
  listRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 8px',
    borderRadius: '10px',
  },
  listRowHighlight: { backgroundColor: '#F2F7FF' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  listText: { flex: 1, display: 'flex', flexDirection: 'column', gap: '1px' },
  disclaimer: { textAlign: 'center', lineHeight: 1.5, padding: '8px 4px 0' },
};
