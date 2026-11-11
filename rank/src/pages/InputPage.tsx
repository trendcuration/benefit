import { useEffect, useState } from 'react';
import { Button } from '@toss/tds-mobile';
import { formatManwon } from '../data/rank';
import { logClick, logImpression } from '../lib/analytics';
import { chip, color, font, footer } from '../lib/ui';
import type { Metric } from '../data/percentiles';
import type { JudgeParams } from '../App';

export type InputMode = 'monthly' | 'annual' | 'asset';

interface InputPageProps {
  initialMode: InputMode;
  onSubmit: (params: JudgeParams) => void;
}

const MODES: { id: InputMode; label: string; hint: string }[] = [
  { id: 'monthly', label: '월급', hint: '세금 떼기 전 금액을 만원 단위로 넣어요' },
  { id: 'annual', label: '연봉', hint: '세금 떼기 전 금액을 만원 단위로 넣어요' },
  { id: 'asset', label: '순자산', hint: '우리 집 재산에서 빚을 뺀 금액이에요' },
];

const CHIPS: Record<InputMode, { label: string; delta: number }[]> = {
  monthly: [
    { label: '50만', delta: 50 },
    { label: '100만', delta: 100 },
    { label: '500만', delta: 500 },
  ],
  annual: [
    { label: '500만', delta: 500 },
    { label: '1,000만', delta: 1_000 },
    { label: '5,000만', delta: 5_000 },
  ],
  asset: [
    { label: '1,000만', delta: 1_000 },
    { label: '1억', delta: 10_000 },
    { label: '10억', delta: 100_000 },
  ],
};

const MAX_AMOUNT = 999_999_999;

