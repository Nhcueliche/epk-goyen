/* global React */
const { SectionLabel, GlitchTitle, Tag } = window.GOYENDesignSystem_0f23e6;

/**
 * PRESSKIT · Page 2 — Biografía + Trayectoria
 * Text dominates; darkened live photo as a side column.
 */
function BioPage() {
  const shared = [
    'Clipper Stealer', 'Bronkka', 'Schavartzman', 'Ruthless',
    'Drem', 'Eduvek', 'Korrosiv', 'Kleck.er',
  ];
  return (
    <section className="pk-page pk-bio" data-screen-label="Presskit · Biografía">
      <header className="pk-head">
        <SectionLabel index={1}>Biografía</SectionLabel>
        <span className="gy-data-band pk-head-meta">PÁG. 02 / 03</span>
      </header>

      <div className="pk-bio-grid">
        <div className="pk-bio-text">
          <GlitchTitle as="h2" size="display">SIN BAJADAS</GlitchTitle>

          <p className="gy-prose">
            GOYEN es un DJ uruguayo radicado en Buenos Aires. Su sello: sets de
            Hard e Industrial Techno con influencias de PsyTrance, construidos
            sin bajadas, con energía ascendente sostenida de principio a fin.
          </p>
          <p className="gy-prose gy-prose--muted">
            Co-fundador de BES, ciclo de Hard Techno que conecta el under con
            artistas nacionales consolidados. Formado en TekGen desde inicios de
            2024, construye cada set como una única línea de tensión —
            precisión técnica, oscuridad y descargas de luz.
          </p>

          <div className="pk-bio-shared">
            <span className="gy-eyebrow">Ha compartido cabina con</span>
            <div className="pk-bio-chips">
              {shared.map((n) => <Tag key={n} variant="outline">{n}</Tag>)}
            </div>
          </div>
        </div>

        <figure className="pk-bio-photo gy-frame">
          <img src="../../assets/photos/goyen-live.jpeg" alt="GOYEN en cabina" />
          <div className="gy-scanlines" style={{ zIndex: 3 }} />
          <figcaption className="gy-data-band">EN VIVO · BES</figcaption>
        </figure>
      </div>
    </section>
  );
}
window.BioPage = BioPage;
