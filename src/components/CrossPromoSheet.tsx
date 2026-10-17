import { useEffect } from 'react';
import { Button } from '@toss/tds-mobile';
import { EmojiIcon } from './EmojiIcon';
import { logClick } from '../lib/analytics';
import { pushBackHandler } from '../lib/backStack';
import { openExternal } from '../lib/links';

/** 같은 워크스페이스의 자매 미니앱(광고 아님). appName은 콘솔 등록값과 같아야 딥링크가 열린다. */
export interface PromoApp {
  id: 'hidden-money-finder' | 'income-rank';
  url: string;
  title: string;
  sub: string;
  cta: string;
  features: { codepoint: string; fallback: string; label: string; bg: string }[];
}

export const PROMO_APPS: PromoApp[] = [
  {
    id: 'hidden-money-finder',
    url: 'intoss://hidden-money-finder',
    title: '잠자고 있는 내 돈\n지금 찾아가세요',
    sub: '휴면예금·보험금·환급금 한 곳에서 조회 · 무료',
    cta: '숨은 내 돈 찾으러 가기',
    features: [
      { codepoint: '1F3E6', fallback: '🏦', label: '휴면예금', bg: '#EAF3FF' },
      { codepoint: '1F4C4', fallback: '📄', label: '숨은 보험금', bg: '#EDF8F0' },
      { codepoint: '1F4B3', fallback: '💳', label: '카드포인트', bg: '#F2EEFF' },
      { codepoint: '1F3E5', fallback: '🏥', label: '건보 환급금', bg: '#FFF3E6' },
    ],
  },
  {
    id: 'income-rank',
    url: 'intoss://income-rank',
    title: '내 소득은 대한민국\n상위 몇 %일까요?',
    sub: '연봉만 넣으면 바로 확인 · 연령·지역별 비교',
    cta: '내 소득 순위 보러 가기',
    features: [
      { codepoint: '1F4CA', fallback: '📊', label: '전국 순위', bg: '#EAF3FF' },
      { codepoint: '1F382', fallback: '🎂', label: '연령대별', bg: '#FDEEF4' },
      { codepoint: '1F4CD', fallback: '📍', label: '지역별', bg: '#EDF8F0' },
      { codepoint: '1F3C6', fallback: '🏆', label: '내 티어', bg: '#FFF8DB' },
    ],
  },
];

interface CrossPromoSheetProps {
  app: PromoApp;
  onClose: () => void;
}

/** 지원금 상세를 여러 개 본 뒤 목록으로 돌아왔을 때 띄우는 자매 앱 안내 시트. 시스템 뒤로가기로도 닫힌다. */
export function CrossPromoSheet({ app, onClose }: CrossPromoSheetProps) {
  useEffect(() => pushBackHandler(onClose), [onClose]);

  useEffect(() => {
    logClick('cross_promo_view', { target: app.id });
  }, [app.id]);

  const handleGo = () => {
    logClick('cross_promo_click', { target: app.id });
    onClose();
    openExternal(app.url);
  };

  return (
    <div style={s.dim} onClick={onClose}>
      <div style={s.sheet} role="dialog" aria-label={app.title.replace('\n', ' ')} onClick={(e) => e.stopPropagation()}>
        <div style={s.handle} />
        <h2 style={s.title}>{app.title}</h2>
        <p style={s.sub}>{app.sub}</p>
        <div style={s.features}>
          {app.features.map((f) => (
            <div key={f.label} style={s.feature}>
              <div style={{ ...s.featureIcon, backgroundColor: f.bg }}>
                <EmojiIcon codepoint={f.codepoint} fallback={f.fallback} size={34} />
              </div>
              <span style={s.featureLabel}>{f.label}</span>
            </div>
          ))}
        </div>
        <Button display="full" size="xlarge" color="primary" variant="fill" onClick={handleGo}>
          {app.cta}
        </Button>
        <button type="button" style={s.later} onClick={onClose}>
          다음에
        </button>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  dim: {
    position: 'fixed',
    inset: 0,
    zIndex: 900,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sheet: {
    width: '100%',
    maxWidth: '480px',
    margin: '0 10px 10px',
    padding: '12px 22px calc(12px + env(safe-area-inset-bottom))',
    backgroundColor: '#FFFFFF',
    borderRadius: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  handle: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#E5E8EB',
    marginBottom: '22px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1.4,
    textAlign: 'center',
    whiteSpace: 'pre-line',
    color: '#191F28',
    letterSpacing: '-0.4px',
  },
  sub: {
    marginTop: '10px',
    fontSize: '15px',
    color: '#6B7684',
    textAlign: 'center',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    width: '100%',
    margin: '26px 0 28px',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  featureIcon: {
    width: '62px',
    height: '62px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4E5968',
    whiteSpace: 'nowrap',
  },
  later: {
    marginTop: '8px',
    padding: '12px 24px',
    border: 'none',
    background: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#3182F6',
    cursor: 'pointer',
  },
};
