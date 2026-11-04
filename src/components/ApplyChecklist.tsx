import { useState } from 'react';
import { getApplyState, setApplyState } from '../lib/applyProgress';
import { logClick } from '../lib/analytics';

interface ApplyChecklistProps {
  itemKey: string;
  /** 체크할 줄(구비서류 또는 신청 순서) */
  lines: string[];
  /** 체크 줄 아래에 흐리게 보여줄 참고 문구(※ 줄) */
  notes?: string[];
  /** 무엇을 체크하는지: 서류면 '준비', 순서면 '진행' */
  kind: 'docs' | 'steps';
}

/**
 * 신청 준비 체크리스트. 체크 상태와 '신청했어요' 표시는 이 기기에만 저장된다(lib/applyProgress).
 * 신청했어요로 표시하면 목록에 '신청함' 배지가 붙고, 찜 카드의 마감 안내에서 빠진다.
 */
export function ApplyChecklist({ itemKey, lines, notes = [], kind }: ApplyChecklistProps) {
  const [state, setState] = useState(() => getApplyState(itemKey));
  const done = new Set(state.done);
  const total = lines.length;
  const count = lines.filter((_, i) => done.has(i)).length;

  const save = (next: { done: number[]; applied: boolean }) => {
    setApplyState(itemKey, next);
    setState({ ...next, at: Date.now() });
  };

  const toggleLine = (i: number) => {
    const next = done.has(i) ? state.done.filter((x) => x !== i) : [...state.done, i];
    logClick('apply_check', { subsidy_id: itemKey, kind, checked: !done.has(i), count: next.length, total });
    save({ done: next, applied: state.applied });
  };

  const toggleApplied = () => {
    logClick('apply_done_toggle', { subsidy_id: itemKey, applied: !state.applied });
    save({ done: state.done, applied: !state.applied });
  };

  return (
    <div>
      {total > 0 && (
        <>
          <div style={s.progressRow}>
            <span style={s.progressText}>
              {count === total ? '모두 챙겼어요 👏' : `${total}개 중 ${count}개 ${kind === 'docs' ? '준비했어요' : '했어요'}`}
            </span>
          </div>
          <div style={s.progressBar} aria-hidden>
            <div style={{ ...s.progressFill, width: `${total ? (count / total) * 100 : 0}%` }} />
          </div>
          <ul style={s.list}>
            {lines.map((line, i) => {
              const on = done.has(i);
              return (
                <li key={i}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    style={s.row}
                    onClick={() => toggleLine(i)}
                  >
                    <span style={on ? { ...s.box, ...s.boxOn } : s.box} aria-hidden>
                      {on ? '✓' : ''}
                    </span>
                    <span style={on ? { ...s.text, ...s.textDone } : s.text}>{line}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {notes.map((n, i) => (
            <p key={i} style={s.note}>
              {n}
            </p>
          ))}
        </>
      )}
      <button
        type="button"
        aria-pressed={state.applied}
        style={state.applied ? { ...s.appliedBtn, ...s.appliedBtnOn } : s.appliedBtn}
        onClick={toggleApplied}
      >
        {state.applied ? '✅ 신청했어요 (누르면 취소)' : '신청을 마쳤다면 눌러서 표시해 두세요'}
      </button>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  progressRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  progressText: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1B64DA',
  },
  progressBar: {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#F2F4F6',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3182F6',
    borderRadius: '4px',
    transition: 'width 0.2s',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '11px 0',
    border: 'none',
    borderBottom: '1px solid #F2F4F6',
    outline: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  box: {
    flexShrink: 0,
    width: '26px',
    height: '26px',
    borderRadius: '8px',
    border: '2px solid #D1D6DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 700,
    color: '#FFFFFF',
  },
  boxOn: {
    border: '2px solid #3182F6',
    backgroundColor: '#3182F6',
  },
  text: {
    fontSize: '17px',
    lineHeight: 1.55,
    color: '#333D4B',
    paddingTop: '1px',
  },
  textDone: {
    color: '#8B95A1',
    textDecoration: 'line-through',
  },
  note: {
    marginTop: '8px',
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#8B95A1',
  },
  appliedBtn: {
    width: '100%',
    marginTop: '16px',
    padding: '15px',
    border: '1px dashed #B0B8C1',
    borderRadius: '12px',
    background: 'none',
    fontSize: '16px',
    fontWeight: 600,
    color: '#4E5968',
    cursor: 'pointer',
  },
  appliedBtnOn: {
    border: '1px solid #0A8754',
    backgroundColor: '#E6F7EF',
    color: '#0A8754',
  },
};
