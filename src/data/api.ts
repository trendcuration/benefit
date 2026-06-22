import type { AgeGroup, Gender, Subsidy } from './subsidies';
import { filterSubsidies } from './subsidies';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://benefit-production.up.railway.app';

export async function fetchSubsidies(
  ageGroup: AgeGroup | null,
  gender: Gender,
): Promise<Subsidy[]> {
  const params = new URLSearchParams();
  if (ageGroup) params.set('ageGroup', ageGroup);
  params.set('gender', gender);

  const res = await fetch(`${API_URL}/api/subsidies?${params.toString()}`);
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: '알 수 없는 오류' }));
    throw new Error(error || `서버 오류 (${res.status})`);
  }
  return res.json();
}

// API 연동 전 폴백 — 로컬 정적 데이터
export function fetchSubsidiesFallback(
  ageGroup: AgeGroup | null,
  gender: Gender,
): Subsidy[] {
  return filterSubsidies(ageGroup, gender);
}
