type Params = Record<string, string | number | boolean | null | undefined>;

/** 로깅 실패가 앱 동작(외부 링크 이동 등)을 막지 않도록 모두 삼킨다. */
export function logClick(log_name: string, params: Params = {}): void {
  void import('@apps-in-toss/web-framework')
    .then(({ Analytics }) => Analytics.click({ log_name, ...params }))
    .catch(() => {});
}
