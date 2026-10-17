import { useEffect, useState } from 'react';
import { Button, SegmentedControl, Paragraph } from '@toss/tds-mobile';
import { GENDERS, type Gender } from '../data/subsidies';
import { loadMeta, type GovMeta } from '../data/gov24';
import { IS_PROMOTION_TEST } from '../lib/promotion';
import { isFromBenefitMission } from '../lib/referrer';

export interface SearchParams {
  birthYear: number | null;
  gender: Gender;
  /** 시도 짧은 이름(예: '서울'). 데이터 파일 이름과 같다. */
  sido: string | null;
  sidoName: string | null;
  sgg: string | null;
}

interface FilterPageProps {
  initial: SearchParams;
  onSearch: (params: SearchParams) => void;
}

const THIS_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: THIS_YEAR - 1930 + 1 }, (_, i) => THIS_YEAR - i);

/** 정부24 데이터를 못 받았을 때도 시도는 고를 수 있도록 둔다(구 목록만 비게 된다). */
const FALLBACK_SIDOS: GovMeta['sidos'] = [
  ['서울특별시', '서울'], ['부산광역시', '부산'], ['대구광역시', '대구'], ['인천광역시', '인천'],
  ['대전광역시', '대전'], ['울산광역시', '울산'], ['세종특별자치시', '세종'], ['경기도', '경기'],
  ['강원특별자치도', '강원'], ['충청북도', '충북'], ['충청남도', '충남'], ['전북특별자치도', '전북'],
  ['전남광주통합특별시', '전남광주'], ['경상북도', '경북'], ['경상남도', '경남'], ['제주특별자치도', '제주'],
].map(([name, short]) => ({ name, short, count: 0, sggs: [] }));

