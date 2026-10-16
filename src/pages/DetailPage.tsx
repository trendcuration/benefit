import { useEffect, useRef } from 'react';
import { Button } from '@toss/tds-mobile';
import { EmojiIcon } from '../components/EmojiIcon';
import { CATEGORY_EMOJI, CATEGORY_ICON, LAST_UPDATED, type Subsidy } from '../data/subsidies';
import type { SubsidyDetail } from '../data/subsidyDetails';
import { logClick } from '../lib/analytics';
import { pushBackHandler } from '../lib/backStack';
import { attachTossBanner } from '../lib/banner';
import { openExternal } from '../lib/links';

const DETAIL_BANNER_AD_ID = 'ait.v2.live.ee27252f33184337';

interface DetailPageProps {
  item: Subsidy;
  detail?: SubsidyDetail;
  bookmarked: boolean;
  unlocking: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  onClose: () => void;
}

/**
 * 지원금 상세 요약. 목록 위에 덧씌워(position: fixed) 목록의 스크롤·필터 상태를 그대로 둔다.
 * 자체 헤더·뒤로가기 버튼은 두지 않는다(토스 내비게이션 바와 중복 → 반려 사유) — 시스템 뒤로가기는
 * backStack으로 받아 이 화면만 닫고, 본문 하단 "목록으로" 버튼으로도 돌아갈 수 있다.
 * 화면 이동이라 전면광고는 띄우지 않는다.
 */
