import type { AgeGroup, Gender } from '../data/subsidies';

// 콘솔에 등록된 동의 항목 키. "나의 지원금"(miniAppId 43538) 기준 USER_GENDER/USER_BIRTHDAY
// 동의 항목으로 등록돼 있다는 전제 — 실기기 테스트로 실제 반환 필드를 확인해야 한다.
const CONSENTED_USER_DATA_KEY = 'cud_21075126f26e474e88869aaf6daffdd1';

export interface AutoFilledUserInfo {
  ageGroup: AgeGroup | null;
  gender: Gender | null;
}

const EMPTY_INFO: AutoFilledUserInfo = { ageGroup: null, gender: null };

/**
 * "YYYY-MM-DD"·"YYYYMMDD" 등 정확한 포맷이 문서화돼 있지 않아, 4자리 연도만 뽑아
 * 만 나이(근사치)로 환산한 뒤 연령대로 변환한다. 연도를 못 뽑으면 null.
 */
function birthdayToAgeGroup(birthday: string): AgeGroup | null {
  const match = birthday.match(/(\d{4})/);
  if (!match) return null;
  const birthYear = Number(match[1]);
  const thisYear = new Date().getFullYear();
  if (!Number.isFinite(birthYear) || birthYear < 1900 || birthYear > thisYear) return null;

  const age = thisYear - birthYear;
  if (age < 20) return '10대';
  if (age < 30) return '20대';
  if (age < 40) return '30대';
  if (age < 50) return '40대';
  if (age < 60) return '50대';
  if (age < 70) return '60대';
  return '70대이상';
}

/**
 * "MALE"/"M"/"여성" 등 알려지지 않은 포맷을 방어적으로 처리한다.
 * "FEMALE"에 "M"이 부분 문자열로 포함되는 함정이 있어 여성 판정을 먼저 검사한다.
 * 판별 불가 시 null(수동 선택 유지).
 */
function toGender(value: string): Gender | null {
  const upper = value.trim().toUpperCase();
  if (upper === 'FEMALE' || upper === 'F' || value.includes('여')) return '여성';
  if (upper === 'MALE' || upper === 'M' || value.includes('남')) return '남성';
  return null;
}

/**
 * 사용자 동의를 받아 성별/생년월일을 조회해 연령대/성별로 변환한다.
 * 동의 거부·미지원 앱 버전·알 수 없는 값·예외는 모두 null로 흡수해서, 호출부가
 * 실패를 그대로 무시하고 수동 선택 화면을 유지할 수 있게 한다.
 */
export async function fetchAutoFilledUserInfo(): Promise<AutoFilledUserInfo> {
  try {
    const { User } = await import('@apps-in-toss/web-framework');
    if (!User.getConsentedData.isSupported()) return EMPTY_INFO;

    const result = await User.getConsentedData({ consentedUserDataKey: CONSENTED_USER_DATA_KEY });
    if (!result) return EMPTY_INFO;

    return {
      ageGroup: result.USER_BIRTHDAY ? birthdayToAgeGroup(result.USER_BIRTHDAY) : null,
      gender: result.USER_GENDER ? toGender(result.USER_GENDER) : null,
    };
  } catch {
    return EMPTY_INFO;
  }
}
