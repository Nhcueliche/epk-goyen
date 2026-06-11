// Verifica la sección Música con las URLs reales + link al Drive.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812 });
await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });

const r = [];
const check = (name, cond) => r.push(`${cond ? 'PASS' : 'FAIL'} ${name}`);

check('sección música visible', await page.$eval('#musica', (el) => !el.hidden));
check('CTA escuchar sets visible', await page.$eval('#hero-cta-sets', (el) => !el.hidden));
check('nav link música visible', await page.$eval('[data-section-link="musica"]', (el) => el.style.display !== 'none'));
check('sin h3 vacíos', await page.$$eval('#sets-list .set-title', (els) => els.length === 0));

await page.evaluate(() => document.getElementById('musica').scrollIntoView());
await new Promise((res) => setTimeout(res, 2500));
const frames = await page.$$eval('#sets-list iframe', (els) => els.map((f) => f.src));
check('embed soundcloud', frames.some((s) => s.includes('w.soundcloud.com') && s.includes('sebass-goyen%2Fhard-hard-set-grabado')));
check('embed youtube', frames.some((s) => s === 'https://www.youtube-nocookie.com/embed/mBuZgPcVb2I'));
const links = await page.$$eval('#sets-list .gy-linkrow', (els) => els.map((a) => a.href));
check('links directos (2)', links.length === 2);
check('link drive visible', await page.$eval('#photos-pack', (el) => !el.hidden && el.href.includes('drive.google.com')));

// captura de la sección música para revisión visual
await page.screenshot({ path: 'shot-musica.png', fullPage: false });
console.log(r.join('\n'));
await browser.close();
process.exit(r.some((x) => x.startsWith('FAIL')) ? 1 : 0);
