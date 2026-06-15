import { useState } from 'react';
import { Button, SegmentedControl, Paragraph } from '@toss/tds-mobile';
import { AGE_GROUPS, GENDERS, type AgeGroup, type Gender } from '../data/subsidies';

interface FilterPageProps {
  onSearch: (ageGroup: AgeGroup | null, gender: Gender) => void;
}

export function FilterPage({ onSearch }: FilterPageProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>('전체');

  const canSearch = selectedAge !== null;

  return (
    <div style={s.container}>
      {/* 헤더 */}
      <header style={s.header}>
        <div style={s.iconWrap}>💰</div>
        <Paragraph as="h1" typography="t1" style={s.title}>
          지원금 찾기
        </Paragraph>
        <Paragraph typography="t4" color="secondary" style={s.subtitle}>
          {'연령대와 성별을 선택하면\n딱 맞는 지원금을 찾아드려요'}
        </Paragraph>
      </header>

      <div style={s.body}>
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
            <Paragraph typography="t5" color="tertiary">
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
          <div style={s.summaryBox}>
            <Paragraph typography="t4" color="primary">
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
        <Paragraph typography="t5" color="tertiary" style={s.footerNote}>
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '48px 24px 28px',
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
