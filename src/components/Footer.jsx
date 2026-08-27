import useScrollProgress from '../hooks/useScrollProgress';

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Footer() {
  const [ref, progress, inView] = useScrollProgress();
  const p = inView ? ease(progress) : 0;

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div
          className="footer-center-line"
          style={{
            width: inView ? '100%' : '0%',
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <div
          className="footer-top"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
          }}
        >
          <div className="footer-brand">
            <a href="#" className="logo">
              Portfolio<span>.</span>
            </a>
            <p className="footer-tagline">
              Crafting digital experiences that make a difference.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              {['About', 'Projects', 'Skills', 'Contact'].map((link, i) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(20px)',
                    transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.05}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.05}s`,
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              {[
                { name: 'GitHub', url: 'https://github.com/MANOJ231121' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/manoj-chandra-joshi-22572634b' },
                { name: 'Twitter', url: 'https://x.com/manoj_2311_' }
              ].map((link, i) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(20px)',
                    transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.05}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.05}s`,
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="footer-bottom"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
          }}
        >
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <a href="#hero" className="back-to-top">
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
