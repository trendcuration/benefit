import { useEffect } from 'react';
import { Button } from '@toss/tds-mobile';
import { EmojiIcon } from './EmojiIcon';
import { logClick } from '../lib/analytics';
import { pushBackHandler } from '../lib/backStack';

interface PushAskSheetProps {
  /** 무엇 때문에 떴는지(조회수/체류시간) — 로그로만 쓴다. */
  trigger: 'views' | 'dwell';
  onAgree: () => void;
  onClose: () => void;
}

/** 지원금을 몇 개 보거나 30초 넘게 둘러본 사용자에게 매주 월요일 새 지원금 알림을 권하는 시트. */
export function PushAskSheet({ trigger, onAgree, onClose }: PushAskSheetProps) {
  useEffect(() => pushBackHandler(onClose), [onClose]);

  useEffect(() => {
    logClick('weekly_push_popup_view', { trigger });
  }, [trigger]);

  return (
    <div style={s.dim} onClick={onClose}>
      <div style={s.sheet} role="dialog" aria-label="새 지원금 알림 받기" onClick={(e) => e.stopPropagation()}>
        <div style={s.handle} />
        <EmojiIcon codepoint="1F514" fallback="🔔" size={56} />
        <h2 style={s.title}>{'새로 올라온 지원금,\n월요일마다 알려드릴까요?'}</h2>
        <p style={s.sub}>정부24 지원금은 매주 새로 올라와요. 매주 월요일 12시에 한 번만 알려드려요.</p>
        <div style={s.cta}>
          <Button display="full" size="xlarge" color="primary" variant="fill" onClick={onAgree}>
            알림 받기
          </Button>
        </div>
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
    marginTop: '14px',
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
    lineHeight: 1.5,
    color: '#6B7684',
    textAlign: 'center',
  },
  cta: {
    width: '100%',
    marginTop: '26px',
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
