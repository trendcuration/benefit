import { useMemo, useState } from 'react';
import { Button, SegmentedControl, Paragraph } from '@toss/tds-mobile';
import {
  AGE_GROUPS,
  CATEGORY_EMOJI,
  GENDERS,
  subsidies,
  type AgeGroup,
  type Gender,
} from '../data/subsidies';
import type { SavedSearch } from '../utils/storage';

interface FilterPageProps {
  onSearch: (ageGroup: AgeGroup | null, gender: Gender) => void;
  savedSearch: SavedSearch | null;
}

export function FilterPage({ onSearch, savedSearch }: FilterPageProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(savedSearch?.ageGroup ?? null);
  const [selectedGender, setSelectedGender] = useState<Gender>(savedSearch?.gender ?? '전체');

  const canSearch = selectedAge !== null;

  // 날짜 기준으로 매일 바뀌는 추천 지원금
  const todayPick = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86_400_000);
    return subsidies[dayIndex % subsidies.length];
  }, []);

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <div style={s.iconWrap} className="benefit-pop">💰</div>
        <Paragraph as="h1" typography="t1" style={s.title}>
          지원금 찾기
        </Paragraph>
        <Paragraph typography="t4" color="#6B7684" style={s.subtitle}>
          {'연령대와 성별을 선택하면\n딱 맞는 지원금을 찾아드려요'}
        </Paragraph>
      </header>

      <div style={s.body}>
        {/* 지난 검색 이어하기 */}
        {savedSearch && (
          <button
            style={s.resumeCard}
            className="benefit-fade-up"
            onClick={() => onSearch(savedSearch.ageGroup, savedSearch.gender)}
          >
            <div style={s.resumeLeft}>
              <span style={s.resumeIcon}>⚡</span>
              <div style={s.resumeTexts}>
                <Paragraph typography="t4" fontWeight="bold" style={{ color: '#FFFFFF' }}>
                  지난 조건으로 바로 검색
                </Paragraph>
                <Paragraph typography="t6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {savedSearch.ageGroup} · {savedSearch.gender} — 새 지원금이 있는지 확인해보세요
                </Paragraph>
              </div>
            </div>
            <span style={s.resumeArrow}>→</span>
          </button>
        )}

        {/* 오늘의 추천 지원금 */}
        <div style={s.todayCard} className="benefit-fade-up">
          <div style={s.todayHeader}>
            <Paragraph typography="t5" fontWeight="bold" style={{ color: '#8B5CF6' }}>
              ✨ 오늘의 추천 지원금
            </Paragraph>
            <Paragraph typography="t6" color="#B0B8C1">
              매일 하나씩 소개해요
            </Paragraph>
          </div>
          <a href={todayPick.url} target="_blank" rel="noopener noreferrer" style={s.todayLink}>
            <Paragraph typography="t4" fontWeight="bold" style={{ color: '#191F28' }}>
              {CATEGORY_EMOJI[todayPick.category]} {todayPick.title}
            </Paragraph>
            <Paragraph typography="t6" color="#6B7684" style={s.todayAmount}>
              {todayPick.amount}
            </Paragraph>
          </a>
        </div>

        {/* 연령대 선택 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              연령대
            </Paragraph>
            <span style={s.requiredBadge}>필수</span>
          </div>
          <div style={s.ageGrid}>
            {AGE_GROUPS.map((age) => {
              const isActive = selectedAge === age;
              return (
                <Button
                  key={age}
                  size="medium"
                  color="primary"
                  variant={isActive ? 'fill' : 'weak'}
                  onClick={() => setSelectedAge(isActive ? null : age)}
                  style={s.ageBtn}
                >
                  {age}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 성별 선택 */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <Paragraph typography="t3" fontWeight="bold" style={s.sectionTitle}>
              성별
            </Paragraph>
            <Paragraph typography="t5" color="#B0B8C1">
              미선택 시 전체 조회
            </Paragraph>
          </div>
          <SegmentedControl
            value={selectedGender}
            onChange={(v) => setSelectedGender(v as Gender)}
            size="large"
          >
            {GENDERS.map((g) => (
              <SegmentedControl.Item key={g} value={g}>
                {GENDER_LABEL[g]}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl>
        </section>

        {/* 선택 요약 */}
        {selectedAge && (
          <div style={s.summaryBox} className="benefit-fade-up">
            <Paragraph typography="t4" color="#3182F6">
              <strong>{selectedAge}</strong> · <strong>{selectedGender}</strong>에 해당하는 지원금을 검색합니다
            </Paragraph>
          </div>
        )}
      </div>

      {/* 하단 CTA */}
      <div style={s.footer}>
        <Button
          display="full"
          size="xlarge"
          color="primary"
          variant="fill"
          disabled={!canSearch}
          onClick={() => canSearch && onSearch(selectedAge, selectedGender)}
        >
          지원금 검색하기
        </Button>
        <Paragraph typography="t5" color="#B0B8C1" style={s.footerNote}>
          복지로·공공데이터 기준 최신 정보 제공
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
    padding: '48px 24px 28px',
    background: 'linear-gradient(180deg, #E8F1FE 0%, #FFFFFF 100%)',
  },
  iconWrap: {
    width: '64px',
    height: '64px',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    marginBottom: '4px',
    boxShadow: '0 4px 16px rgba(49, 130, 246, 0.15)',
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
  resumeCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    backgroundColor: '#3182F6',
    background: 'linear-gradient(135deg, #3182F6 0%, #1B64DA 100%)',
    borderRadius: '16px',
    padding: '16px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    WebkitTapHighlightColor: 'transparent',
  },
  resumeLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  resumeIcon: {
    fontSize: '24px',
  },
  resumeTexts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    backgroundColor: 'transparent',
  },
  resumeArrow: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 700,
  },
  todayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid #EDE9FE',
  },
  todayHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayLink: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  todayAmount: {
    lineHeight: 1.5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  sectionTitle: {
    letterSpacing: '-0.3px',
  },
  requiredBadge: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#3182F6',
    backgroundColor: '#EBF3FE',
    padding: '2px 7px',
    borderRadius: '6px',
  },
  ageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  },
  ageBtn: {
    width: '100%',
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
  },
};
