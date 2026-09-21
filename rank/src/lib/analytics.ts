import { Analytics } from '@apps-in-toss/web-framework';

type Params = Record<string, string | number | boolean | null | undefined>;

/** 로깅 실패가 앱 동작을 막지 않도록 모두 삼킨다. */
function safe(fn: () => unknown) {
  try {
    void fn();
  } catch {
    /* ignore */
  }
}

export function logImpression(log_name: string, params: Params = {}) {
  safe(() => Analytics.impression({ log_name, ...params }));
}

export function logClick(log_name: string, params: Params = {}) {
  safe(() => Analytics.click({ log_name, ...params }));
}
