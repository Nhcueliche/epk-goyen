/* global React */
const { SectionLabel, GlitchTitle, RiderTable, ContactRow, LinkRow } = window.GOYENDesignSystem_0f23e6;

/**
 * PRESSKIT · Page 3 — Rider técnico + Contacto
 * The booker-action page: rider panel + copyable contacts + set links.
 */
function ContactPage() {
  return (
    <section className="pk-page pk-contact" data-screen-label="Presskit · Rider & Contacto">
      <header className="pk-head">
        <SectionLabel index={2}>Rider &amp; Contacto</SectionLabel>
        <span className="gy-data-band pk-head-meta">PÁG. 03 / 03</span>
      </header>

      <div className="pk-contact-grid">
        <div className="pk-contact-col">
          <RiderTable
            title="Rider técnico"
            rows={[
              { label: 'Mixer', value: 'Allen & Heath Xone:96' },
              { label: 'Players', value: '3× Pioneer CDJ-3000' },
              { label: 'Formato', value: 'USB / Rekordbox' },
              { label: 'Monitor', value: '1× wedge en cabina' },
            ]}
            note="Alternativa aceptada: DJM-900NXS2 + 3× CDJ-2000NXS2."
          />

          <div className="pk-sets">
            <span className="gy-eyebrow">Escuchar</span>
            <LinkRow platform="SoundCloud" label="GOYEN — Live @ BES 04" href="#" />
            <LinkRow platform="SoundCloud" label="GOYEN — Industrial Set 01" href="#" />
          </div>
        </div>

        <div className="pk-contact-col">
          <GlitchTitle as="h2" size="title">CONTACTO</GlitchTitle>
          <div className="pk-contacts">
            <ContactRow label="Booking" value="bookings.goyen@gmail.com" href="mailto:bookings.goyen@gmail.com" />
            <ContactRow label="Instagram" value="@goyen" href="https://instagram.com/goyen" />
            <ContactRow label="BES" value="@bes.rave" href="https://instagram.com/bes.rave" />
            <ContactRow label="Base" value="Buenos Aires, AR" copyable={false} />
          </div>
          <p className="pk-avail gy-data-band">DISPONIBLE PARA BOOKINGS · AR / UY / LATAM</p>
        </div>
      </div>

      <footer className="pk-contact-foot">
        <span className="gy-data-band">GOYEN · EPK 2026</span>
        <span className="gy-data-band">HARD TECHNO / INDUSTRIAL · 150–165 BPM</span>
      </footer>
    </section>
  );
}
window.ContactPage = ContactPage;
