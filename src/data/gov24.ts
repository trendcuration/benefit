/**
 * 정부24 공공서비스 데이터(매일 새벽 scripts/gov24-publish.sh 가 benefit 저장소 `data` 브랜치에 올린다).
 *
 * 읽는 순서: pointer.json(브랜치 최신, jsDelivr 캐시를 매일 비움) → 거기 적힌 커밋으로 고정된
 * 주소에서 meta/list/detail을 읽는다. 커밋 주소는 내용이 바뀌지 않아 CDN·브라우저 캐시를 그대로 쓸 수 있다.
 * jsDelivr가 실패하면 GitHub raw로 한 번 더 시도한다.
 */

export interface GovItem {
  /** 서비스ID */
  i: string;
  /** 서비스명 */
  n: string;
  /** 소관기관명 */
  o: string;
  /** 시군구 이름(시군구 사업일 때만) */
  g: string | null;
  /** 앱 카테고리 */
  c: string;
  /** 서비스 목적 요약 */
  s: string;
  /** 지원내용에서 뽑은 대표 금액 */
  a: string | null;
  /** 지원대상 첫 줄 */
  tg: string;
  /** 신청기한 첫 줄 */
  d: string;
  /** 조회수 */
  v: number;
  lo?: number;
  hi?: number;
  sx?: 'M' | 'F';
  /** 특정 대상(장애인·임산부 등)만 받을 수 있음 */
  sp?: 1;
  /** 특정 대상 태그 */
  t?: string[];
}

export interface GovDetail {
  i: string;
  n: string;
  o: string;
  purpose: string[];
  support: string[];
  target: string[];
  criteria: string[];
  how: string[];
  docs: string[];
  deadline: string[];
  contact: string[];
  receipt: string;
  type: string;
  apply: string | null;
  gov: string;
  updated: string;
}

export interface GovMeta {
  updatedAt: string;
  source: string;
  total: number;
  national: number;
  sidos: { name: string; short: string; count: number; sggs: string[] }[];
}

const REPO = 'trendcuration/benefit';
const POINTER_URL = `https://cdn.jsdelivr.net/gh/${REPO}@data/pointer.json`;
const POINTER_KEY = 'benefit:gov24-pointer';

async function getJson<T>(url: string, timeoutMs = 10_000): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

let commitPromise: Promise<string> | null = null;

/** 데이터 커밋 해시. 네트워크가 안 되면 마지막으로 받았던 값을 쓴다. */
function getCommit(): Promise<string> {
  if (!commitPromise) {
    commitPromise = getJson<{ commit: string }>(POINTER_URL, 6000)
      .then(({ commit }) => {
        try {
          localStorage.setItem(POINTER_KEY, commit);
        } catch {
          /* 저장 실패는 무시 */
        }
        return commit;
      })
      .catch((e) => {
        let saved: string | null = null;
        try {
          saved = localStorage.getItem(POINTER_KEY);
        } catch {
          /* 무시 */
        }
        if (saved) return saved;
        commitPromise = null;
        throw e;
      });
  }
  return commitPromise;
}

async function getData<T>(path: string): Promise<T> {
  const commit = await getCommit();
  try {
    return await getJson<T>(`https://cdn.jsdelivr.net/gh/${REPO}@${commit}/${path}`);
  } catch {
    return getJson<T>(`https://raw.githubusercontent.com/${REPO}/${commit}/${path}`);
  }
}

const cache = new Map<string, Promise<unknown>>();

function cached<T>(path: string): Promise<T> {
  let p = cache.get(path) as Promise<T> | undefined;
  if (!p) {
    p = getData<T>(path);
    cache.set(path, p);
    p.catch(() => cache.delete(path));
  }
  return p;
}

export const loadMeta = () => cached<GovMeta>('v1/meta.json');
export const loadNational = () => cached<GovItem[]>('v1/list/national.json');
export const loadSido = (short: string) => cached<GovItem[]>(`v1/list/${short}.json`);
export const loadDetail = (id: string) => cached<GovDetail>(`v1/detail/${id}.json`);
