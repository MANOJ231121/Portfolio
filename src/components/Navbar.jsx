import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (target) => (e) => {
    e.preventDefault();
    setActive(false);
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -70, duration: 1.2 });
    } else {
      if (target === 0 || target === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="logo" onClick={handleNavClick(0)}>
          Portfolio<span>.</span>
        </a>
        <ul className={`nav-links ${active ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={handleNavClick(link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={handleNavClick('#contact')}>
              Let's Talk
            </a>
          </li>
        </ul>
        <div
          className={`hamburger ${active ? 'active' : ''}`}
          onClick={() => setActive(!active)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
