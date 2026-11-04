const { chromium } = require('/home/deploy/.claude/skills/tistory-benefit/renderer/node_modules/playwright-core');
const fs = require('fs');
const OUT = __dirname + '/shots/';
const FONT = fs.readFileSync(__dirname + '/fonts/PretendardVariable.woff2').toString('base64');
const CSS = `@font-face{font-family:'PV';src:url(data:font/woff2;base64,${FONT}) format('woff2');font-weight:45 920;}
*{font-family:'PV',sans-serif !important;}`;
const HIDE = () => {
  for (const el of [...document.querySelectorAll('body *')]) {
    if (el.children.length) continue;
    const t = (el.textContent||'').trim();
    if (t.startsWith('[@apps-in-toss/devtools]')) {
      let a = el; while (a.parentElement && a.parentElement.textContent.trim() === t) a = a.parentElement;
      a.style.display = 'none';
    }
  }
  for (const el of [...document.querySelectorAll('body *')]) {
    const cs = getComputedStyle(el); const t = (el.textContent||'').trim();
    if (cs.position === 'fixed' && /^(AIT|Ads)/.test(t) && t.length < 80) el.style.display = 'none';
  }
};
const step = process.argv[2];
(async () => {
  const b = await chromium.launch({ executablePath: '/home/deploy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, locale: 'ko-KR' });
  const today = new Date().toISOString().slice(0,10);
  await ctx.addInitScript((today) => {
    localStorage.setItem('benefit:search-params', JSON.stringify({ birthYear: 1993, gender: '전체', sido: '서울', sidoName: '서울특별시', sgg: '마포구' }));
    localStorage.setItem('benefit:cross-promo-date', today);
  }, today);
  const p = await ctx.newPage();
  const shot = async (n) => { await p.addStyleTag({ content: CSS }); await p.evaluate(HIDE); await p.waitForTimeout(600); await p.screenshot({ path: OUT + n + '.png' }); console.log('shot', n); };
  await p.goto('http://127.0.0.1:4317/'); await p.waitForTimeout(3000);
  await p.getByRole('button', { name: /찾기|확인|보기/ }).last().click();
  await p.waitForTimeout(4500);
  await p.addStyleTag({ content: CSS }); await p.evaluate(HIDE); await p.waitForTimeout(600);
  await p.screenshot({ path: OUT + 'b-full.png', clip: { x: 0, y: 0, width: 390, height: 1400 }, fullPage: true }); console.log('shot b-full');
  await p.getByText('📍 마포구').first().click(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && e.textContent.trim().startsWith('마포구에서 직접')); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 120); });
  await shot('c-local2');
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.getByText('전체', { exact: true }).first().click(); await p.waitForTimeout(800);
  await p.getByPlaceholder(/지원금 검색/).fill('청년'); await p.waitForTimeout(1500);
  const hearts = p.getByLabel('찜하기'); await hearts.nth(0).click(); await hearts.nth(1).click(); await hearts.nth(2).click();
  await p.waitForTimeout(800);
  await p.evaluate(() => { const el=document.querySelector('input'); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 140); });
  await shot('f-search');
  await b.close();
})();
