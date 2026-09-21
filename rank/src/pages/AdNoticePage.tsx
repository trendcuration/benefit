import { useEffect, useRef } from 'react';
import { Paragraph } from '@toss/tds-mobile';
import { showInterstitialAndWait } from '../lib/ads';

interface AdNoticePageProps {
  onDone: () => void;
}

/** 안내 문구를 읽을 최소 시간(ms). 안내를 본 뒤에 광고가 나오도록 보장한다. */
const NOTICE_MIN_MS = 1200;

/**
 * 결과 화면으로 넘어가기 전 잠깐 보여주는 광고 안내 화면.
 * "곧 광고가 나와요"를 먼저 보여준 뒤 광고를 노출하고, 광고가 끝나면(성공/실패 모두) 결과로 넘어간다.
 */
export function AdNoticePage({ onDone }: AdNoticePageProps) {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    new Promise<void>((r) => setTimeout(r, NOTICE_MIN_MS))
      .then(() => showInterstitialAndWait())
      .then(onDone);
  }, [onDone]);

  return (
    <div style={s.container}>
      <div style={s.spinner} aria-hidden />
      <span style={s.adBadge}>광고</span>
      <Paragraph typography="t3" fontWeight="bold" style={s.title}>
        내 순위를 보기 전, 잠깐 광고가 나와요
      </Paragraph>
      <Paragraph typography="t5" color="#6B7684" style={s.subtitle}>
        광고가 끝나면 바로 결과를 보여드릴게요
      </Paragraph>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    minHeight: '100dvh',
    padding: '24px',
    backgroundColor: '#F2F4F6',
    textAlign: 'center',
  },
  spinner: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '3px solid #DDE3EC',
    borderTopColor: '#3182F6',
    animation: 'spin 0.8s linear infinite',
    marginBottom: '4px',
  },
  adBadge: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#8B95A1',
    backgroundColor: '#E5E8EB',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  title: {
    letterSpacing: '-0.3px',
  },
  subtitle: {
    textAlign: 'center',
  },
};
