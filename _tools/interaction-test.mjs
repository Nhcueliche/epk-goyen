// Test funcional rápido: lightbox + validación del form.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812 });
await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });

const results = [];
const check = (name, cond) => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}`);

// Lightbox
await page.click('.photo-cell');
check('lightbox abre', await page.$eval('.lightbox', (el) => !el.hidden));
check('foco en cerrar', await page.evaluate(() => document.activeElement?.dataset.lb === 'close'));
const c1 = await page.$eval('.lightbox-counter', (el) => el.textContent);
await page.keyboard.press('ArrowRight');
const c2 = await page.$eval('.lightbox-counter', (el) => el.textContent);
check(`flecha navega (${c1} -> ${c2})`, c1 !== c2);
await page.keyboard.press('Escape');
check('Esc cierra', await page.$eval('.lightbox', (el) => el.hidden));
check('foco vuelve al opener', await page.evaluate(() => document.activeElement?.classList.contains('photo-cell')));

// Form: vacío => errores
await page.click('#form-submit');
check('error nombre visible', await page.$eval('#err-nombre', (el) => !el.hidden));
check('aria-invalid en email', await page.$eval('#f-email', (el) => el.getAttribute('aria-invalid') === 'true'));

// Form completo sin access key => aviso de configuración
await page.type('#f-nombre', 'Test Venue');
await page.type('#f-email', 'test@venue.com');
await page.type('#f-mensaje', 'Fecha en CABA');
await page.click('#form-submit');
const status = await page.$eval('#form-status', (el) => el.textContent);
check(`aviso sin key ("${status}")`, status.includes('no está configurado'));

// Copy button del email no debería existir visible (email [FALTA])
check('fila email oculta', await page.$eval('#contact-email-row', (el) => el.hidden));

console.log(results.join('\n'));
await browser.close();
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
