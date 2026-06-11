/* global React */
const { GlitchTitle, SectionLabel, ContactRow, Button } = window.GOYENDesignSystem_0f23e6;

/** WEB · Contact + booking form (fake submit). */
function ContactSection({ formRef }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', date: '', city: '', msg: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const field = (k, label, type = 'text', extra = {}) => (
    <label className="web-field">
      <span className="web-field-label">{label}</span>
      <input
        className="web-input" type={type} value={form[k]} onChange={set(k)}
        {...extra}
      />
    </label>
  );

  return (
    <section id="contact" className="web-section web-contact" data-screen-label="Web · Contacto" ref={formRef}>
      <SectionLabel index={4}>Contacto</SectionLabel>
      <div className="web-contact-grid">
        <div className="web-contact-left">
          <GlitchTitle as="h2" size="display">RESERVAR</GlitchTitle>
          <p className="gy-prose gy-prose--muted">
            Disponible para bookings en AR / UY / LATAM. Escribí con fecha,
            ciudad y venue — respondo con rider y honorarios.
          </p>
          <div className="web-contacts">
            <ContactRow label="Booking" value="bookings.goyen@gmail.com" href="mailto:bookings.goyen@gmail.com" />
            <ContactRow label="Instagram" value="@goyen" href="https://instagram.com/goyen" />
            <ContactRow label="BES" value="@bes.rave" href="https://instagram.com/bes.rave" />
          </div>
        </div>

        <div className="web-form-panel gy-frame">
          {sent ? (
            <div className="web-form-done">
              <div className="web-form-done-mark gy-data-band">SOLICITUD ENVIADA</div>
              <p className="gy-prose">Gracias{form.name ? `, ${form.name}` : ''}. Te respondo a la brevedad con disponibilidad y rider.</p>
              <Button variant="secondary" size="sm" onClick={() => { setSent(false); setForm({ name:'', email:'', date:'', city:'', msg:'' }); }}>Nueva solicitud</Button>
            </div>
          ) : (
            <form className="web-form" onSubmit={submit}>
              <div className="web-form-row">
                {field('name', 'Nombre', 'text', { required: true, placeholder: 'Tu nombre / venue' })}
                {field('email', 'Email', 'email', { required: true, placeholder: 'vos@venue.com' })}
              </div>
              <div className="web-form-row">
                {field('date', 'Fecha', 'date')}
                {field('city', 'Ciudad', 'text', { placeholder: 'Buenos Aires' })}
              </div>
              <label className="web-field">
                <span className="web-field-label">Mensaje</span>
                <textarea className="web-input web-textarea" rows={4} value={form.msg} onChange={set('msg')} placeholder="Contame del evento…" />
              </label>
              <Button variant="primary" size="md" type="submit" style={{ width: '100%' }}>Enviar solicitud</Button>
            </form>
          )}
        </div>
      </div>

      <footer className="web-foot">
        <span className="gy-data-band">GOYEN · 2026</span>
        <span className="gy-data-band">HARD TECHNO / INDUSTRIAL · 150–165 BPM</span>
      </footer>
    </section>
  );
}
window.ContactSection = ContactSection;
