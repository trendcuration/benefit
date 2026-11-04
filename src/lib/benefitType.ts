/**
 * 지원 형태를 금액 문구로 대략 나눈다(요약 카드용).
 * - loan: 대출·융자·보증(갚아야 하는 돈)
 * - discount: 감면·할인·면제·무료
 * - cash: 그 밖에 금액이 적힌 것(현금·바우처·수당 등)
 * - service: 금액이 없는 것(상담·돌봄 서비스 등)
 */
export type BenefitType = 'cash' | 'loan' | 'discount' | 'service';

export function benefitTypeOf(text: string): BenefitType {
  if (/대출|융자|보증|저금리|이자/.test(text)) return 'loan';
  if (/감면|할인|면제|무료|공제/.test(text)) return 'discount';
  if (/\d\s*(원|만|억)/.test(text)) return 'cash';
  return 'service';
}

/** 금액 문구의 첫 금액(원). 금액순 정렬·큰 지원금 고르기용. */
export function parseAmount(str: string): number {
  const eokMatch = str.match(/([\d,.]+)\s*억/);
  if (eokMatch) return parseFloat(eokMatch[1].replace(/,/g, '')) * 100_000_000;

  const manMatch = str.match(/([\d,.]+)\s*만(?:\s*([\d,]+))?/);
  if (manMatch) {
    const manPart = parseFloat(manMatch[1].replace(/,/g, '')) || 0;
    const restPart = manMatch[2] ? parseInt(manMatch[2].replace(/,/g, ''), 10) || 0 : 0;
    return manPart * 10_000 + restPart;
  }

  const won = str.match(/([\d,]+)\s*원/);
  return won ? parseInt(won[1].replace(/,/g, ''), 10) || 0 : 0;
}

/** '총 480만원'처럼 전체 금액이 적혀 있으면 그것을, 없으면 첫 금액을 쓴다. */
export function totalAmount(str: string): number {
  const total = str.match(/총\s*([\d,.]+\s*(?:억|만)?\s*원?)/);
  return total ? parseAmount(total[1]) : parseAmount(str);
}
