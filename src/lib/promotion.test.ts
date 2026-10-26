import { describe, expect, it } from 'vitest';
import { MAX_MISSION_TIERS, pickMaxMissionAmount } from './promotion';

describe("'최대 1,000원' 미션 지급액", () => {
  it('확률 합이 1이고 최대 1,000원을 넘지 않는다', () => {
    const sum = MAX_MISSION_TIERS.reduce((a, t) => a + t.chance, 0);
    expect(sum).toBeCloseTo(1, 10);
    expect(Math.max(...MAX_MISSION_TIERS.map((t) => t.amount))).toBe(1000);
  });

  it('구간 경계대로 금액을 고른다', () => {
    expect(pickMaxMissionAmount(0)).toBe(1000);
    expect(pickMaxMissionAmount(0.0009)).toBe(1000);
    expect(pickMaxMissionAmount(0.001)).toBe(10);
    expect(pickMaxMissionAmount(0.0499)).toBe(10);
    expect(pickMaxMissionAmount(0.05)).toBe(1);
    expect(pickMaxMissionAmount(0.999999)).toBe(1);
  });

  it('기댓값은 약 2.4원', () => {
    const ev = MAX_MISSION_TIERS.reduce((a, t) => a + t.amount * t.chance, 0);
    expect(ev).toBeCloseTo(2.44, 2);
  });
});
