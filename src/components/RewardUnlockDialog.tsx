import { Button, Paragraph } from '@toss/tds-mobile';

interface RewardUnlockDialogProps {
  limit: number;
  onConfirm: () => void;
  onCancel: () => void;
}

/** 무료 북마크 한도를 넘겼을 때, 광고를 보기 전에 무엇을 얻는지 알리고 사용자가 선택하게 하는 안내. */
export function RewardUnlockDialog({ limit, onConfirm, onCancel }: RewardUnlockDialogProps) {
  return (
    <div style={s.backdrop} role="dialog" aria-modal="true" onClick={onCancel}>
      <div style={s.sheet} onClick={(e) => e.stopPropagation()}>
        <span style={s.adBadge}>광고</span>
        <Paragraph typography="t3" fontWeight="bold" style={s.title}>
          북마크는 {limit}개까지 무료예요
        </Paragraph>
        <Paragraph typography="t5" color="#4E5968" style={s.desc}>
          광고를 한 번 보면 북마크를 제한 없이 할 수 있어요. 한 번만 보면 계속 유지돼요.
        </Paragraph>
        <div style={s.actions}>
          <Button display="full" size="large" color="primary" variant="weak" onClick={onCancel}>
            다음에 할게요
          </Button>
          <Button display="full" size="large" color="primary" variant="fill" onClick={onConfirm}>
            광고 보고 무제한 북마크
          </Button>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '24px 20px 28px',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
  },
  adBadge: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#8B95A1',
    backgroundColor: '#E5E8EB',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  title: { letterSpacing: '-0.3px' },
  desc: { lineHeight: 1.5 },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  },
};
