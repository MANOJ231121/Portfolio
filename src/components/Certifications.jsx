import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import useScrollProgress from '../hooks/useScrollProgress';

const certifications = [
  {
    title: 'MongoDB Associate Database Administrator',
    issuer: 'FACE Prep',
    year: '2026',
    skills: ['MongoDB', 'Database Administration', 'NoSQL'],
    thumb: import.meta.env.BASE_URL + 'certificates/mongodb_admin.png',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Ethnus Codemithra',
    year: '2026',
    skills: ['Azure', 'Cloud Computing', 'AZ-900'],
    thumb: import.meta.env.BASE_URL + 'certificates/azure_fundamentals.png',
  },
  {
    title: 'Open Source Software',
    issuer: 'vityarthi (VIT Bhopal University)',
    year: '2026',
    skills: ['Open Source', 'Git & GitHub', 'Linux'],
    thumb: import.meta.env.BASE_URL + 'certificates/open_source_software.png',
  },
];

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Certifications() {
  const [ref, progress] = useScrollProgress();
  const [activeCert, setActiveCert] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const lastFocusedRef = useRef(null);
  const p = ease(progress);

  const closeLightbox = useCallback(() => {
    setZoomed(false);
    setActiveCert(null);
  }, []);

  const openLightbox = useCallback((cert) => {
    lastFocusedRef.current = document.activeElement;
    setZoomed(false);
    setActiveCert(cert);
  }, []);

  // Portal the lightbox to document.body so it is not trapped by section transforms.
  useEffect(() => {
    if (!activeCert) return;

    const previousOverflow = document.body.style.overflow;

    // Lock body scroll while the lightbox is open.
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('cert-lightbox-open');

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('cert-lightbox-open');
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.({ preventScroll: true });
    };
  }, [activeCert, closeLightbox]);

  return (
    <section className="certs" id="certifications" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p >= 1 ? 1 : Math.min(p * 4, 1),
              transform: p >= 1 ? 'none' : `translateY(${(1 - p) * 30}px)`,
            }}
          >
            03.5 / Certifications
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p >= 1 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`,
            }}
          >
            Certifications <span className="green">& Awards</span>
          </h2>
          <div
            style={{
              width: `${p * 80}px`,
              height: '2px',
              background: 'var(--green)',
              marginTop: '16px',
            }}
          />
        </div>

        <div className="certs-grid">
          {certifications.map((cert, index) => {
            const certStart = 0.12 + index * 0.15;
            const certP = Math.max(0, Math.min(1, (p - certStart) / 0.25));
            const rotate = (1 - certP) * (index % 2 === 0 ? -6 : 6);
            const yOffset = (1 - certP) * 60;

            return (
              <div
                key={cert.title}
                className="cert-card"
                onClick={() => openLightbox(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(cert);
                  }
                }}
                style={{
                  transform: certP >= 1
                    ? 'none'
                    : `perspective(700px) rotateY(${rotate}deg) translateY(${yOffset}px)`,
                  opacity: certP,
                  filter: certP >= 1 ? 'none' : `blur(${(1 - certP) * 4}px)`,
                  cursor: 'pointer',
                }}
              >
                <div className="cert-thumb">
                  <img src={cert.thumb} alt={cert.title} loading="lazy" />
                </div>
                <div className="cert-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
                  </svg>
                </div>
                <div className="cert-top">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-year">{cert.year}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-tags">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="project-tag">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {activeCert &&
        createPortal(
          <div
            className="cert-modal-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <div
              className={`cert-modal-content ${zoomed ? 'is-zoomed' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={closeLightbox}
                aria-label="Close certificate"
                type="button"
              >
                &times;
              </button>
              <button
                type="button"
                className={`cert-modal-image-btn ${zoomed ? 'is-zoomed' : ''}`}
                onClick={() => setZoomed((v) => !v)}
                aria-label={zoomed ? 'Zoom out certificate' : 'Zoom in certificate'}
              >
                <img
                  src={activeCert.thumb}
                  alt={activeCert.title}
                  className={`cert-modal-image ${zoomed ? 'is-zoomed' : ''}`}
                />
              </button>
              <div className="cert-modal-info">
                <h3>{activeCert.title}</h3>
                <p>{activeCert.issuer} &bull; {activeCert.year}</p>
                <span className="cert-zoom-hint">
                  {zoomed ? 'Click image to zoom out' : 'Click image to zoom in'}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
