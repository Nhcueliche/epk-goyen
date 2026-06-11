/* global React */
const { SectionLabel, GlitchTitle, Tag, RiderTable, LinkRow } = window.GOYENDesignSystem_0f23e6;

/** WEB · Bio section. */
function BioSection() {
  const shared = ['Clipper Stealer','Bronkka','Schavartzman','Ruthless','Drem','Eduvek','Korrosiv','Kleck.er'];
  return (
    <section id="bio" className="web-section web-bio" data-screen-label="Web · Bio">
      <SectionLabel index={1}>Biografía</SectionLabel>
      <div className="web-bio-grid">
        <GlitchTitle as="h2" size="display">SIN BAJADAS</GlitchTitle>
        <div className="web-bio-copy">
          <p className="gy-prose">
            GOYEN es un DJ uruguayo radicado en Buenos Aires. Su sello: sets de
            Hard e Industrial Techno con influencias de PsyTrance, construidos
            sin bajadas, con energía ascendente sostenida.
          </p>
          <p className="gy-prose gy-prose--muted">
            Co-fundador de BES, ciclo de Hard Techno que conecta el under con
            artistas nacionales consolidados. Formado en TekGen desde 2024.
          </p>
          <div className="web-shared">
            <span className="gy-eyebrow">Ha compartido cabina con</span>
            <div className="web-shared-chips">
              {shared.map((n) => <Tag key={n}>{n}</Tag>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.BioSection = BioSection;

/** WEB · Rider section. */
function RiderSection() {
  return (
    <section id="rider" className="web-section web-rider" data-screen-label="Web · Rider">
      <SectionLabel index={2}>Rider técnico</SectionLabel>
      <RiderTable
        title="Setup de cabina"
        rows={[
          { label: 'Mixer', value: 'Allen & Heath Xone:96' },
          { label: 'Players', value: '3× Pioneer CDJ-3000' },
          { label: 'Formato', value: 'USB / Rekordbox' },
          { label: 'Monitor', value: '1× wedge en cabina' },
        ]}
        note="Alternativa aceptada: DJM-900NXS2 + 3× CDJ-2000NXS2."
      />
    </section>
  );
}
window.RiderSection = RiderSection;

/** WEB · Listen section (set links as text rows — no icon-only). */
function ListenSection() {
  return (
    <section id="listen" className="web-section web-listen" data-screen-label="Web · Escuchar">
      <SectionLabel index={3}>Escuchar</SectionLabel>
      <div className="web-listen-list">
        <LinkRow platform="SoundCloud" label="GOYEN — Live @ BES 04" href="#" />
        <LinkRow platform="SoundCloud" label="GOYEN — Industrial Set 01" href="#" />
        <LinkRow platform="YouTube" label="GOYEN b2b @ TekGen" href="#" />
      </div>
    </section>
  );
}
window.ListenSection = ListenSection;
