const { chromium } = require('/home/deploy/.claude/skills/tistory-benefit/renderer/node_modules/playwright-core');
const fs = require('fs');
const D = __dirname;
const FONT = fs.readFileSync(D + '/fonts/PretendardVariable.woff2').toString('base64');
const img = (n) => 'data:image/png;base64,' + fs.readFileSync(D + '/shots/' + n + '.png').toString('base64');
// app 좌표(390 기준 css px). top = 카드에 보일 앱 화면의 시작 y.
const SLIDES = JSON.parse(fs.readFileSync(D + '/slides.json', 'utf8'));
const CARD_W = 282, SCALE = CARD_W / 390, CARD_TOP = 168;
const html = (s) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:PV;src:url(data:font/woff2;base64,${FONT}) format('woff2');font-weight:45 920}
*{margin:0;padding:0;box-sizing:border-box}
body{width:318px;height:524px;overflow:hidden;font-family:PV;background:${s.bg||'linear-gradient(180deg,#EAF2FF 0%,#F5F8FF 55%,#FFFFFF 100%)'};position:relative;letter-spacing:-0.02em}
.top{position:absolute;top:34px;left:0;right:0;text-align:center}
.eyebrow{display:inline-block;font-size:11px;font-weight:700;color:#3182F6;background:#fff;border-radius:99px;padding:4px 10px;margin-bottom:10px;box-shadow:0 1px 4px rgba(49,130,246,.12)}
h1{font-size:25px;line-height:1.3;font-weight:800;color:#191F28;white-space:pre-line}
h1 b{color:#3182F6;font-weight:800}
p{margin-top:9px;font-size:12.5px;color:#4E5968;font-weight:600;white-space:pre-line;line-height:1.45}
.card{position:absolute;left:${(318-CARD_W)/2}px;top:${CARD_TOP}px;width:${CARD_W}px;height:${524-CARD_TOP+30}px;border-radius:26px;overflow:hidden;background:#fff;box-shadow:0 10px 30px rgba(30,60,120,.16);border:5px solid #fff}
.card img{position:absolute;left:0;width:${CARD_W-10}px}
.hl{position:absolute;border:2.5px solid #3182F6;border-radius:12px;background:rgba(49,130,246,.07);box-shadow:0 0 0 4px rgba(49,130,246,.15)}
.tag{position:absolute;background:#3182F6;color:#fff;font-size:10.5px;font-weight:700;padding:4px 9px;border-radius:99px;white-space:nowrap;box-shadow:0 3px 8px rgba(49,130,246,.35)}
</style></head><body>
<div class="top">${s.eyebrow?`<div class="eyebrow">${s.eyebrow}</div><br>`:''}<h1>${s.title}</h1><p>${s.sub}</p></div>
<div class="card">
<img src="${img(s.shot)}" style="top:${-s.top*(CARD_W-10)/390}px">
${(s.hl||[]).map(h=>{const k=(CARD_W-10)/390;return `<div class="hl" style="left:${h.x*k-3}px;top:${(h.y-s.top)*k-3}px;width:${h.w*k+6}px;height:${h.h*k+6}px"></div>`+(h.tag?`<div class="tag" style="${h.tagRight?'right:'+(CARD_W-10-(h.x+h.w)*k)+'px':'left:'+(h.x*k)+'px'};top:${(h.y-s.top)*k+(h.below?h.h*k+8:-26)}px">${h.tag}</div>`:'')}).join('')}
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/home/deploy/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 318, height: 524 }, deviceScaleFactor: 2 });
  fs.mkdirSync(D + '/out', { recursive: true });
  for (const [i, s] of SLIDES.entries()) {
    await p.setContent(html(s)); await p.waitForTimeout(400);
    await p.screenshot({ path: `${D}/out/s${i+1}.png` });
  }
  await b.close();
})();
