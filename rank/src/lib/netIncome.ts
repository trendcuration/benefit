/**
 * 연 세전 소득(만원) → 연 세후(실수령) 소득(만원) 근사치.
 *
 * '진짜내월급' 앱(realpay, src/domain/calculator.ts·rates2026.ts)의 계산 로직을 그대로
 * 가져왔다 — 4대보험(국민연금·건강보험·장기요양·고용보험) + 근로소득공제·기본공제로
 * 과세표준 산출 + 종합소득세 브라켓 + 근로소득세액공제까지 반영한 근사치다. 국세청
 * 간이세액표의 완전한 재현은 아니라 실제 원천징수액과 다를 수 있다(화면에 고지 필요).
 *
 * 이 앱에서는 부양가족 수·식대 등 세부 입력을 받지 않으므로 본인 1인·식대 20만원
 * (비과세 한도)으로 고정한 단순화 버전이다.
 */

const NATIONAL_PENSION_RATE = 0.0475;
const NATIONAL_PENSION_INCOME_CAP = 6_590_000;
const NATIONAL_PENSION_INCOME_FLOOR = 410_000;
const HEALTH_INSURANCE_RATE = 0.03595;
const LONG_TERM_CARE_RATE_OF_HEALTH = 0.1314;
const EMPLOYMENT_INSURANCE_RATE = 0.009;
const MEAL_ALLOWANCE_TAX_FREE_LIMIT = 200_000;
const LOCAL_INCOME_TAX_RATE = 0.1;
const BASIC_DEDUCTION_PER_PERSON = 1_500_000;

const EARNED_INCOME_DEDUCTION_BRACKETS = [
  { floor: 0, baseDeduction: 0, rate: 0.7 },
  { floor: 5_000_000, baseDeduction: 3_500_000, rate: 0.4 },
  { floor: 15_000_000, baseDeduction: 7_500_000, rate: 0.15 },
  { floor: 45_000_000, baseDeduction: 12_000_000, rate: 0.05 },
  { floor: 100_000_000, baseDeduction: 14_750_000, rate: 0.02 },
];

const INCOME_TAX_BRACKETS = [
  { floor: 0, baseTax: 0, rate: 0.06 },
  { floor: 14_000_000, baseTax: 840_000, rate: 0.15 },
  { floor: 50_000_000, baseTax: 6_240_000, rate: 0.24 },
  { floor: 88_000_000, baseTax: 15_360_000, rate: 0.35 },
  { floor: 150_000_000, baseTax: 37_060_000, rate: 0.38 },
  { floor: 300_000_000, baseTax: 94_060_000, rate: 0.4 },
  { floor: 500_000_000, baseTax: 174_060_000, rate: 0.42 },
  { floor: 1_000_000_000, baseTax: 384_060_000, rate: 0.45 },
];

function earnedIncomeTaxCreditCap(annualGrossSalary: number): number {
  if (annualGrossSalary <= 33_000_000) return 740_000;
  if (annualGrossSalary <= 70_000_000) {
    return Math.max(740_000 - (annualGrossSalary - 33_000_000) * 0.008, 660_000);
  }
  return Math.max(660_000 - (annualGrossSalary - 70_000_000) * 0.5, 500_000);
}

function applyBrackets(
  amount: number,
  brackets: ReadonlyArray<{ floor: number; baseDeduction?: number; baseTax?: number; rate: number }>,
): number {
  if (amount <= 0) return 0;
  let bracket = brackets[0]!;
  for (const b of brackets) {
    if (amount >= b.floor) bracket = b;
    else break;
  }
  const base = bracket.baseDeduction ?? bracket.baseTax ?? 0;
  return base + (amount - bracket.floor) * bracket.rate;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** 월 세전소득(원) → 연 세후소득(원). 본인 1인 기준·식대 20만원 가정. */
function annualNetIncomeWon(grossMonthlyWon: number): number {
  const taxable = Math.max(grossMonthlyWon - MEAL_ALLOWANCE_TAX_FREE_LIMIT, 0);

  const nationalPension = clamp(taxable, NATIONAL_PENSION_INCOME_FLOOR, NATIONAL_PENSION_INCOME_CAP) * NATIONAL_PENSION_RATE;
  const healthInsurance = taxable * HEALTH_INSURANCE_RATE;
  const longTermCare = healthInsurance * LONG_TERM_CARE_RATE_OF_HEALTH;
  const employmentInsurance = taxable * EMPLOYMENT_INSURANCE_RATE;

  const annualGrossSalary = taxable * 12;
  const earnedIncomeDeduction = applyBrackets(annualGrossSalary, EARNED_INCOME_DEDUCTION_BRACKETS);
  const earnedIncomeAmount = Math.max(annualGrossSalary - earnedIncomeDeduction, 0);
  const taxBase = Math.max(earnedIncomeAmount - BASIC_DEDUCTION_PER_PERSON, 0);
  const grossTax = applyBrackets(taxBase, INCOME_TAX_BRACKETS);
  const rawCredit = grossTax <= 1_300_000 ? grossTax * 0.55 : 715_000 + (grossTax - 1_300_000) * 0.3;
  const credit = Math.min(rawCredit, earnedIncomeTaxCreditCap(annualGrossSalary));
  const annualIncomeTax = Math.max(grossTax - credit, 0);
  const incomeTax = annualIncomeTax / 12;
  const localIncomeTax = incomeTax * LOCAL_INCOME_TAX_RATE;

  const totalDeduction = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;
  const netMonthly = Math.max(grossMonthlyWon - totalDeduction, 0);
  return netMonthly * 12;
}

/** 연 세전소득(만원) → 연 세후소득(만원) 근사치. */
export function estimateAnnualNetIncomeManwon(annualGrossManwon: number): number {
  if (annualGrossManwon <= 0) return 0;
  const grossMonthlyWon = (annualGrossManwon * 10_000) / 12;
  return Math.round(annualNetIncomeWon(grossMonthlyWon) / 10_000);
}
