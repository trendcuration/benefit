import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'benefit:bookmarks';

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

export function useBookmarks() {
  const [ids, setIds] = useState<number[]>(() => readStoredIds());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // localStorage 접근 불가 환경(사생활 보호 모드 등)에서는 조용히 무시합니다.
    }
  }, [ids]);

  const isBookmarked = useCallback((id: number) => ids.includes(id), [ids]);

  const toggle = useCallback((id: number) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }, []);

  return { bookmarkedIds: ids, isBookmarked, toggle };
}
