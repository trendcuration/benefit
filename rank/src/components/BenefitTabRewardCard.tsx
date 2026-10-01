import { useEffect, useState } from 'react';
import { Button, Paragraph } from '@toss/tds-mobile';
import { cameFromBenefitTab, hasClaimedBenefitTabReward, watchAdAndClaimReward } from '../lib/promotion';

type CardState = 'checking' | 'hidden' | 'idle' | 'loading' | 'granted' | 'retry';

/**
 * 혜택 탭 카드를 거쳐 들어온 사람에게만 보이는 "광고 보고 10원 받기" 배너.
 * 자체 진입(아이콘·공유 링크)이거나 이미 받은 적 있으면 아예 렌더링하지 않는다.
 * 탭하기 전에 광고가 나온다는 걸 먼저 알리고(10/22 노출 정책 — 예상 못 한 시점의
 * 광고 방지), 보상형 광고를 끝까지 봤을 때만(userEarnedReward) 지급한다.
 */
export function BenefitTabRewardCard() {
  const [state, setState] = useState<CardState>('checking');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromBenefitTab = await cameFromBenefitTab();
      if (!fromBenefitTab) {
        if (!cancelled) setState('hidden');
        return;
      }
      const claimed = await hasClaimedBenefitTabReward();
      if (!cancelled) setState(claimed ? 'hidden' : 'idle');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleWatchAd = () => {
    setState('loading');
    watchAdAndClaimReward((result) => {
      if (result === 'granted') setState('granted');
      else if (result === 'ad_not_watched') setState('retry');
      else setState('hidden'); // 미지원 환경·에러는 조용히 숨긴다(앱 사용 방해 안 함)
    });
  };

  if (state === 'checking' || state === 'hidden') return null;

  return (
    <div style={s.card}>
      {state === 'granted' ? (
        <Paragraph typography="t4" fontWeight="bold" style={{ margin: 0, color: '#191F28' }}>
          🎉 10원 받았어요!
        </Paragraph>
      ) : (
        <>
          <Paragraph typography="t4" fontWeight="bold" style={{ margin: 0, color: '#191F28' }}>
            🎁 혜택 탭으로 와주셨네요
          </Paragraph>
          <Paragraph typography="t6" color="#6B7684" style={s.subtitle}>
            {state === 'retry'
              ? '광고를 끝까지 봐야 받을 수 있어요. 다시 시도해주세요'
              : '탭하면 광고가 나와요. 끝까지 보면 10원 받아요'}
          </Paragraph>
          <Button
            display="full"
            size="medium"
            color="primary"
            variant="fill"
            disabled={state === 'loading'}
            onClick={handleWatchAd}
            style={s.button}
          >
            {state === 'loading' ? '광고 불러오는 중…' : '광고 보고 10원 받기'}
          </Button>
        </>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFF8E1',
    border: '1px solid #FFE49C',
    borderRadius: '16px',
    padding: '16px',
    margin: '0 16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  subtitle: {
    lineHeight: 1.5,
  },
  button: {
    marginTop: '8px',
  },
};
