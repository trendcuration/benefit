import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'benefit:bookmarks';
const UNLIMITED_KEY = 'benefit:bookmarks-unlimited';

export const FREE_BOOKMARK_LIMIT = 5;

function readStoredIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'number') : [];
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
  const [ids, setIds] = useState<number[]>(() => readStoredIds());
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

  const isBookmarked = useCallback((id: number) => ids.includes(id), [ids]);

  const isLimitReached = !isUnlimited && ids.length >= FREE_BOOKMARK_LIMIT;

  /** 무료 한도 내에서만 토글. 한도 초과 시 아무 동작도 하지 않으며 호출부에서 리워드 광고 유도를 처리합니다. */
  const toggle = useCallback(
    (id: number) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev.filter((v) => v !== id);
        if (!isUnlimited && prev.length >= FREE_BOOKMARK_LIMIT) return prev;
        return [...prev, id];
      });
    },
    [isUnlimited]
  );

  const add = useCallback((id: number) => {
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
