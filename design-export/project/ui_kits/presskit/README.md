# UI Kit · Presskit (EPK)

The core deliverable: a **3-page A4 electronic press kit** for GOYEN, built to
be sent to bookers as a paginated PDF (and shown on screen as stacked pages).

## Pages

1. **`CoverPage.jsx`** — full-bleed blue-duotone portrait, animated glitch
   `GOYEN` wordmark, positioning line, genre/BPM tags, BES handle.
2. **`BioPage.jsx`** — short + long bio (sentence case, facts only), "ha
   compartido cabina con" chip list, darkened live photo column.
3. **`ContactPage.jsx`** — the booker-action page: framed technical `RiderTable`,
   set links, and **copyable** `ContactRow`s (the explicit fix vs. the 2025
   icon-only contacts). Availability band.

## How it works

`index.html` links `styles.css` + `presskit.css`, loads the compiled
`_ds_bundle.js`, then the three page JSX files. Pages compose the core
components (`GlitchTitle`, `RiderTable`, `ContactRow`, `Tag`, `SectionLabel`…).

## Print / PDF

`presskit.css` has an `@media print` block: A4, zero margin, one page per sheet,
`print-color-adjust: exact` so the dark ground prints. Use **Save as PDF** to
export the sendable EPK.

## Placeholders to replace before publishing

`bookings.goyen@gmail.com`, BPM range `150–165`, set links, and the gear list
are marked placeholders — swap with the artist's real values.
