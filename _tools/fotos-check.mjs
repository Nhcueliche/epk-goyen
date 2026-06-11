// Captura la sección de fotos (grilla en color natural + 3 fotos).
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 900 });
await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });

const cells = await page.$$eval('.photo-cell', (els) => els.length);
const duotones = await page.$$eval('#photo-grid .gy-duotone', (els) => els.length);
console.log(`celdas: ${cells} | duotonos en grilla: ${duotones}`);

await page.evaluate(() => document.getElementById('fotos').scrollIntoView());
await new Promise((r) => setTimeout(r, 800));
const el = await page.$('#fotos');
await el.screenshot({ path: 'shot-fotos.png' });
console.log('shot-fotos.png ok');
await browser.close();
