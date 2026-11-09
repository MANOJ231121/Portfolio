import { useState, useEffect } from 'react';
import SpecularButton from './SpecularButton';
import scrollToSection from '../utils/scrollTo';

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
    scrollToSection(target);
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
            <SpecularButton
              size="sm"
              radius={100}
              tint="#0f0f0f"
              tintOpacity={0.9}
              textColor="#b9ff66"
              lineColor="#b9ff66"
              baseColor="#3a3a3a"
              intensity={1}
              idleIntensity={0.3}
              shineSize={12}
              shineFade={36}
              thickness={1.2}
              glow={0.9}
              proximity={200}
              style={{ fontWeight: 600 }}
              onClick={handleNavClick('#contact')}
            >
              Let's Talk
            </SpecularButton>
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
