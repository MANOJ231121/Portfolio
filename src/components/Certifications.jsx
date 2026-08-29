import { useState } from 'react';
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
  const [ref, progress, inView] = useScrollProgress();
  const [activeCert, setActiveCert] = useState(null);
  const p = inView ? ease(progress) : 0;

  return (
    <section className="certs" id="certifications" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p === 0 ? 1 : Math.min(p * 4, 1),
              transform: p === 0 ? 'none' : `translateY(${(1 - p) * 30}px)`,
            }}
          >
            03.5 / Certifications
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p === 0 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`,
            }}
          >
            Certifications <span className="green">& Awards</span>
          </h2>
          <div
            style={{
              width: p === 0 ? '0px' : `${p * 80}px`,
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
                onClick={() => setActiveCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCert(cert);
                  }
                }}
                style={{
                  transform: p === 0
                    ? 'none'
                    : `perspective(700px) rotateY(${rotate}deg) translateY(${yOffset}px)`,
                  opacity: p === 0 ? 1 : certP,
                  filter: p === 0 ? 'none' : `blur(${(1 - certP) * 4}px)`,
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
      {activeCert && (
        <div 
          className="cert-modal-overlay" 
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="cert-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="cert-modal-close" 
              onClick={() => setActiveCert(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img 
              src={activeCert.thumb} 
              alt={activeCert.title} 
              className="cert-modal-image" 
            />
            <div className="cert-modal-info">
              <h3>{activeCert.title}</h3>
              <p>{activeCert.issuer} &bull; {activeCert.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
