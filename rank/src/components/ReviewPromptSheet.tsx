import { useEffect } from 'react';
import { Button } from '@toss/tds-mobile';
import { Review } from '@apps-in-toss/web-framework';
import { logClick } from '../lib/analytics';

interface ReviewPromptSheetProps {
  onClose: () => void;
}

/**
 * 결과를 충분히 본 사용자에게 토스 기본 별점 화면(Review.request)으로 이어주는 안내 시트. 광고 아님.
 * 네이티브 화면이라 버튼을 누른 그 자리에서 정적 import한 Review.request()를 바로 부른다
 * (비동기 지연이 끼면 화면이 안 열리는 경우가 있었다 — 나의 지원금에서 확인).
 */
export function ReviewPromptSheet({ onClose }: ReviewPromptSheetProps) {
  useEffect(() => {
    logClick('review_prompt_view');
  }, []);

  const handleRate = () => {
    logClick('review_prompt_click');
    try {
      if (Review.request.isSupported()) {
        Review.request().catch(() => logClick('review_request_error'));
      } else {
        logClick('review_request_unsupported');
      }
    } catch {
      logClick('review_request_error');
    }
    onClose();
  };

  const handleLater = () => {
    logClick('review_prompt_dismiss');
    onClose();
  };

  return (
    <div style={s.dim} onClick={handleLater}>
      <div style={s.sheet} role="dialog" aria-label="앱 평가 요청" onClick={(e) => e.stopPropagation()}>
        <div style={s.handle} />
        <div style={s.iconWrap} aria-hidden="true">⭐</div>
        <h2 style={s.title}>내 순위 확인, 재밌으셨나요?</h2>
        <p style={s.sub}>{'별점을 남겨주시면\n더 정확한 통계로 보답할게요.'}</p>
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
    fontSize: '36px',
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
