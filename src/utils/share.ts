// 결과 공유 — 토스 네이티브 공유 시트 우선, 브라우저 환경에서는 Web Share/클립보드로 폴백
export async function shareMessage(message: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    const { share, getTossShareLink } = await import('@apps-in-toss/web-framework');
    const link = await getTossShareLink('intoss://benefit').catch(() => null);
    await share({ message: link ? `${message}\n${link}` : message });
    return 'shared';
  } catch {
    // 토스 앱 외부(로컬 개발 등) 폴백
  }

  try {
    if (navigator.share) {
      await navigator.share({ text: message });
      return 'shared';
    }
  } catch {
    return 'failed';
  }

  try {
    await navigator.clipboard.writeText(message);
    return 'copied';
  } catch {
    return 'failed';
  }
}
