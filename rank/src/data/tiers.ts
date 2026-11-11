/** 결과 카드 색. 등급이 올라갈수록 깊고 진한 색으로 바뀐다. */
export interface TierTheme {
  /** 카드 배경 그러데이션 시작·끝 */
  from: string;
  to: string;
  /** 강조색(점 그래프·등급 이름) */
  accent: string;
}

export interface Tier {
  /** 이 티어에 속하는 최대 상위 % (p <= maxP) */
  maxP: number;
  emoji: string;
  title: string;
  oneLiner: string;
  theme: TierTheme;
}

const GOLD: TierTheme = { from: '#17171C', to: '#4A3A17', accent: '#F7CE68' };
const VIOLET: TierTheme = { from: '#23155F', to: '#6A4DF5', accent: '#D6CCFF' };
const BLUE: TierTheme = { from: '#0A2F8F', to: '#3182F6', accent: '#BFDCFF' };
const TEAL: TierTheme = { from: '#06524F', to: '#0FA596', accent: '#B4F3EA' };
const GREEN: TierTheme = { from: '#17502C', to: '#27A45B', accent: '#C4F5D5' };
const SUNRISE: TierTheme = { from: '#7A2A0E', to: '#DE5A1B', accent: '#FFDDC2' };

export const TIERS: Tier[] = [
  { maxP: 0.001, emoji: '🌌', title: '대한민국 최상위 0.001%', oneLiner: '전국에 다 합쳐도 300명이 채 안 돼요', theme: GOLD },
  { maxP: 0.01, emoji: '🏔️', title: '전설의 상위 0.01%', oneLiner: '뉴스에서나 보던 그 사람들 급이에요', theme: GOLD },
  { maxP: 0.03, emoji: '🛸', title: '상위 0.03%의 희소함', oneLiner: '0.1%보다도 세 배는 더 좁은 문이에요', theme: GOLD },
  { maxP: 0.1, emoji: '👑', title: '상위 0.1%의 세계', oneLiner: '여기는 공기부터 다른 곳이에요', theme: GOLD },
  { maxP: 0.3, emoji: '🦄', title: '상위 0.3%, 흔치 않은 자리', oneLiner: '1% 문턱보다 세 배 더 높은 곳이에요', theme: GOLD },
  { maxP: 1, emoji: '💎', title: '상위 1% 클럽', oneLiner: '백 명 중 한 명만 서는 자리예요', theme: GOLD },
  { maxP: 5, emoji: '✨', title: '다이아몬드 티어', oneLiner: '스무 명 중 한 명만 서는 자리예요', theme: VIOLET },
  { maxP: 10, emoji: '🏆', title: '상위 10% 클럽', oneLiner: '열 명 중 아홉 명이 당신을 올려다봐요', theme: VIOLET },
  { maxP: 30, emoji: '🚀', title: '평균은 진작 추월', oneLiner: '평균? 이미 백미러에서 사라졌어요', theme: BLUE },
  { maxP: 50, emoji: '💪', title: '절반보다 위', oneLiner: '대한민국 절반이 당신 아래에 있어요', theme: TEAL },
  { maxP: 70, emoji: '🌱', title: '성장 구간', oneLiner: '지금부터 오르막이 시작되는 구간이에요', theme: GREEN },
  { maxP: 100, emoji: '🐣', title: '이제 시작', oneLiner: '시작이 반! 오늘부터 차곡차곡', theme: SUNRISE },
];

export function getTier(p: number): Tier {
  return TIERS.find((t) => p <= t.maxP) ?? TIERS[TIERS.length - 1];
}
