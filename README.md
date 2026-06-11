# GOYEN — EPK / Presskit electrónico

Landing one-page estática del DJ **GOYEN** (Hard / Industrial Techno, Buenos Aires).
HTML + CSS + JavaScript vanilla. Sin frameworks, sin build step, sin backend.
Diseño basado en el design system de `design-export/` (fuente de verdad de tokens y componentes).

## Probar en local

Desde la raíz del proyecto, cualquiera de estos:

```
npx serve .
# o, si tenés Python:
python3 -m http.server 8000
```

Y abrir `http://localhost:3000` (serve) o `http://localhost:8000` (Python).
**Tiene que ser por servidor** — abrir `index.html` con doble click no funciona porque
`main.js` carga `content.json` con `fetch()`.

## Estructura

```
/index.html              página (SEO del <head> hardcodeado acá)
/content.json            TODO el contenido editable vive acá
/css/styles.css          tokens del design system + estilos
/js/main.js              carga content.json y rellena el DOM
/assets/img/             fotos optimizadas (WebP + fallback JPEG) + og-image
/assets/fonts/           Archivo / Archivo Black / Space Mono (woff2 self-hosteadas)
/assets/brand/           wordmark GOYEN PNG (blanca y azul) + favicons
/assets/presskit-goyen.pdf
/design-export/          export original de Claude Design (referencia, no se sirve)
/_tools/                 pipeline de assets (node _tools/build-assets.mjs)
```

---

## Cómo editar el contenido

Todo el contenido vive en **`content.json`**. No hace falta tocar HTML ni CSS.

1. Abrí el repo en GitHub.
2. Entrá a `content.json` → botón del lápiz (**Edit this file**).
3. Editá → **Commit changes**.
4. Cloudflare Pages redeploya solo (~1 minuto).

**Regla:** si un campo está vacío o dice `[FALTA]`, esa sección o elemento
**se oculta automáticamente** — nunca se muestra un placeholder roto.

### Ejemplo: agregar un set nuevo

En el array `"sets"`, agregá un objeto (ojo con la coma entre objetos):

```json
"sets": [
  {
    "titulo": "GOYEN — Live @ BES 04",
    "plataforma": "soundcloud",
    "url": "https://soundcloud.com/goyen/live-bes-04"
  },
  {
    "titulo": "GOYEN b2b @ TekGen",
    "plataforma": "youtube",
    "url": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  }
]
```

El embed (reproductor de SoundCloud / YouTube) se genera solo a partir de la URL,
con lazy-load, y debajo siempre aparece el link directo.
Plataformas soportadas para embed: `soundcloud` y `youtube` (otra plataforma
muestra solo el link directo).

### Ejemplo: agregar una fecha a trayectoria

En el array `"trayectoria"` (usar fecha `AAAA-MM-DD` para que ordene bien —
se muestran de más reciente a más vieja):

```json
"trayectoria": [
  { "fecha": "2025-11-15", "evento": "BES 05", "venue": "Club XXX", "ciudad": "Buenos Aires" },
  { "fecha": "2025-08-02", "evento": "TekGen Showcase", "venue": "Sala YYY", "ciudad": "CABA" }
]
```

### Otros campos

- `identidad.bpm`: solo el rango, ej. `"150-165"` (el sitio agrega "BPM").
- `fotos[]`: para sumar una foto, subila a `assets/img/` y agregá
  `{ "src": "assets/img/foto-03.webp", "alt": "descripción de la foto" }`.
  `srcset` y `fallback` son opcionales (mejoran performance si los generás con
  `node _tools/build-assets.mjs`). El duotono azul se aplica por CSS, **subí la foto original**, no la editada.
- `contacto.instagram`: con o sin `@`, ej. `"@goyen"`.

---

## Cómo deployar en Cloudflare Pages

