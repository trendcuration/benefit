export interface Tier {
  /** 이 티어에 속하는 최대 상위 % (p <= maxP) */
  maxP: number;
  emoji: string;
  title: string;
  oneLiner: string;
}

export const TIERS: Tier[] = [
  { maxP: 1, emoji: '👑', title: '상위 1%의 세계', oneLiner: '여기는 공기부터 다른 곳이에요' },
  { maxP: 5, emoji: '💎', title: '다이아몬드 티어', oneLiner: '스무 명 중 한 명만 서는 자리예요' },
  { maxP: 10, emoji: '🏆', title: '상위 10% 클럽', oneLiner: '열 명 중 아홉 명이 당신을 올려다봐요' },
  { maxP: 30, emoji: '🚀', title: '평균은 진작 추월', oneLiner: '평균? 이미 백미러에서 사라졌어요' },
  { maxP: 50, emoji: '💪', title: '절반보다 위', oneLiner: '대한민국 절반이 당신 아래에 있어요' },
  { maxP: 70, emoji: '🌱', title: '성장 구간', oneLiner: '지금부터 오르막이 시작되는 구간이에요' },
  { maxP: 100, emoji: '🐣', title: '이제 시작', oneLiner: '시작이 반! 오늘부터 차곡차곡' },
];

export function getTier(p: number): Tier {
  return TIERS.find((t) => p <= t.maxP) ?? TIERS[TIERS.length - 1];
}
