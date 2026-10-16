import { useState } from 'react';
import { tossEmojiUrl } from '../data/subsidies';

interface EmojiIconProps {
  /** 토스 2D 이모지 코드포인트 (예: '1F3E0') */
  codepoint: string;
  /** 이미지를 못 불러왔을 때 대신 보여줄 이모지 글자 */
  fallback: string;
  size: number;
}

export function EmojiIcon({ codepoint, fallback, size }: EmojiIconProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span aria-hidden style={{ fontSize: size * 0.85, lineHeight: 1, width: size, textAlign: 'center' }}>
        {fallback}
      </span>
    );
  }
  return (
    <img
      src={tossEmojiUrl(codepoint)}
      alt=""
      aria-hidden
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}
