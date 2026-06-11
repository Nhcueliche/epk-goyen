// Captura el sitio local para verificación visual (375px y desktop).
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

for (const [name, w, h] of [['mobile-375', 375, 812], ['desktop-1366', 1366, 900]]) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `shot-${name}.png`, fullPage: true });
  console.log(`shot-${name}.png ok`);
}
console.log('console errors:', errors.length ? errors : 'none');
await browser.close();
