/* global React */
const { GlitchTitle, Tag, Button } = window.GOYENDesignSystem_0f23e6;

/** WEB · full-viewport hero with duotone portrait + glitch wordmark. */
function Hero({ onBook }) {
  return (
    <header className="web-hero" data-screen-label="Web · Hero">
      <img className="web-hero-photo" src="../../assets/photos/goyen-portrait-duotone.jpeg" alt="GOYEN" />
      <div className="gy-scanlines" style={{ zIndex: 2 }} />
      <div className="web-hero-scrim" />
      <div className="web-hero-content">
        <span className="gy-data-band web-hero-band">HARD TECHNO / INDUSTRIAL · BUENOS AIRES</span>
        <GlitchTitle as="h1" size="hero" live>GOYEN</GlitchTitle>
        <p className="web-hero-phrase">Energía sin pausa. Sets sin bajadas — una sola línea de tensión que solo asciende.</p>
        <div className="web-hero-tags">
          <Tag variant="accent">Hard Techno</Tag>
          <Tag>Industrial</Tag>
          <Tag variant="solid">150–165 BPM</Tag>
        </div>
        <div className="web-hero-cta">
          <Button variant="primary" size="lg" onClick={onBook}>Reservar fecha</Button>
          <Button variant="secondary" size="lg" as="a" href="#listen">Escuchar sets</Button>
        </div>
      </div>
      <div className="web-hero-scrollcue gy-data-band">SCROLL ↓</div>
    </header>
  );
}
window.Hero = Hero;
