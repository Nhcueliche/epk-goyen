/* global React */
const { GlitchTitle, Wordmark, SectionLabel, Tag } = window.GOYENDesignSystem_0f23e6;

/**
 * PRESSKIT · Page 1 — Cover
 * Full-bleed duotone portrait, glitch wordmark, positioning line, data band.
 */
function CoverPage() {
  return (
    <section className="pk-page pk-cover" data-screen-label="Presskit · Cover">
      <img className="pk-cover-photo" src="../../assets/photos/goyen-portrait-duotone.jpeg" alt="GOYEN" />
      <div className="gy-scanlines" style={{ zIndex: 2 }} />
      <div className="pk-cover-scrim" />

      <div className="pk-cover-top">
        <span className="gy-data-band">EPK · 2026</span>
        <span className="gy-data-band">URUGUAY → BUENOS AIRES</span>
      </div>

      <div className="pk-cover-body">
        <div className="pk-cover-band gy-data-band">HARD TECHNO / INDUSTRIAL</div>
        <GlitchTitle as="h1" size="hero" live>GOYEN</GlitchTitle>
        <p className="pk-cover-phrase">
          Energía sin pausa. Sets sin bajadas — una sola línea de tensión
          que solo asciende.
        </p>
        <div className="pk-cover-tags">
          <Tag variant="accent">Hard Techno</Tag>
          <Tag>Industrial</Tag>
          <Tag>PsyTrance infl.</Tag>
          <Tag variant="solid">150–165 BPM</Tag>
        </div>
      </div>

      <div className="pk-cover-foot gy-data-band">
        <span>BES · @bes.rave</span>
        <span>PÁG. 01 / 03</span>
      </div>
    </section>
  );
}
window.CoverPage = CoverPage;