export function InputPage({ initialMode, onSubmit }: InputPageProps) {
  const [mode, setMode] = useState<InputMode>(initialMode);
  const [amountStr, setAmountStr] = useState('');

  const amount = amountStr ? parseInt(amountStr, 10) : 0;
  const canSubmit = amount > 0;
  const current = MODES.find((m) => m.id === mode) ?? MODES[0];
  const metric: Metric = mode === 'asset' ? 'asset' : 'income';

  useEffect(() => {
    // 입력 화면을 본 사람 수. submit_click과 비교해 입력 단계 이탈을 본다.
    logImpression('input_view', { mode: initialMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAmountChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '').slice(0, 9);
    setAmountStr(digits.replace(/^0+(?=\d)/, ''));
  };

  const handleModeChange = (next: InputMode) => {
    if (next === mode) return;
    logClick('mode_click', { mode: next });
    if (next === 'asset' || mode === 'asset') {
      // 소득 ↔ 순자산은 전혀 다른 금액이라 비운다.
      setAmountStr('');
    } else if (amount > 0) {
      // 월급 ↔ 연봉은 금액도 함께 환산한다.
      const converted = next === 'annual' ? amount * 12 : Math.round(amount / 12);
      setAmountStr(String(Math.min(converted, MAX_AMOUNT)));
    }
    setMode(next);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      metric,
      mode,
      value: mode === 'monthly' ? amount * 12 : amount,
      inputLabel: `${current.label} ${formatManwon(amount)}`,
    });
  };

  const display = amount > 0 ? amount.toLocaleString('ko-KR') : '';
  // 자릿수가 늘면 글씨를 줄여 한 줄에 담는다.
  const amountSize = display.length > 9 ? 30 : display.length > 7 ? 36 : 44;
  const amountFont: React.CSSProperties = {
    fontSize: `${amountSize}px`,
    fontWeight: 700,
    letterSpacing: '-1px',
    lineHeight: 1.2,
    fontFamily: 'inherit',
  };

  const helper =
    amount <= 0
      ? current.hint
      : mode === 'monthly'
        ? `연봉으로 ${formatManwon(amount * 12)} · 세전`
        : mode === 'annual'
          ? `한 달에 약 ${formatManwon(Math.round(amount / 12))} · 세전`
          : formatManwon(amount);

  return (
    <div style={s.container}>
      <main style={s.main}>
        {/* 무엇을 볼지: 월급 · 연봉 · 순자산 */}
        <div style={s.tabs} role="tablist">
          {MODES.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={active}
                style={{ ...s.tab, ...(active ? s.tabActive : {}) }}
                onClick={() => handleModeChange(m.id)}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <h1 style={s.headline}>
          {current.label}이 얼마인가요?
        </h1>
        <p style={s.lead}>대한민국에서 상위 몇 %인지 알려드려요</p>

        {/* 금액 */}
        <label style={{ ...s.amountRow, borderBottomColor: canSubmit ? color.blue : color.line }}>
          <span style={s.amountGrid}>
            <span aria-hidden style={{ ...amountFont, ...s.amountMirror }}>
              {display || '0'}
            </span>
            <input
              style={{ ...amountFont, ...s.amountInput }}
              size={1}
              inputMode="numeric"
              placeholder="0"
              value={display}
              onChange={(e) => handleAmountChange(e.target.value)}
              aria-label="금액 입력 (만원)"
            />
          </span>
          <span style={{ ...amountFont, color: canSubmit ? color.text : '#B0B8C1' }}>만원</span>
        </label>
        <p style={{ ...s.helper, color: canSubmit ? color.blue : color.textWeak }}>{helper}</p>

        <div style={s.chipRow}>
          {CHIPS[mode].map((c) => (
            <button
              key={c.label}
              style={chip()}
              onClick={() => setAmountStr(String(Math.min(amount + c.delta, MAX_AMOUNT)))}
            >
              +{c.label}
            </button>
          ))}
          {canSubmit && (
            <button style={s.clearBtn} onClick={() => setAmountStr('')}>
              지우기
            </button>
          )}
        </div>
      </main>

      <div style={footer}>
        {/* 광고가 나오기 전에 미리 알 수 있도록 버튼을 누르기 '전'에 보이는 안내 */}
        <p style={s.adNotice}>버튼을 누르면 결과를 보기 전에 잠깐 광고가 나와요</p>
        <Button
          display="block"
          size="xlarge"
          color="primary"
          variant="fill"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          내 순위 확인하기
        </Button>
        <p style={s.source}>국세청 · 통계청 가계금융복지조사 기반 추정</p>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: color.surface,
  },
  main: {
    flex: 1,
    padding: '20px 20px 24px',
  },
  tabs: {
    display: 'inline-flex',
    gap: '4px',
    padding: '4px',
    borderRadius: '999px',
    backgroundColor: color.chip,
  },
  tab: {
    height: '40px',
    padding: '0 18px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: 'transparent',
    color: color.textWeak,
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  tabActive: {
    backgroundColor: color.surface,
    color: color.text,
    boxShadow: '0 1px 4px rgba(0, 23, 51, 0.12)',
  },
  headline: {
    ...font.headline,
    marginTop: '32px',
  },
  lead: {
    ...font.body,
    marginTop: '8px',
    wordBreak: 'keep-all',
  },
  amountRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    marginTop: '40px',
    paddingBottom: '10px',
    borderBottom: '2px solid',
    cursor: 'text',
  },
  amountGrid: {
    display: 'inline-grid',
    minWidth: '28px',
    maxWidth: '100%',
  },
  amountMirror: {
    gridArea: '1 / 1',
    visibility: 'hidden',
    whiteSpace: 'pre',
  },
  amountInput: {
    gridArea: '1 / 1',
    width: '100%',
    minWidth: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: color.text,
    caretColor: color.blue,
  },
  helper: {
    ...font.sub,
    marginTop: '10px',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px',
  },
  clearBtn: {
    height: '40px',
    padding: '0 8px',
    border: 'none',
    background: 'transparent',
    color: color.textWeak,
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  adNotice: {
    ...font.caption,
    textAlign: 'center',
  },
  source: {
    ...font.caption,
    textAlign: 'center',
    color: '#B0B8C1',
  },
};
