/* global React */
const { Wordmark, Button } = window.GOYENDesignSystem_0f23e6;

/** WEB · sticky top nav with blur. */
function SiteNav({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('.web-scroll');
    const onScroll = () => setScrolled((el ? el.scrollTop : window.scrollY) > 24);
    const target = el || window;
    target.addEventListener('scroll', onScroll);
    return () => target.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Bio', 'bio'], ['Rider', 'rider'], ['Escuchar', 'listen'], ['Contacto', 'contact']];
  return (
    <nav className={`web-nav${scrolled ? ' is-scrolled' : ''}`}>
      <Wordmark size={22} />
      <div className="web-nav-links">
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="web-nav-link">{label}</a>
        ))}
      </div>
      <Button variant="primary" size="sm" onClick={onBook}>Reservar</Button>
    </nav>
  );
}
window.SiteNav = SiteNav;
