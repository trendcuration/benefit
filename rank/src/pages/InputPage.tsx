import { useState } from 'react';
import { Button, SegmentedControl, Paragraph } from '@toss/tds-mobile';
import { AGE_GROUPS, METRIC_META, type AgeGroup, type Metric } from '../data/percentiles';
import { formatManwon } from '../data/rank';
import type { JudgeParams } from '../App';

type IncomePeriod = 'monthly' | 'annual';

interface InputPageProps {
  onSubmit: (params: JudgeParams) => void;
}

export function InputPage({ onSubmit }: InputPageProps) {
  const [metric, setMetric] = useState<Metric>('income');
  const [period, setPeriod] = useState<IncomePeriod>('monthly');
  const [amountStr, setAmountStr] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('전체');

  const amount = amountStr ? parseInt(amountStr, 10) : 0;
  const canSubmit = amount > 0;

  const handleAmountChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '').slice(0, 9);
    setAmountStr(digits.replace(/^0+(?=\d)/, ''));
  };

  const handlePeriodChange = (next: IncomePeriod) => {
    if (next === period) return;
    // 월급 ↔ 연봉 전환 시 금액도 함께 환산
    if (amount > 0) {
      const converted = next === 'annual' ? amount * 12 : Math.round(amount / 12);
      setAmountStr(String(Math.min(converted, 999_999_999)));
    }
    setPeriod(next);
  };

  const handleMetricChange = (next: Metric) => {
    if (next === metric) return;
    setMetric(next);
    setAmountStr('');
  };

  const addAmount = (delta: number) => {
    setAmountStr(String(Math.min(amount + delta, 999_999_999)));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const isMonthly = metric === 'income' && period === 'monthly';
    const value = isMonthly ? amount * 12 : amount;
    const prefix = metric === 'asset' ? '순자산' : period === 'monthly' ? '월급' : '연봉';
    onSubmit({
      metric,
      ageGroup,
      value,
      inputLabel: `${prefix} ${formatManwon(amount)}`,
    });
  };

  const chips = CHIPS[metric === 'income' ? period : 'asset'];

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <div style={s.iconWrap}>📊</div>
        <Paragraph as="h1" typography="t1" style={s.title}>
          나는 상위 몇 %?
        </Paragraph>
        <Paragraph typography="t4" color="#6B7684" style={s.subtitle}>
          {'월급이나 순자산을 입력하면\n대한민국에서 내 위치를 알려드려요'}
        </Paragraph>
      </header>

      <div style={s.body}>
        {/* 판정 항목 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              무엇을 판정할까요?
            </Paragraph>
          </div>
          <SegmentedControl
            value={metric}
            onChange={(v) => handleMetricChange(v as Metric)}
            size="large"
          >
            {(['income', 'asset'] as Metric[]).map((m) => (
              <SegmentedControl.Item key={m} value={m}>
                {METRIC_META[m].emoji} {METRIC_META[m].label}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl>
          <Paragraph typography="t5" color="#8B95A1" style={s.metricHelp}>
            {metric === 'income'
              ? '세전 금액 기준이에요'
              : '순자산 = 우리 집 자산 − 부채 (가구 기준)'}
          </Paragraph>
        </section>

        {/* 금액 입력 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              금액
            </Paragraph>
            <span style={s.requiredBadge}>필수</span>
          </div>

          {metric === 'income' && (
            <div style={s.periodRow}>
              {(['monthly', 'annual'] as IncomePeriod[]).map((key) => (
                <Button
                  key={key}
                  size="small"
                  color="primary"
                  variant={period === key ? 'fill' : 'weak'}
                  onClick={() => handlePeriodChange(key)}
                >
                  {key === 'monthly' ? '월급' : '연봉'}
                </Button>
              ))}
            </div>
          )}

          <div style={s.inputRow}>
            <input
              style={s.input}
              inputMode="numeric"
              placeholder="0"
              value={amount > 0 ? amount.toLocaleString('ko-KR') : ''}
              onChange={(e) => handleAmountChange(e.target.value)}
              aria-label="금액 입력 (만원)"
            />
            <span style={s.inputSuffix}>만원</span>
          </div>

          {amount > 0 && (
            <Paragraph typography="t4" color="#3182F6" style={s.preview}>
              {formatManwon(amount)}
              {metric === 'income' && period === 'monthly' && (
                <span style={s.previewSub}> · 연봉 환산 {formatManwon(amount * 12)}</span>
              )}
            </Paragraph>
          )}

          <div style={s.chipRow}>
            {chips.map((chip) => (
              <Button
                key={chip.label}
                size="small"
                color="primary"
                variant="weak"
                onClick={() => addAmount(chip.delta)}
                style={s.chipBtn}
              >
                +{chip.label}
              </Button>
            ))}
            <Button
              size="small"
              color="dark"
              variant="weak"
              onClick={() => setAmountStr('')}
              style={s.chipBtn}
            >
              초기화
            </Button>
          </div>
        </section>

        {/* 연령대 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              연령대
            </Paragraph>
            <Paragraph typography="t5" color="#B0B8C1">
              동년배 비교에 사용돼요
            </Paragraph>
          </div>
          <div style={s.ageGrid}>
            {AGE_GROUPS.map((age) => {
              const isActive = ageGroup === age;
              return (
                <Button
                  key={age}
                  size="large"
                  color="primary"
                  variant={isActive ? 'fill' : 'weak'}
                  onClick={() => setAgeGroup(age)}
                  style={s.ageBtn}
                >
                  {age}
                </Button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 하단 CTA */}
      <div style={s.footer}>
        <Button
          display="full"
          size="xlarge"
          color="primary"
          variant="fill"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          내 순위 확인하기
        </Button>
        <Paragraph typography="t5" color="#B0B8C1" style={s.footerNote}>
          국세청 · 통계청 가계금융복지조사 기반 추정
        </Paragraph>
      </div>
    </div>
  );
}

const CHIPS: Record<'monthly' | 'annual' | 'asset', { label: string; delta: number }[]> = {
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

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: '#F2F4F6',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '48px 24px 28px',
    backgroundColor: '#FFFFFF',
  },
  iconWrap: {
    width: '64px',
    height: '64px',
    backgroundColor: '#EBF3FE',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    marginBottom: '4px',
  },
  title: {
    letterSpacing: '-0.5px',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px 16px',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  sectionTitle: {
    letterSpacing: '-0.3px',
  },
  requiredBadge: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#3182F6',
    backgroundColor: '#EBF3FE',
    padding: '2px 7px',
    borderRadius: '6px',
  },
  metricHelp: {
    marginTop: '10px',
  },
  periodRow: {
    display: 'flex',
    gap: '6px',
    marginBottom: '12px',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#F2F4F6',
    borderRadius: '12px',
    padding: '14px 16px',
  },
  input: {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '24px',
    fontWeight: 700,
    color: '#191F28',
    textAlign: 'right',
    caretColor: '#3182F6',
  },
  inputSuffix: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#6B7684',
    flexShrink: 0,
  },
  preview: {
    marginTop: '10px',
    textAlign: 'right',
  },
  previewSub: {
    color: '#8B95A1',
    fontWeight: 400,
  },
  chipRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '12px',
    flexWrap: 'wrap',
  },
  chipBtn: {
    flexShrink: 0,
  },
  ageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  ageBtn: {
    width: '100%',
  },
  footer: {
    padding: '16px 16px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #F2F4F6',
  },
  footerNote: {
    textAlign: 'center',
  },
};
