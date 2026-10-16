/**
 * 화면 위에 덧씌우는 화면(지원금 상세 등)이 시스템 뒤로가기를 먼저 받아 스스로 닫히게 하는 스택.
 * App의 backEvent 처리기가 여기부터 확인하고, 비어 있을 때만 화면 단계(results→filter→종료)를 되돌린다.
 */
const handlers: (() => void)[] = [];

export function pushBackHandler(handler: () => void): () => void {
  handlers.push(handler);
  return () => {
    const i = handlers.lastIndexOf(handler);
    if (i >= 0) handlers.splice(i, 1);
  };
}

/** 등록된 처리기가 있으면 가장 마지막 것을 실행하고 true를 돌려준다. */
export function popBackHandler(): boolean {
  const handler = handlers[handlers.length - 1];
  if (!handler) return false;
  handler();
  return true;
}
