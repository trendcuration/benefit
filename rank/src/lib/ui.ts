import type { CSSProperties } from 'react';

/** 화면 공통 색·크기. 글씨는 본문 17px, 보조 15px, 가장 작은 글씨도 13px 아래로 내리지 않는다. */
export const color = {
  bg: '#F2F4F6',
  surface: '#FFFFFF',
  text: '#191F28',
  textSub: '#4E5968',
  textWeak: '#8B95A1',
  line: '#E5E8EB',
  chip: '#F2F4F6',
  blue: '#3182F6',
  blueWeak: '#E8F3FF',
} as const;

export const font = {
  headline: { fontSize: '28px', fontWeight: 700, lineHeight: 1.32, letterSpacing: '-0.6px', color: color.text },
  title: { fontSize: '20px', fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.3px', color: color.text },
  body: { fontSize: '17px', fontWeight: 500, lineHeight: 1.5, color: color.textSub },
  sub: { fontSize: '15px', fontWeight: 500, lineHeight: 1.5, color: color.textWeak },
  caption: { fontSize: '13px', fontWeight: 500, lineHeight: 1.5, color: color.textWeak },
} satisfies Record<string, CSSProperties>;

export const card: CSSProperties = {
  backgroundColor: color.surface,
  borderRadius: '24px',
  padding: '24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

/** 화면 아래에 붙는 버튼 영역 */
export const footer: CSSProperties = {
  position: 'sticky',
  bottom: 0,
  padding: '12px 20px 28px',
  backgroundColor: color.surface,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

/** 선택 칩(연령대·지역·금액 더하기) */
export function chip(active = false): CSSProperties {
  return {
    height: '40px',
    padding: '0 14px',
    borderRadius: '999px',
    border: 'none',
    backgroundColor: active ? color.text : color.chip,
    color: active ? '#FFFFFF' : color.textSub,
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  };
}
