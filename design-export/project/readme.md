# GOYEN — Design System

> **Energía sin pausa. Hard Techno que no baja nunca.**

The brand system for **GOYEN** (Sebastián Bartaburu Etchegoyen), a Uruguayan
Hard / Industrial Techno DJ based in Buenos Aires. Built to produce a 3-page
booker-facing **EPK / presskit** (PDF + optional one-page web version) and any
supporting flyers, slides and assets.

This system codifies the parts of the existing 2025 presskit that *work* — the
glitch headlines, blue-duotone photography, condensed industrial type — and
fixes the parts that don't: all-caps body copy (illegible on phones),
icon-only contacts (a booker can't copy an email from an icon), and the
infinite-scroll format (the document that circulates is a **paginated PDF**).

---

## Sources

| Source | What it is | Path |
| --- | --- | --- |
| `PRESSKIT GOYEN 2025.pdf` | The existing presskit — one tall image (1190×4281), vertical-scroll. Reference for the glitch + duotone language. | `uploads/PRESSKIT GOYEN 2025.pdf` → rendered to `uploads/presskit_full.png` |
| `IMG_2052.jpeg` | Press portrait — black background, lightning-print hoodie + chain. Already on-brand; the hero image. | `uploads/IMG_2052.jpeg` → `assets/photos/goyen-portrait.jpeg` |
| Brief (pasted) | "BRIEF VISUAL — EPK / PRESSKIT GOYEN 2026". Full direction: palette, type, glitch motif, photography, PDF structure, delivery rules. | conversation |

There is **no codebase and no Figma** for this project — it is a personal-brand
identity. The brief is the source of truth; `[FALTA]` fields in it (booking
email, BPM range, dated trajectory, set links) are **placeholders to be filled
by the artist — do not invent them.** Where a value is unknown, the kits use a
clearly-marked placeholder (e.g. `bookings.goyen@gmail.com`, `150–165 BPM`).

---

## The artist (context)

GOYEN is a DJ from Uruguay living in Buenos Aires. His signature is **sets
without "bajadas"** — no energy drops; a single ascending line of tension from
start to finish, built from Hard and Industrial Techno with a PsyTrance
influence. Co-founder of **BES** (`@bes.rave`), a Hard Techno cycle/producer
connecting the underground with established national artists. Trained at
**TekGen** since early 2024. Has shared the booth with Clipper Stealer, Bronkka,
Schavartzman, Ruthless, Drem, Eduvek, Korrosiv and Kleck.er.

**Positioning idea (visual north star):** the set is *a line of energy that only
rises*. The design must feel like that — contained tension, darkness with
discharges of electric-blue light, technical precision. Sober, never cluttered.
A booker has to read it on a phone in 90 seconds.

**Tone references** (calibrate, don't copy): LS41, Kobosil, Mosmoz — digital
brutalism, industrial darkness, typography as the dominant graphic element.

---

## Content fundamentals

How GOYEN copy is written:

- **Language:** Spanish (Rioplatense). Keep accents. Genre/technical terms stay
  in English where standard ("Hard Techno", "Industrial", "Rider", "BPM", "USB").
- **Voice:** third person for the bio ("GOYEN es un DJ uruguayo…"), second
  person never used. Factual, not aspirational.
- **Facts only — banned register.** No aspirational filler: never "buscando
  pisar fuerte", "en formación", "buscando crecer". The 2025 presskit leaned on
  this and it reads as weak. State what happened: venues, dates, names, gear.
- **Casing:** Display headlines and the wordmark are **UPPERCASE** (GOYEN,
  BIOGRAFÍA, RIDER TÉCNICO, CONTACTO). Reading copy is **sentence case** — long
  uppercase paragraphs are forbidden (the core fix vs. 2025).
- **Numbers / metrics:** only if solid. No play counts / follower counts unless
  genuinely strong. Technical numbers (BPM range, gear model numbers) are
  welcome and set in mono.
- **Length discipline:** short bio 50–80 words; long bio 150–250; rider ≤ 4
  lines; positioning phrase one line.
- **No emoji.** Handles (`@bes.rave`, `@goyen`) appear as **plain text you can
  copy**, not as icons alone. Booking email is always visible as text.
- **Micro-copy vibe:** terse, technical, lowercase-functional for labels
  ("disponibilidad", "booking", "rider"). Think equipment label, not marketing.

Example sentences (on-brand):

> GOYEN es un DJ uruguayo radicado en Buenos Aires. Su sello: sets de Hard e
> Industrial Techno con influencias de PsyTrance, construidos sin bajadas, con
> energía ascendente sostenida.

> HARD TECHNO / INDUSTRIAL · 150–165 BPM · BUENOS AIRES, AR

---

## Visual foundations

**Mood.** Industrial darkness with discharges of electric-blue light. Tension
held, never released. Brutalist: type is the primary graphic, geometry is hard
and square, space is mostly empty black.

**Color.** A near-monochrome blue-on-void system. `#010108` (a blue-black, *not*
pure black) grounds every surface. A single accent — **electric blue `#170EFF`** —
is the only saturated color, and the rule is **one electric-blue discharge per
page**: a glitch title, a key link, or the booking email — never more. Deep blue
`#080557` carries section blocks and photo overlays; mid-blues `#0E0899` /
`#100AB5` draw lines and frames. White `#FAFAFA` is reading text. **No red** (an
optional single booking micro-accent is the only exception, off by default).

**Type.** Display = **Archivo Black** (industrial grotesque, uppercase) for the
GOYEN wordmark and section titles. Body = **Archivo** (neutral, legible, 400–800)
for all reading copy. Mono = **Space Mono** for technical data — the rider, BPM,
city band, and contact rows. Tracking is tight on big display, wide on the mono
data band.

**The glitch (signature motif).** Section titles and the wordmark are duplicated
with an offset blue/cyan ghost behind a clean white face (the "BIOGRAFÍA"
treatment from the 2025 kit, systematized as `.gy-glitch`). The glitch lives
**only** in headlines and photo treatment — **never** in reading text, never in
the rider. A small live/animated variant exists, gated behind
`prefers-reduced-motion`.

**Photography.** Unified **blue duotone** (`#010108 → #170EFF`) or a blue overlay
on all booth/live photos, so material from different sources reads as one set.
Subtle **scanlines** (≤10% opacity) layer over photos. Photos never compete with
text: either the photo dominates with minimal text over it, or text dominates
with the photo as a very darkened background. 3–5 photos max in the PDF. The
press portrait is already aligned and is the cover/bio hero.

**Backgrounds.** Full-bleed void or deep-blue section blocks; full-bleed darkened
photography. No gradients-as-decoration, no noise-for-noise's-sake (only the
purposeful scanline texture). Avoid: purple/blue web-gradient clichés,
rounded-corner+left-border accent cards, emoji.

**Geometry & cards.** Brutalist — corners are essentially square (`--radius-xs`
2px is the default; pills only for tags). "Cards" are dark raised panels
(`--surface-raised`) with a **hairline blue frame** (`.gy-frame`,
`--border-frame`) and a deep drop shadow rather than soft rounding. A thin
technical bracket frames cover art.

**Borders.** Hairline (`rgba(white,0.12)`) for quiet dividers; mid-blue lines
for structure; electric-blue only to signal the one active/focus element.

**Shadows.** Dark-on-dark: depth goes *down* (`--shadow-card`, `--shadow-pop`,
soft black), emphasis goes *up* as an electric **glow** (`--glow-electric`,
`--shadow-accent-glow`) reserved for the single accent element.

**Motion.** Restrained and snappy. Fades and short translate-ins on
`--ease-out`; the glitch flicker is the only "effect", and it's occasional, not
a constant loop. Durations 120–420ms. Everything respects
`prefers-reduced-motion`.

**States.** Hover = lift to brighter electric (`--accent-hover`) or a faint glow;
links underline on hover with 3px offset. Press = darker electric
(`--accent-press`) and a 1–2px nudge / slight scale-down. Focus = electric-blue
hairline ring. Never color-shift into red.

**Transparency & blur.** Used purposefully: photo scrims (`--surface-overlay`,
`.gy-photo-scrim`) to guarantee text legibility, and occasional backdrop blur on
sticky web nav. Not as decoration.

**Layout rules.** Fixed paginated structure for the PDF (A4); the web version is
a single page with the same hierarchy. Generous margins; content breathes in
darkness. Hit targets ≥ 44px on web/mobile. Body never edge-to-edge.

---

## Iconography

GOYEN is **not** an icon-heavy brand — typography and the glitch carry the
identity, and the 2025 presskit's icon-only contact row is explicitly a
**mistake to avoid** (a booker can't copy a mail from a greyscale icon).

Rules:

- **Contacts are text, not icons.** Email, Instagram handle, BES handle and
  availability are always copyable plain text. An icon may *accompany* a label
  but never replaces it.
- **Where icons are genuinely useful** (web nav, a play button on a set embed,
  external-link affordances), use **Lucide** (`https://unpkg.com/lucide@latest`)
  — thin 1.5–2px stroke, square feel, monochrome. This is a **substitution**:
  the brand had no icon set of its own; Lucide's technical, hairline style fits
  the industrial register. Tint them `--text-muted` at rest, `--accent` when
  active. *Flagged for the user — swap if a bespoke set is provided.*
- **No emoji. No multicolor icons. No unicode glyphs as icons.**
- The platform marks (SoundCloud, Instagram, YouTube) appear as **text links**
  in the PDF; on web they may use Lucide or official monochrome marks, kept small
  and tinted to the palette — never the brand-colored originals.

---

## Index / manifest

Root files:

- **`styles.css`** — the single entry point consumers link. Imports, in order:
  `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`,
  `tokens/spacing.css`, `tokens/effects.css`, `tokens/base.css`.
- **`readme.md`** — this guide.
- **`SKILL.md`** — Agent-Skills-compatible entry for use in Claude Code.

Folders:

- **`tokens/`** — CSS custom properties + signature-motif utility classes
  (`.gy-glitch`, `.gy-scanlines`, `.gy-photo-scrim`, `.gy-frame`, `.gy-eyebrow`,
  `.gy-data-band`, `.gy-prose`).
- **`assets/fonts/`** — self-hosted woff2 (Archivo Black, Archivo 400–800, Space
  Mono 400/700).
- **`assets/photos/`** — `goyen-portrait.jpeg` (press portrait),
  `goyen-portrait-duotone.jpeg` (blue-duotone treatment), `goyen-live.jpeg`
  (booth/live, duotoned).
- **`guidelines/`** — foundation specimen cards (the Design System tab).
- **`components/`** — reusable React primitives (see below).
- **`ui_kits/`** — full-surface recreations:
  - `presskit/` — the 3-page A4 PDF presskit (the core deliverable).
  - `web/` — the optional one-page web EPK with booking form + set embeds.
- **`templates/`** — copy-to-start template(s) for consuming projects.

Components (PascalCase, in `components/<group>/`):

- `core/` — `Button`, `Tag`, `DataRow`, `GlitchTitle`, `Wordmark`, `PhotoFrame`,
  `LinkRow`, `RiderTable`, `ContactRow`, `SectionLabel`.

See each component's `.prompt.md` for usage. See `ui_kits/*/README.md` for the
surface recreations.

---

## Caveats / open items (need the artist)

- **Fonts are stand-ins.** Archivo Black / Archivo / Space Mono are the
  licensed-free fonts the brief itself listed as acceptable. If you license
  **Druk** or **Monument Extended** for display, drop the woff2 in
  `assets/fonts/` and swap `--font-display`.
- **Icons** use Lucide as a substitute — flag above.
- `[FALTA]` fields from the brief (booking email, exact BPM range, dated
  trajectory, SoundCloud / set links, the transparent PNG logo) are shown as
  marked placeholders. Replace with real values before publishing.
