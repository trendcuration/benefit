/**
 * 조건 선택 화면의 '지금 내 상황'. 정부24 지원조건 코드에서 만든 대상 태그(scripts/gov24-sync.mjs SPECIAL)와
 * 연결해서, 특정 대상 전용 사업 중 내 상황에 맞는 것만 기본 목록에 넣는다.
 */
export interface Situation {
  id: string;
  label: string;
  emoji: string;
  /** 정부24 대상 태그(GovItem.t) */
  tags: string[];
}

export const SITUATIONS: Situation[] = [
  { id: 'pregnancy', label: '임신·출산 준비', emoji: '🤰', tags: ['예비부모·난임', '임산부', '출산·입양'] },
  { id: 'student-parent', label: '학생 자녀', emoji: '🎒', tags: ['초등학생', '중학생', '고등학생'] },
  { id: 'multi-child', label: '다자녀', emoji: '👨‍👩‍👧‍👦', tags: ['다자녀'] },
  { id: 'single-parent', label: '한부모·조손', emoji: '🧑‍🧒', tags: ['한부모·조손'] },
  { id: 'single', label: '1인 가구', emoji: '🏠', tags: ['1인가구'] },
  { id: 'no-house', label: '무주택', emoji: '🔑', tags: ['무주택'] },
  { id: 'moved', label: '최근 이사(전입)', emoji: '📦', tags: ['신규전입'] },
  { id: 'college', label: '대학생', emoji: '🎓', tags: ['대학생'] },
  { id: 'small-biz', label: '소상공인', emoji: '🏪', tags: ['소상공인'] },
  { id: 'farm', label: '농·어업인', emoji: '🌾', tags: ['농업인', '어업인', '축산업인', '임업인'] },
  { id: 'disabled', label: '장애인 가구', emoji: '♿', tags: ['장애인'] },
  { id: 'patient', label: '질환·치료 중', emoji: '🏥', tags: ['질환자'] },
  { id: 'veteran', label: '보훈대상', emoji: '🎖️', tags: ['보훈대상자'] },
  { id: 'multicultural', label: '다문화·북한이탈', emoji: '🌏', tags: ['다문화가족', '북한이탈주민'] },
];

/** 고른 상황들에 해당하는 대상 태그 */
export function tagsOf(ids: string[]): Set<string> {
  return new Set(SITUATIONS.filter((s) => ids.includes(s.id)).flatMap((s) => s.tags));
}

export function labelsOf(ids: string[]): string[] {
  return SITUATIONS.filter((s) => ids.includes(s.id)).map((s) => s.label);
}
