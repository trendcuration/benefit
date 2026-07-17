import type { AgeGroup, Gender } from '../data/subsidies';

const SAVED_SEARCH_KEY = 'benefit:savedSearch';
const BOOKMARKS_KEY = 'benefit:bookmarks';

export interface SavedSearch {
  ageGroup: AgeGroup;
  gender: Gender;
}

export function loadSavedSearch(): SavedSearch | null {
  const raw = safeGet(SAVED_SEARCH_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SavedSearch;
    if (!parsed.ageGroup || !parsed.gender) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSearch(search: SavedSearch): void {
  safeSet(SAVED_SEARCH_KEY, JSON.stringify(search));
}

// 즐겨찾기는 제목 기준으로 저장 (API 데이터의 id는 페이지 순서에 따라 바뀔 수 있음)
export function loadBookmarks(): Set<string> {
  const raw = safeGet(BOOKMARKS_KEY);
  if (!raw) return new Set();
  try {
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

export function persistBookmarks(bookmarks: Set<string>): void {
  safeSet(BOOKMARKS_KEY, JSON.stringify([...bookmarks]));
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 저장 불가 환경에서는 무시
  }
}
