import { useEffect } from 'react';
import { Button } from '@toss/tds-mobile';
import { EmojiIcon } from './EmojiIcon';
import { logClick } from '../lib/analytics';
import { pushBackHandler } from '../lib/backStack';

interface ReviewPromptSheetProps {
  onClose: () => void;
}

/** 앱을 잘 쓰고 있는 사용자에게 토스 기본 별점 화면(Review.request)으로 이어주는 안내 시트. 광고 아님. */
export function ReviewPromptSheet({ onClose }: ReviewPromptSheetProps) {
  useEffect(() => pushBackHandler(onClose), [onClose]);

  useEffect(() => {
    logClick('review_prompt_view');
  }, []);

  const handleRate = () => {
    logClick('review_prompt_click');
    onClose();
    import('@apps-in-toss/web-framework')
      .then(({ Review }) => {
        if (Review.request.isSupported()) return Review.request();
        return undefined;
      })
      .catch(() => {});
  };

  const handleLater = () => {
    logClick('review_prompt_dismiss');
    onClose();
  };

  return (
    <div style={s.dim} onClick={handleLater}>
      <div style={s.sheet} role="dialog" aria-label="앱 평가 요청" onClick={(e) => e.stopPropagation()}>
        <div style={s.handle} />
        <div style={s.iconWrap}>
          <EmojiIcon codepoint="2B50" fallback="⭐" size={40} />
        </div>
        <h2 style={s.title}>앱 어떠셨어요?</h2>
        <p style={s.sub}>
          {'도움이 되셨다면 별점으로 응원해 주세요.\n소중한 피드백이 더 좋은 지원금 정보를 만드는 힘이 돼요.'}
        </p>
        <Button display="full" size="xlarge" color="primary" variant="fill" onClick={handleRate}>
          별점 남기기
        </Button>
        <button type="button" style={s.later} onClick={handleLater}>
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
  iconWrap: {
    width: '72px',
    height: '72px',
    borderRadius: '24px',
    backgroundColor: '#FFF8DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#191F28',
    letterSpacing: '-0.4px',
  },
  sub: {
    margin: '10px 0 26px',
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#6B7684',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  later: {
    marginTop: '8px',
    padding: '12px 24px',
    border: 'none',
    background: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#8B95A1',
    cursor: 'pointer',
  },
};