export function DetailPage({
  item,
  detail,
  bookmarked,
  unlocking,
  onToggleBookmark,
  onShare,
  onClose,
}: DetailPageProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => pushBackHandler(onClose), [onClose]);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let result: { destroy: () => void } | undefined;
    const cancel = attachTossBanner(DETAIL_BANNER_AD_ID, el, (r) => {
      result = r;
    });
    return () => {
      cancel();
      result?.destroy();
    };
  }, []);

  const icon = CATEGORY_ICON[item.category];
  const regionLabel = item.regions.includes('전국') ? '전국' : item.regions.join('·');

  const handleApply = () => {
    logClick('subsidy_apply_click', { subsidy_id: item.id, category: item.category });
    openExternal(item.url);
  };

  const handleCall = (tel: string) => {
    logClick('subsidy_call_click', { subsidy_id: item.id });
    openExternal(`tel:${tel.replace(/[^0-9]/g, '')}`);
  };

  return (
    <div style={s.overlay} role="dialog" aria-label={`${item.title} 자세히 보기`}>
      <div style={s.content}>
        {/* 제목 영역 */}
        <div style={s.top}>
          <div style={s.topMeta}>
            <div style={{ ...s.iconBox, backgroundColor: icon.bg }}>
              <EmojiIcon codepoint={icon.codepoint} fallback={CATEGORY_EMOJI[item.category]} size={22} />
            </div>
            <span style={s.metaText}>
              {item.source} · {item.category}
            </span>
          </div>
          <h1 style={s.title}>{item.title}</h1>
          <p style={s.headline}>{detail?.headline ?? item.amount}</p>
          <div style={s.chips}>
            <span style={s.chip}>📍 {regionLabel}</span>
            <span style={item.isUrgent ? { ...s.chip, ...s.chipUrgent } : s.chip}>
              ⏰ {item.deadline}
            </span>
          </div>
        </div>

        <div style={s.divider} />

        <Section codepoint="1F4A1" fallback="💡" title="어떤 혜택이에요?">
          <p style={s.bodyText}>{detail?.summary ?? item.description}</p>
        </Section>

        <Section codepoint="1F4B0" fallback="💰" title="이렇게 지원해요">
          <Bullets items={detail?.support ?? [item.amount]} />
        </Section>

        {detail && (
          <Section codepoint="1F64B" fallback="🙋" title="이런 분이 받을 수 있어요">
            <Bullets items={detail.who} />
          </Section>
        )}

        {detail && (
          <Section codepoint="1F4DD" fallback="📝" title="이렇게 신청해요">
            <ol style={s.steps}>
              {detail.how.map((step, i) => (
                <li key={i} style={s.step}>
                  <span style={s.stepNum}>{i + 1}</span>
                  <span style={s.bodyText}>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section codepoint="23F0" fallback="⏰" title="언제까지 신청해요?">
          <p style={s.bodyText}>{item.deadline}</p>
        </Section>

        {detail?.contact && (
          <Section codepoint="1F4DE" fallback="📞" title="궁금하면 여기로 물어봐요">
            <div style={s.contactRow}>
              <div>
                <p style={s.bodyText}>{detail.contact.name}</p>
                {detail.contact.tel && <p style={s.tel}>{detail.contact.tel}</p>}
              </div>
              {detail.contact.tel && (
                <button
                  type="button"
                  style={s.callBtn}
                  onClick={() => handleCall(detail.contact!.tel!)}
                >
                  전화
                </button>
              )}
            </div>
          </Section>
        )}

        <div ref={bannerRef} style={s.banner} />

        <p style={s.disclaimer}>
          {`${LAST_UPDATED} 기준으로 핵심만 요약했어요.\n정확한 자격·금액은 신청 전 공식 안내에서 꼭 확인해 주세요.`}
        </p>

        <div style={s.backWrap}>
          <Button display="full" size="large" color="dark" variant="weak" onClick={onClose}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div style={s.bottomBar}>
        <button
          type="button"
          aria-label={bookmarked ? '찜 해제' : '찜하기'}
          style={s.iconBtn}
          onClick={onToggleBookmark}
          disabled={unlocking}
        >
          {unlocking ? '⏳' : bookmarked ? '💙' : '🤍'}
        </button>
        <button type="button" aria-label="공유하기" style={s.iconBtn} onClick={onShare}>
          🔗
        </button>
        <div style={s.applyWrap}>
          <Button display="full" size="large" color="primary" variant="fill" onClick={handleApply}>
            신청하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({
  codepoint,
  fallback,
  title,
  children,
}: {
  codepoint: string;
  fallback: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={s.section}>
      <h2 style={s.sectionTitle}>
        <EmojiIcon codepoint={codepoint} fallback={fallback} size={22} />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={s.bullets}>
      {items.map((text, i) => (
        <li key={i} style={s.bullet}>
          <span style={s.dot} />
          <span style={s.bodyText}>{text}</span>
        </li>
      ))}
    </ul>
  );
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 500,
    backgroundColor: '#FFFFFF',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  content: {
    paddingBottom: 'calc(96px + env(safe-area-inset-bottom))',
  },
  top: {
    padding: '20px 20px 24px',
  },
  topMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaText: {
    fontSize: '14px',
    color: '#6B7684',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: '-0.5px',
    color: '#191F28',
  },
  headline: {
    marginTop: '6px',
    fontSize: '18px',
    fontWeight: 700,
    color: '#3182F6',
    lineHeight: 1.4,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '14px',
  },
  chip: {
    fontSize: '13px',
    color: '#4E5968',
    backgroundColor: '#F2F4F6',
    borderRadius: '8px',
    padding: '5px 9px',
    lineHeight: 1.4,
  },
  chipUrgent: {
    color: '#B45309',
    backgroundColor: '#FFF4E5',
  },
  divider: {
    height: '10px',
    backgroundColor: '#F2F4F6',
  },
  section: {
    padding: '24px 20px 4px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: 700,
    color: '#191F28',
    marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  bodyText: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#333D4B',
  },
  bullets: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bullet: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  dot: {
    flexShrink: 0,
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#B0B8C1',
    marginTop: '11px',
  },
  steps: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  step: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  stepNum: {
    flexShrink: 0,
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#EBF3FE',
    color: '#3182F6',
    fontSize: '13px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  tel: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#191F28',
    marginTop: '2px',
  },
  callBtn: {
    flexShrink: 0,
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#F2F4F6',
    color: '#333D4B',
    fontSize: '15px',
    fontWeight: 600,
    padding: '10px 16px',
    cursor: 'pointer',
  },
  banner: {
    width: '100%',
    minHeight: '60px',
    marginTop: '24px',
  },
  disclaimer: {
    margin: '20px 20px 0',
    padding: '12px 14px',
    borderRadius: '12px',
    backgroundColor: '#F9FAFB',
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#8B95A1',
    whiteSpace: 'pre-line',
  },
  backWrap: {
    padding: '16px 20px 8px',
  },
  bottomBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 501,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px calc(10px + env(safe-area-inset-bottom))',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #F2F4F6',
  },
  iconBtn: {
    flexShrink: 0,
    width: '44px',
    height: '44px',
    border: 'none',
    borderRadius: '12px',
    background: '#F2F4F6',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  applyWrap: {
    flex: 1,
  },
};
