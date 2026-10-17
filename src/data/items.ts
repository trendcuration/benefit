import { ageRange, isCategory, type Category, type Gender, type Subsidy } from './subsidies';
import { CURATED_GOV24_IDS, getSubsidyDetail } from './subsidyDetails';
import type { GovItem } from './gov24';

/** 목록 한 줄 — 직접 정리한 지원금(curated)과 정부24 데이터(gov)를 같은 모양으로 맞춘다. */
export interface ListItem {
  /** 'c12'(직접 정리) | 'g105100000001'(정부24 서비스ID). 찜·로그 키로 쓴다. */
  key: string;
  kind: 'curated' | 'gov';
  /** 회색 윗줄: 지원금 이름(직접 정리) / 기관명(정부24) */
  label: string;
  /** 굵은 줄: 핵심 혜택(직접 정리) / 서비스명(정부24) */
  headline: string;
  /** 보조 줄: 대상(직접 정리) / 대표 금액 또는 요약(정부24) */
  sub: string;
  /** 맨 아랫줄: 기관·신청기간 */
  meta: string;
  category: Category;
  deadline: string;
  isUrgent: boolean;
  /** 금액순 정렬용 문구 */
  amountText: string;
  /** 정부24 조회수(직접 정리 항목은 맨 앞에 오도록 큰 값) */
  rank: number;
  /** 우리 구 사업이면 구 이름 */
  sgg: string | null;
  /** 특정 대상(장애인·임산부 등) 전용 */
  special: boolean;
  tags: string[];
  searchText: string;
  curated?: Subsidy;
  gov?: GovItem;
}

const CURATED_RANK = Number.MAX_SAFE_INTEGER;

/**
 * 목록 맨 아랫줄의 신청기간 문구. 원문이 '신청불필요'·'상시신청'처럼 이미 '신청'을 품고 있으면
 * 앞에 '신청'을 또 붙이지 않는다('신청 신청불필요' 같은 중복 방지).
 */
export function deadlineLabel(d: string): string {
  const t = d.trim();
  if (!t) return '';
  if (/불필요|신청\s*절차가\s*없|신청\s*없/.test(t)) return '별도 신청 없이 받아요';
  if (/^상시/.test(t)) return `신청 ${t.replace(/^상시\s*(신청|접수)/, '상시')}`;
  if (/신청|접수|마감|모집/.test(t)) return t;
  return `신청 ${t}`;
}

export function fromCurated(s: Subsidy): ListItem {
  const d = getSubsidyDetail(s.id);
  return {
    key: `c${s.id}`,
    kind: 'curated',
    label: s.title,
    headline: d?.headline ?? s.amount,
    sub: d?.target ?? s.description,
    meta: `${s.source} · ${deadlineLabel(s.deadline)}`,
    category: s.category,
    deadline: s.deadline,
    isUrgent: !!s.isUrgent,
    amountText: s.amount,
    rank: CURATED_RANK,
    sgg: null,
    special: false,
    tags: [],
    searchText: [s.title, s.description, d?.headline, d?.target, s.source].join(' ').toLowerCase(),
    curated: s,
  };
}

export function fromGov(g: GovItem): ListItem {
  const category = isCategory(g.c) ? g.c : '생활·금융';
  return {
    key: `g${g.i}`,
    kind: 'gov',
    label: g.o,
    headline: g.n,
    sub: g.a ? `${g.a} · ${g.s}` : g.s,
    meta: deadlineLabel(g.d),
    category,
    deadline: g.d,
    isUrgent: false,
    amountText: g.a ?? '',
    rank: g.v,
    sgg: g.g,
    special: !!g.sp,
    tags: g.t ?? [],
    searchText: [g.n, g.o, g.s, g.tg].join(' ').toLowerCase(),
    gov: g,
  };
}

export interface MatchOptions {
  birthYear: number | null;
  gender: Gender;
  /** 고른 시군구(없으면 시도 전체) */
  sgg: string | null;
}

/** 정부24 항목이 사용자 조건에 맞는지(나이 범위가 겹치는지, 성별, 시군구). */
export function govMatches(g: GovItem, { birthYear, gender, sgg }: MatchOptions): boolean {
  const range = ageRange(birthYear);
  if (range) {
    if (g.lo != null && range[1] < g.lo) return false;
    if (g.hi != null && range[0] > g.hi) return false;
  }
  if (gender === '남성' && g.sx === 'F') return false;
  if (gender === '여성' && g.sx === 'M') return false;
  // 구를 고르지 않았으면 구 사업은 빼고(다른 구 사업이 섞이지 않게) 시도·전국 사업만 보여준다.
  if (g.g && g.g !== sgg) return false;
  return true;
}

/** 직접 정리한 지원금과 겹치는 정부24 서비스ID */
export const CURATED_DUP_IDS = new Set(Object.values(CURATED_GOV24_IDS).flat());
