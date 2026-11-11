import { AGE_GROUPS, REGIONS, type AgeGroup, type Region } from '../data/percentiles';

/** 결과 화면에서 고른 연령대·지역을 기기에 기억해 두고, 다음 판정 때 바로 비교해 보여준다. */
const AGE_KEY = 'income-rank:age.v1';
const REGION_KEY = 'income-rank:region.v1';

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // 저장이 안 되는 환경에서는 이번 화면에서만 쓴다.
  }
}

export function loadAgeGroup(): AgeGroup {
  const saved = read(AGE_KEY) as AgeGroup | null;
  return saved && AGE_GROUPS.includes(saved) ? saved : '전체';
}

export function saveAgeGroup(age: AgeGroup) {
  write(AGE_KEY, age);
}

export function loadRegion(): Region {
  const saved = read(REGION_KEY) as Region | null;
  return saved && REGIONS.includes(saved) ? saved : '전국';
}

export function saveRegion(region: Region) {
  write(REGION_KEY, region);
}
