import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'benefit:bookmarks';
const UNLIMITED_KEY = 'benefit:bookmarks-unlimited';

export const FREE_BOOKMARK_LIMIT = 5;

/**
 * 찜 키는 'c12'(직접 정리한 지원금)·'g서비스ID'(정부24) 문자열이다.
 * 예전 버전은 직접 정리한 지원금 id 숫자만 저장했으므로 숫자는 'c'를 붙여 옮긴다.
 */
function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v) => (typeof v === 'number' ? `c${v}` : v))
      .filter((v): v is string => typeof v === 'string');
  } catch {
    return [];
  }
}

function readUnlimited(): boolean {
  try {
    return localStorage.getItem(UNLIMITED_KEY) === '1';
  } catch {
    return false;
  }
}

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>(() => readStoredIds());
  const [isUnlimited, setIsUnlimited] = useState<boolean>(() => readUnlimited());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // localStorage 접근 불가 환경(사생활 보호 모드 등)에서는 조용히 무시합니다.
    }
  }, [ids]);

  useEffect(() => {
    try {
      localStorage.setItem(UNLIMITED_KEY, isUnlimited ? '1' : '0');
    } catch {
      // localStorage 접근 불가 환경(사생활 보호 모드 등)에서는 조용히 무시합니다.
    }
  }, [isUnlimited]);

  const isBookmarked = useCallback((id: string) => ids.includes(id), [ids]);

  const isLimitReached = !isUnlimited && ids.length >= FREE_BOOKMARK_LIMIT;

  /** 무료 한도 내에서만 토글. 한도 초과 시 아무 동작도 하지 않으며 호출부에서 리워드 광고 유도를 처리합니다. */
  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev.filter((v) => v !== id);
        if (!isUnlimited && prev.length >= FREE_BOOKMARK_LIMIT) return prev;
        return [...prev, id];
      });
    },
    [isUnlimited]
  );

  const add = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unlockUnlimited = useCallback(() => setIsUnlimited(true), []);

  return {
    bookmarkedIds: ids,
    isBookmarked,
    toggle,
    add,
    isUnlimited,
    isLimitReached,
    unlockUnlimited,
  };
}