1. Crear cuenta gratis en [dash.cloudflare.com](https://dash.cloudflare.com) y subir este repo a GitHub.
2. En el dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Autorizar GitHub y seleccionar el repo.
4. Configuración de build:
   - **Framework preset:** `None`
   - **Build command:** (vacío)
   - **Build output directory:** `/`
5. **Save and Deploy**.

Resultado: el sitio queda en `https://goyen.pages.dev` (el subdominio sale del
nombre del proyecto). Cada push a la rama principal redeploya solo.

> Si el subdominio final NO es `goyen.pages.dev`, actualizá las URLs absolutas
> del `<head>` de `index.html` (`og:url`, `og:image`, `twitter:image`, `canonical`).

## Cómo conectar un dominio propio después

1. **Cloudflare Registrar:** en el dashboard → **Domain Registration → Register domain**,
   comprar el dominio (ej. `goyen.com.ar` se registra fuera de Cloudflare; un `.com`/`.dj` sí se puede ahí).
2. **Workers & Pages → tu proyecto → Custom domains → Set up a custom domain** → escribir el dominio.
3. Cloudflare configura DNS y SSL automáticamente (si el dominio está en otra parte, te indica el CNAME a crear).
4. Actualizar las URLs absolutas del `<head>` de `index.html` al dominio nuevo.

---

## Decisiones tomadas (ambigüedades resueltas)

- **Tipografías self-hosteadas en vez de Google Fonts:** el brief pedía Google Fonts, pero
  también pedía Lighthouse Performance ≥ 90 como requisito no negociable, y ambas cosas
  entraron en conflicto: la cadena cross-origin de Google Fonts (CSS + woff2) llevaba el
  score simulado mobile a 82. Con las mismas woff2 que ya trae el design system
  (`assets/fonts/`, `font-display: swap` + preload de las tres críticas) el score es
  **99 / 100 / 100 / 100** (Perf / A11y / BP / SEO). Mismas familias, misma licencia (OFL),
  cero dependencia externa. Para volver a Google Fonts: borrar los `@font-face` del inicio
  de `css/styles.css` y los `<link rel="preload" as="font">` del `<head>`, y agregar el
  `<link>` de Google Fonts.
- **Texto en color acento:** el azul eléctrico `#170EFF` como color *de texto* sobre fondo
  oscuro no pasa contraste AA (~2.2:1). Siguiendo la regla de accesibilidad del brief, el
  eléctrico saturado quedó reservado para **superficies (botones), bordes, glow y los ghosts
  del glitch** (decorativos, detrás de la cara blanca); el texto con intención de acento usa
  `--blue-haze #AEB6FF` (token del sistema, ~9:1). Aplica al título del panel del rider, al
  índice de los section labels y a estados hover/copied.
- **Focus ring:** `--blue-electric-bright #4A43FF` en vez de `#170EFF` para cumplir 3:1 de
  contraste no-textual sobre los fondos ink.
- **Foto de cabina (`foto-02`):** la única versión disponible en el export ya venía con el
  duotono horneado (`goyen-live.jpeg`). El tratamiento CSS (grayscale + multiply) la normaliza
  igual que al resto, así que se ve consistente; cuando haya material original, reemplazarla.
- **`assets/presskit-goyen.pdf`:** es el **presskit 2025** que venía en el export, como
  placeholder funcional hasta que exista el PDF 2026.
- **og-image:** única imagen con el duotono horneado (1200x630, generada con
  `_tools/build-assets.mjs`) porque los crawlers no aplican CSS.
- **Grilla de fotos:** el brief pide 3–5 fotos; solo hay 2 en el export. La grilla acepta
  más con solo editar `content.json`.

---

## ✅ Pendientes antes de publicar

Datos que faltan (`[FALTA]` en `content.json`) — **no inventar, confirmar con el artista**:

- [ ] `identidad.bpm` — rango real de BPM (ej. `"150-165"`)
- [ ] `bio.larga` — bio extendida (150–250 palabras; se muestra bajo "Leer más")
- [ ] `sets[].titulo` — títulos de los dos sets ya cargados (opcional: si queda vacío,
      el reproductor embebido muestra el título propio de la plataforma)
- [ ] `trayectoria[]` — fechas reales (fecha / evento / venue / ciudad; hoy la sección está oculta)
- [ ] `contacto.disponibilidad` — ej. "Disponible para bookings en AR / UY / LATAM"

Configuración:

- [ ] **Access key de Web3Forms** — crearla gratis en [web3forms.com](https://web3forms.com)
      con el email de booking y pegarla en la constante `WEB3FORMS_ACCESS_KEY` al inicio de
      `js/main.js` (hasta entonces el formulario muestra un aviso y no envía)
- [ ] **PDF del presskit 2026** — reemplazar `assets/presskit-goyen.pdf` (hoy es el de 2025)
- [ ] **URLs absolutas del `<head>`** — si el dominio final no es `goyen.pages.dev`,
      actualizar `canonical`, `og:url`, `og:image` y `twitter:image` en `index.html`
- [ ] 3–5 fotos de prensa originales (sin duotono) para completar la grilla