export function FilterPage({ initial, onSearch }: FilterPageProps) {
  const [birthYear, setBirthYear] = useState<number | null>(initial.birthYear);
  const [gender, setGender] = useState<Gender>(initial.gender);
  const [sido, setSido] = useState<string | null>(initial.sido);
  const [sgg, setSgg] = useState<string | null>(initial.sgg);
  const [sidos, setSidos] = useState<GovMeta['sidos']>(FALLBACK_SIDOS);
  // 리워드는 혜택탭 미션 카드로 들어와 '지원금 상세보기'까지 한 사람에게만 지급되므로
  // (ResultsPage 참고), 그 경우에만 조건을 미리 안내한다 — 다른 경로로 들어온 사람에게
  // 실제로 안 주는 리워드를 약속하지 않기 위함.
  const [cameFromBenefitMission] = useState(
    () => IS_PROMOTION_TEST || isFromBenefitMission()
  );

  useEffect(() => {
    loadMeta()
      .then((meta) => setSidos(meta.sidos))
      .catch(() => {});
  }, []);

  const sidoInfo = sidos.find((x) => x.short === sido) ?? null;
  const sggs = sidoInfo?.sggs ?? [];
  const age = birthYear ? THIS_YEAR - birthYear : null;

  const summary = [
    birthYear ? `${String(birthYear).slice(2)}년생` : '전체 연령',
    sido ? (sgg ? `${sido} ${sgg}` : sido) : '전국',
    gender === '전체' ? null : gender,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <div style={s.iconWrap}>💰</div>
        <Paragraph as="h1" typography="t1" fontWeight="bold" style={s.title}>
          나의 지원금 찾기
        </Paragraph>
        <Paragraph typography="t4" color="#6B7684" style={s.subtitle}>
          {'태어난 해와 사는 곳을 고르면\n우리 동네 지원금까지 찾아드려요'}
        </Paragraph>
      </header>

      <div style={s.body}>
        {/* 출생연도 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              태어난 해
            </Paragraph>
            {age != null && <span style={s.optionalBadge}>올해 만 {age - 1}~{age}세</span>}
          </div>
          <select
            aria-label="태어난 해"
            style={s.select}
            value={birthYear ?? ''}
            onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">선택 안 함 (전체 연령)</option>
            {BIRTH_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}년생
              </option>
            ))}
          </select>
        </section>

        {/* 사는 곳 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              사는 곳
            </Paragraph>
            <span style={s.optionalBadge}>구까지 고르면 우리 동네 지원금도 보여요</span>
          </div>
          <div style={s.selectRow}>
            <select
              aria-label="시·도"
              style={s.select}
              value={sido ?? ''}
              onChange={(e) => {
                setSido(e.target.value || null);
                setSgg(null);
              }}
            >
              <option value="">시·도 (선택 안 함)</option>
              {sidos.map((x) => (
                <option key={x.short} value={x.short}>
                  {x.name}
                </option>
              ))}
            </select>
            <select
              aria-label="시·군·구"
              style={s.select}
              value={sgg ?? ''}
              disabled={!sido || sggs.length === 0}
              onChange={(e) => setSgg(e.target.value || null)}
            >
              <option value="">{sido && sggs.length === 0 ? '구 구분 없음' : '시·군·구'}</option>
              {sggs.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* 성별 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              성별
            </Paragraph>
            <Paragraph typography="t4" color="#8B95A1">
              미선택 시 전체 조회
            </Paragraph>
          </div>
          <SegmentedControl value={gender} onChange={(v) => setGender(v as Gender)} size="large">
            {GENDERS.map((g) => (
              <SegmentedControl.Item key={g} value={g}>
                {GENDER_LABEL[g]}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl>
        </section>

        {/* 선택 요약 */}
        <div style={s.summaryBox}>
          <Paragraph typography="t4" color="#3182F6">
            <strong>{summary}</strong> 기준으로 지원금을 찾아요
          </Paragraph>
        </div>
      </div>

      {/* 하단 CTA */}
      <div style={s.footer}>
        {/* 혜택탭 미션으로 들어온 경우, 유저가 검색을 시작하기 전에 지급 조건을 먼저 밝힌다.
            혜택탭 카드는 '10원'만 보여주므로 여기서 '무엇을 해야 받는지'를 분명히 해둔다. */}
        {cameFromBenefitMission && (
          <div style={s.missionNotice}>
            <Paragraph typography="t5" style={s.missionNoticeText}>
              {'💰 지원금을 검색한 뒤\n마음에 드는 지원금 1개를 자세히 보면 10원을 받아요'}
            </Paragraph>
          </div>
        )}
        <div style={s.adNotice}>
          <Paragraph typography="t5" color="#8B95A1" style={s.adNoticeText}>
            {'📺 아래 버튼을 누르면\n결과를 보기 전 잠깐 광고가 표시돼요'}
          </Paragraph>
        </div>
        <Button
          display="full"
          size="xlarge"
          color="primary"
          variant="fill"
          onClick={() =>
            onSearch({ birthYear, gender, sido, sidoName: sidoInfo?.name ?? null, sgg })
          }
        >
          지원금 찾기
        </Button>
        <Paragraph typography="t5" color="#8B95A1" style={s.footerNote}>
          {'정부24 공공서비스 정보 기준 · 매주 새로 반영'}
        </Paragraph>
      </div>
    </div>
  );
}

const GENDER_LABEL: Record<Gender, string> = {
  전체: '👥 전체',
  남성: '👨 남성',
  여성: '👩 여성',
};

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    backgroundColor: '#F2F4F6',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '40px 24px 24px',
    backgroundColor: '#FFFFFF',
  },
  iconWrap: {
    width: '64px',
    height: '64px',
    backgroundColor: '#EBF3FE',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    marginBottom: '4px',
  },
  title: {
    letterSpacing: '-0.5px',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px 16px',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '14px',
  },
  sectionTitle: {
    letterSpacing: '-0.3px',
  },
  optionalBadge: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6B7684',
    backgroundColor: '#F2F4F6',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  selectRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  select: {
    width: '100%',
    height: '52px',
    padding: '0 36px 0 14px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#191F28',
    backgroundColor: '#F2F4F6',
    border: 'none',
    borderRadius: '12px',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B95A1' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  },
  summaryBox: {
    backgroundColor: '#EBF3FE',
    borderRadius: '12px',
    padding: '14px 16px',
  },
  footer: {
    padding: '16px 16px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #F2F4F6',
  },
  footerNote: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
    lineHeight: 1.6,
  },
  missionNotice: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 12px',
    marginBottom: '8px',
    backgroundColor: '#EEF3FF',
    borderRadius: '10px',
  },
  missionNoticeText: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
    color: '#1B64DA',
  },
  adNotice: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 12px',
    backgroundColor: '#F2F4F6',
    borderRadius: '10px',
  },
  adNoticeText: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
    lineHeight: 1.5,
  },
};
