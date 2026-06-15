export type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대' | '60대' | '70대이상';
export type Gender = '전체' | '남성' | '여성';
export type Category = '주거' | '취업·창업' | '금융' | '복지·돌봄' | '교육' | '건강' | '문화·여가';

export interface Subsidy {
  id: number;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: Category;
  ageGroups: AgeGroup[];
  genders: Gender[];
  source: string;
  url: string;
  isUrgent?: boolean;
}

export const subsidies: Subsidy[] = [
  // ── 주거 ──
  {
    id: 1,
    title: '청년 월세 한시 특별지원',
    description: '만 19~34세 청년 중 독립 거주자에게 월세 최대 20만원을 최대 12개월 지원합니다.',
    amount: '월 최대 20만원',
    deadline: '상시',
    category: '주거',
    ageGroups: ['20대', '30대'],
    genders: ['전체'],
    source: '국토교통부',
    url: 'https://www.bokjiro.go.kr',
  },
  {
    id: 2,
    title: '청년 전세보증금 반환보증 보증료 지원',
    description: '만 34세 이하 청년 세입자의 전세보증금 반환보증 보증료를 최대 30만원 지원합니다.',
    amount: '최대 30만원',
    deadline: '2025-12-31',
    category: '주거',
    ageGroups: ['20대', '30대'],
    genders: ['전체'],
    source: '국토교통부',
    url: 'https://www.hf.go.kr',
  },
  {
    id: 3,
    title: '노인 주거급여',
    description: '65세 이상 기초수급자 또는 차상위계층을 대상으로 임차료 또는 주택 수선 비용을 지원합니다.',
    amount: '월 최대 33만원',
    deadline: '상시',
    category: '주거',
    ageGroups: ['60대', '70대이상'],
    genders: ['전체'],
    source: '국토교통부',
    url: 'https://www.myhome.go.kr',
  },

  // ── 취업·창업 ──
  {
    id: 4,
    title: '국민취업지원제도 (I 유형)',
    description: '취업 취약계층에게 월 50만원의 구직촉진수당을 최대 6개월 지급하고 취업 지원 서비스를 제공합니다.',
    amount: '월 50만원 × 최대 6개월',
    deadline: '상시',
    category: '취업·창업',
    ageGroups: ['20대', '30대', '40대', '50대'],
    genders: ['전체'],
    source: '고용노동부',
    url: 'https://www.kua.go.kr',
  },
  {
    id: 5,
    title: '청년도전지원사업',
    description: '구직단념 청년에게 자신감 회복 및 취업 준비를 위한 프로그램 참여 수당 월 40만원을 지원합니다.',
    amount: '월 40만원',
    deadline: '2025-09-30',
    category: '취업·창업',
    ageGroups: ['10대', '20대', '30대'],
    genders: ['전체'],
    source: '고용노동부',
    url: 'https://www.work.go.kr',
    isUrgent: true,
  },
  {
    id: 6,
    title: '중장년 취업아카데미',
    description: '만 40~65세 중장년층 대상 직업훈련과 취업 알선을 무료로 제공합니다.',
    amount: '무료 훈련 제공',
    deadline: '상시',
    category: '취업·창업',
    ageGroups: ['40대', '50대', '60대'],
    genders: ['전체'],
    source: '고용노동부',
    url: 'https://www.work.go.kr',
  },
  {
    id: 7,
    title: '여성 새로일하기센터 취업지원',
    description: '경력이 단절된 여성에게 직업상담, 직업교육훈련, 인턴십, 취업 후 사후관리 서비스를 지원합니다.',
    amount: '훈련비 지원 + 취업장려금',
    deadline: '상시',
    category: '취업·창업',
    ageGroups: ['20대', '30대', '40대', '50대'],
    genders: ['여성'],
    source: '여성가족부',
    url: 'https://www.saeil.mogef.go.kr',
  },

  // ── 금융 ──
  {
    id: 8,
    title: '청년도약계좌',
    description: '만 19~34세 청년이 5년간 매월 최대 70만원을 납입하면 정부 기여금과 비과세 혜택을 더해 최대 5천만원을 마련할 수 있습니다.',
    amount: '최대 5,000만원 (5년)',
    deadline: '상시',
    category: '금융',
    ageGroups: ['20대', '30대'],
    genders: ['전체'],
    source: '금융위원회',
    url: 'https://ylaccount.kinfa.or.kr',
  },
  {
    id: 9,
    title: '청년내일저축계좌',
    description: '일하는 저소득 청년이 3년간 매월 10만원 저축 시 정부가 최대 30만원을 매칭 지원해 1,440만원 목돈을 마련할 수 있습니다.',
    amount: '최대 1,440만원 (3년)',
    deadline: '2025-08-31',
    category: '금융',
    ageGroups: ['10대', '20대', '30대'],
    genders: ['전체'],
    source: '보건복지부',
    url: 'https://www.bokjiro.go.kr',
    isUrgent: true,
  },
  {
    id: 10,
    title: '소상공인 정책자금 대출',
    description: '소상공인을 대상으로 사업 운전자금·시설자금을 저금리(연 2~3%)로 최대 7천만원까지 대출 지원합니다.',
    amount: '최대 7,000만원 (저금리)',
    deadline: '상시',
    category: '금융',
    ageGroups: ['20대', '30대', '40대', '50대', '60대'],
    genders: ['전체'],
    source: '소상공인시장진흥공단',
    url: 'https://www.semas.or.kr',
  },

  // ── 복지·돌봄 ──
  {
    id: 11,
    title: '기초연금',
    description: '만 65세 이상 소득 하위 70% 어르신에게 매월 최대 33만 4,810원을 지급합니다.',
    amount: '월 최대 33만원',
    deadline: '상시',
    category: '복지·돌봄',
    ageGroups: ['60대', '70대이상'],
    genders: ['전체'],
    source: '보건복지부',
    url: 'https://www.bokjiro.go.kr',
  },
  {
    id: 12,
    title: '임신·출산 진료비 지원 (국민행복카드)',
    description: '임신 확인 후 단태아 100만원, 다태아 140만원의 진료비 바우처를 지원합니다.',
    amount: '단태아 100만원 / 다태아 140만원',
    deadline: '상시',
    category: '복지·돌봄',
    ageGroups: ['20대', '30대', '40대'],
    genders: ['여성'],
    source: '보건복지부',
    url: 'https://www.nhis.or.kr',
  },
  {
    id: 13,
    title: '노인 장기요양보험',
    description: '신체 활동 및 가사 지원이 필요한 65세 이상 어르신에게 요양서비스 비용을 지원합니다.',
    amount: '서비스 비용의 85% 지원',
    deadline: '상시',
    category: '복지·돌봄',
    ageGroups: ['60대', '70대이상'],
    genders: ['전체'],
    source: '국민건강보험공단',
    url: 'https://www.nhis.or.kr',
  },
  {
    id: 14,
    title: '한부모가족 아동양육비',
    description: '저소득 한부모가족의 만 18세 미만 아동 1인당 월 21만원의 양육비를 지원합니다.',
    amount: '아동 1인당 월 21만원',
    deadline: '상시',
    category: '복지·돌봄',
    ageGroups: ['20대', '30대', '40대'],
    genders: ['전체'],
    source: '여성가족부',
    url: 'https://www.bokjiro.go.kr',
  },

  // ── 교육 ──
  {
    id: 15,
    title: 'K-디지털 트레이닝',
    description: '인공지능·빅데이터·클라우드 등 신기술 분야 훈련과정에 대해 최대 200만원의 훈련비를 지원합니다.',
    amount: '최대 200만원',
    deadline: '상시',
    category: '교육',
    ageGroups: ['20대', '30대', '40대'],
    genders: ['전체'],
    source: '고용노동부',
    url: 'https://www.hrd.go.kr',
  },
  {
    id: 16,
    title: '국가장학금 (I·II 유형)',
    description: '소득 8구간 이하 대학생에게 연간 최대 570만원의 등록금을 지원합니다.',
    amount: '연 최대 570만원',
    deadline: '2025-09-15',
    category: '교육',
    ageGroups: ['10대', '20대'],
    genders: ['전체'],
    source: '한국장학재단',
    url: 'https://www.kosaf.go.kr',
    isUrgent: true,
  },
  {
    id: 17,
    title: '내일배움카드',
    description: '재직자·구직자 누구나 300~500만원 한도의 훈련비 바우처를 통해 직업훈련을 받을 수 있습니다.',
    amount: '300~500만원 (바우처)',
    deadline: '상시',
    category: '교육',
    ageGroups: ['20대', '30대', '40대', '50대', '60대'],
    genders: ['전체'],
    source: '고용노동부',
    url: 'https://www.hrd.go.kr',
  },

  // ── 건강 ──
  {
    id: 18,
    title: '청년 마음건강 바우처',
    description: '만 19~34세 청년에게 전문 심리상담 서비스 비용을 최대 40만원 지원합니다.',
    amount: '최대 40만원',
    deadline: '상시',
    category: '건강',
    ageGroups: ['10대', '20대', '30대'],
    genders: ['전체'],
    source: '보건복지부',
    url: 'https://www.bokjiro.go.kr',
  },
  {
    id: 19,
    title: '일반건강검진 (국가건강검진)',
    description: '2년마다 기본 건강검진을 무료로 제공하며 40세·66세에는 생애전환기 검진이 추가 제공됩니다.',
    amount: '무료',
    deadline: '상시',
    category: '건강',
    ageGroups: ['20대', '30대', '40대', '50대', '60대', '70대이상'],
    genders: ['전체'],
    source: '국민건강보험공단',
    url: 'https://www.nhis.or.kr',
  },
  {
    id: 20,
    title: '여성 암 검진 지원',
    description: '자궁경부암(20세↑)·유방암(40세↑) 검진 비용을 건강보험 적용으로 10%만 본인 부담합니다.',
    amount: '검진비 90% 지원',
    deadline: '상시',
    category: '건강',
    ageGroups: ['20대', '30대', '40대', '50대', '60대', '70대이상'],
    genders: ['여성'],
    source: '국민건강보험공단',
    url: 'https://www.nhis.or.kr',
  },

  // ── 문화·여가 ──
  {
    id: 21,
    title: '문화누리카드',
    description: '기초수급자 및 차상위계층에게 공연·영화·스포츠·여행 등 문화생활비로 연간 13만원을 지원합니다.',
    amount: '연 13만원',
    deadline: '상시',
    category: '문화·여가',
    ageGroups: ['10대', '20대', '30대', '40대', '50대', '60대', '70대이상'],
    genders: ['전체'],
    source: '문화체육관광부',
    url: 'https://www.mnuri.kr',
  },
  {
    id: 22,
    title: '어르신 문화프로그램',
    description: '60세 이상 어르신을 위한 문화예술 교육프로그램을 전국 문화원·복지관에서 무료로 제공합니다.',
    amount: '무료',
    deadline: '상시',
    category: '문화·여가',
    ageGroups: ['60대', '70대이상'],
    genders: ['전체'],
    source: '문화체육관광부',
    url: 'https://www.culture.go.kr',
  },
];

export const AGE_GROUPS: AgeGroup[] = ['10대', '20대', '30대', '40대', '50대', '60대', '70대이상'];
export const GENDERS: Gender[] = ['전체', '남성', '여성'];
export const CATEGORIES: Category[] = ['주거', '취업·창업', '금융', '복지·돌봄', '교육', '건강', '문화·여가'];

export const CATEGORY_EMOJI: Record<Category, string> = {
  '주거': '🏠',
  '취업·창업': '💼',
  '금융': '💰',
  '복지·돌봄': '🤝',
  '교육': '📚',
  '건강': '❤️',
  '문화·여가': '🎭',
};

export function filterSubsidies(
  ageGroup: AgeGroup | null,
  gender: Gender,
): Subsidy[] {
  return subsidies.filter((s) => {
    const ageMatch = ageGroup == null || s.ageGroups.includes(ageGroup);
    const genderMatch =
      gender === '전체' ||
      s.genders.includes('전체') ||
      s.genders.includes(gender);
    return ageMatch && genderMatch;
  });
}
