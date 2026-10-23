import { Review } from '@apps-in-toss/web-framework';
import { logClick } from './analytics';

/**
 * 토스 기본 별점 화면을 요청한다. 우리 쪽 안내 시트는 두지 않는다 — 토스가 피로도 정책·이미 리뷰한 사용자 등으로
 * 화면을 띄우지 않을 때도 Promise가 그냥 resolve돼서, 안내 시트의 "별점 남기기"를 눌러도 아무 일도 없는 것처럼
 * 보였다(2026-10-23 테스트에서 확인). 노출 여부와 무관하게 앱 흐름은 그대로 이어진다.
 */
export function requestTossReview(): void {
  logClick('review_request_call');
  try {
    if (Review.request.isSupported()) {
      Review.request().catch(() => logClick('review_request_error'));
    } else {
      logClick('review_request_unsupported');
    }
  } catch {
    logClick('review_request_error');
  }
}
