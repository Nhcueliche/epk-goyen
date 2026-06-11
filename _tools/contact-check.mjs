// Verifica las filas de contacto con los datos reales.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
const ctx = browser.defaultBrowserContext();
await ctx.overridePermissions('http://localhost:8123', ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
await page.setViewport({ width: 375, height: 812 });
await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });

const r = [];
const check = (name, cond) => r.push(`${cond ? 'PASS' : 'FAIL'} ${name}`);

check('fila email visible', await page.$eval('#contact-email-row', (el) => !el.hidden));
check('mailto correcto', await page.$eval('#contact-email-link', (el) =>
  el.textContent === 'sebastian.bartaburu@gmail.com' && el.href === 'mailto:sebastian.bartaburu@gmail.com'));
check('fila IG visible', await page.$eval('#contact-ig-row', (el) => !el.hidden));
check('IG link correcto', await page.$eval('#contact-ig-link', (el) =>
  el.textContent === '@sebass_goyen' && el.href === 'https://instagram.com/sebass_goyen'));
check('disponibilidad sigue oculta ([FALTA])', await page.$eval('#booking-disponibilidad', (el) => el.hidden));

await page.click('#contact-email-copy');
await new Promise((res) => setTimeout(res, 200));
check('botón copiar -> "copiado"', await page.$eval('#contact-email-copy', (el) => el.textContent === 'copiado'));
const clip = await page.evaluate(() => navigator.clipboard.readText());
check('clipboard contiene el email', clip === 'sebastian.bartaburu@gmail.com');

console.log(r.join('\n'));
await browser.close();
process.exit(r.some((x) => x.startsWith('FAIL')) ? 1 : 0);
