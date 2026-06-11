// Verifica los renders hoy ocultos (sets, trayectoria) con datos de prueba.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812 });
await page.goto('http://localhost:8123/', { waitUntil: 'networkidle0' });

const out = await page.evaluate(async () => {
  const r = [];
  const check = (name, cond) => r.push(`${cond ? 'PASS' : 'FAIL'} ${name}`);

  renderSets([
    { titulo: 'Live @ BES 04', plataforma: 'soundcloud', url: 'https://soundcloud.com/test/set' },
    { titulo: 'b2b @ TekGen', plataforma: 'youtube', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { titulo: '[FALTA]', plataforma: 'soundcloud', url: '[FALTA]' },
  ]);
  check('sección música visible', !document.getElementById('musica').hidden);
  check('2 sets válidos renderizados (el [FALTA] se omite)',
    document.querySelectorAll('#sets-list .set-item').length === 2);
  check('CTA escuchar sets visible', !document.getElementById('hero-cta-sets').hidden);
  check('link directo visible', !!document.querySelector('#sets-list .gy-linkrow'));

  // scroll para disparar el IntersectionObserver de los embeds
  document.getElementById('musica').scrollIntoView();
  await new Promise((res) => setTimeout(res, 400));
  const iframes = [...document.querySelectorAll('#sets-list iframe')];
  check('embeds inyectados lazy (2)', iframes.length === 2);
  check('embed soundcloud con color del acento', iframes[0]?.src.includes('w.soundcloud.com') && iframes[0]?.src.includes('170eff'));
  check('embed youtube nocookie con id', iframes[1]?.src === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');

  renderTrayectoria([
    { fecha: '2025-03-01', evento: 'Viejo', venue: 'V1', ciudad: 'CABA' },
    { fecha: '2025-11-15', evento: 'Nuevo', venue: 'V2', ciudad: 'BsAs' },
    { fecha: '', evento: '', venue: '', ciudad: '' },
  ]);
  check('sección trayectoria visible', !document.getElementById('trayectoria').hidden);
  const eventos = [...document.querySelectorAll('#timeline .t-evento')].map((e) => e.textContent);
  check(`orden fecha desc (${eventos.join(',')})`, eventos.join(',') === 'Nuevo,Viejo');

  return r;
});

console.log(out.join('\n'));
await browser.close();
process.exit(out.some((r) => r.startsWith('FAIL')) ? 1 : 0);
