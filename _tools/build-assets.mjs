/**
 * GOYEN EPK · asset pipeline
 * Genera desde design-export/:
 *  - fotos hero + grilla en WebP (q80) con fallback JPEG
 *  - wordmark GOYEN PNG transparente (blanco y azul eléctrico) desde Archivo Black
 *  - og-image 1200x630 con duotono azul horneado (solo para crawlers)
 *  - favicons desde el wordmark
 * Uso: node build-assets.mjs   (desde _tools/)
 */
import sharp from 'sharp';
import opentype from 'opentype.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const SRC = path.join(root, 'design-export', 'project');
const IMG = path.join(root, 'assets', 'img');
const BRAND = path.join(root, 'assets', 'brand');

// Tokens del design system (colors.css)
const INK_VOID = { r: 1, g: 1, b: 8 };          // #010108
const ELECTRIC = { r: 23, g: 14, b: 255 };      // #170EFF
const WHITE = '#FAFAFA';
const ELECTRIC_HEX = '#170EFF';

const portrait = path.join(SRC, 'uploads', 'IMG_2052.jpeg');       // master del retrato
const live = path.join(SRC, 'assets', 'photos', 'goyen-live.jpeg'); // foto cabina

const fontBuf = fs.readFileSync(path.join(here, 'ArchivoBlack-Regular.ttf'));
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));

/** SVG path del texto en Archivo Black, tracking -0.01em como --tracking-display. */
function textSvg(text, fontSize, fill) {
  const p = font.getPath(text, 0, 0, fontSize, { kerning: true, letterSpacing: -0.01 });
  const bb = p.getBoundingBox();
  const w = Math.ceil(bb.x2 - bb.x1), h = Math.ceil(bb.y2 - bb.y1);
  const d = font
    .getPath(text, -bb.x1, -bb.y1, fontSize, { kerning: true, letterSpacing: -0.01 })
    .toPathData(2);
  return {
    w, h,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d}" fill="${fill}"/></svg>`,
  };
}

async function photoSet(srcFile, baseName, widths, fallbackWidth, { normalize = false } = {}) {
  const meta = await sharp(srcFile).metadata();
  const base = (w) => {
    let p = sharp(srcFile).resize({ width: w });
    if (normalize) p = p.normalize(); // fotos muy oscuras: estirar histograma antes del duotono CSS
    return p;
  };
  for (const w of widths) {
    if (w > meta.width) continue; // no upscale
    await base(w).webp({ quality: 80 }).toFile(path.join(IMG, `${baseName}-${w}.webp`));
  }
  const fw = Math.min(fallbackWidth, meta.width);
  await base(fw).jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(IMG, `${baseName}-${fw}.jpg`));
  console.log(`${baseName}: src ${meta.width}x${meta.height} ->`, widths.filter(w => w <= meta.width).join('/'), `+ jpg ${fw}`);
}

/** Duotono horneado (solo para og-image): grayscale -> lineal por canal void->electric. */
function duotone(pipeline) {
  const lum = [0.2126, 0.7152, 0.0722];
  return pipeline.recomb([lum, lum, lum]).linear(
    [(ELECTRIC.r - INK_VOID.r) / 255, (ELECTRIC.g - INK_VOID.g) / 255, (ELECTRIC.b - INK_VOID.b) / 255],
    [INK_VOID.r, INK_VOID.g, INK_VOID.b],
  );
}

async function main() {
  fs.mkdirSync(IMG, { recursive: true });
  fs.mkdirSync(BRAND, { recursive: true });

  // --- Fotos (el duotono va por CSS, acá solo resize/compresión) ---
  await photoSet(portrait, 'goyen-hero', [800, 1280, 2000], 1280);
  await photoSet(portrait, 'foto-01', [480, 960, 1600], 960);
  await photoSet(live, 'foto-02', [480, 960, 1600], 960, { normalize: true });

  // --- Wordmark PNG transparente (blanco y azul) ---
  for (const [name, fill] of [['goyen-wordmark-white', WHITE], ['goyen-wordmark-blue', ELECTRIC_HEX]]) {
    const { svg } = textSvg('GOYEN', 360, fill);
    await sharp(Buffer.from(svg)).png().toFile(path.join(BRAND, `${name}.png`));
  }
  console.log('wordmarks ok');

  // --- OG image 1200x630: foto duotono + wordmark + banda técnica ---
  const ogPhoto = await duotone(
    sharp(portrait).resize(1200, 630, { fit: 'cover', position: 'attention' }),
  ).toBuffer();
  const mark = textSvg('GOYEN', 150, WHITE);
  const og = sharp(ogPhoto).composite([
    {
      // scrim inferior para que el texto siempre gane (gy-photo-scrim)
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#010108" stop-opacity="0"/><stop offset="1" stop-color="#010108" stop-opacity="0.92"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`,
      ),
      top: 0, left: 0,
    },
    { input: Buffer.from(mark.svg), top: 630 - mark.h - 110, left: 64 },
    {
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="40"><text x="0" y="28" font-family="monospace" font-size="26" letter-spacing="8" fill="#AEB6FF">HARD TECHNO / INDUSTRIAL — BUENOS AIRES, AR</text></svg>`,
      ),
      top: 630 - 70, left: 66,
    },
  ]);
  await og.jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(IMG, 'og-goyen.jpg'));
  console.log('og-image ok');

  // --- Favicons: "G" Archivo Black blanco sobre void ---
  const g = textSvg('G', 400, WHITE);
  const pad = Math.round(Math.max(g.w, g.h) * 0.22);
  const side = Math.max(g.w, g.h) + pad * 2;
  const tile = sharp({
    create: { width: side, height: side, channels: 4, background: { r: 1, g: 1, b: 8, alpha: 1 } },
  }).composite([{ input: Buffer.from(g.svg), top: Math.round((side - g.h) / 2), left: Math.round((side - g.w) / 2) }]);
  const tileBuf = await tile.png().toBuffer();
  for (const [name, px] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['apple-touch-icon.png', 180]]) {
    await sharp(tileBuf).resize(px, px).png().toFile(path.join(BRAND, name));
  }
  // favicon.svg con el path embebido (sin dependencia de fuente)
  const gp = font.getPath('G', 0, 0, 400, { kerning: true });
  const bb = gp.getBoundingBox();
  const d = font.getPath('G', pad - bb.x1, pad - bb.y1, 400).toPathData(2);
  fs.writeFileSync(
    path.join(BRAND, 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}"><rect width="${side}" height="${side}" fill="#010108"/><path d="${d}" fill="${WHITE}"/></svg>`,
  );
  console.log('favicons ok');
}

main().catch((e) => { console.error(e); process.exit(1); });
