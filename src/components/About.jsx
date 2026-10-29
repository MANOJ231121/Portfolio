import useScrollProgress from '../hooks/useScrollProgress';
import profileImg from '../assets/profile.jpg';

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function About() {
  const [ref, progress] = useScrollProgress();
  const p = ease(progress);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p >= 1 ? 1 : Math.min(p * 4, 1),
              transform: p >= 1 ? 'none' : `translateY(${(1 - p) * 30}px)`,
            }}
          >
            01 / About
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p >= 1 ? 'none' : `inset(0 ${(1 - p) * 100}% 0 0)`,
            }}
          >
            A passionate <span className="green">Developer</span> <br />
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
        <div className="about-grid">
          <div className="about-image-wrapper" style={{ perspective: '800px' }}>
            <div
              className="about-image"
              style={{
                transform: p >= 1
                  ? 'none'
                  : `perspective(800px) rotateX(${(1 - p) * -15}deg) rotateY(${(1 - p) * 12}deg) translateY(${(1 - p) * 60}px) scale(${0.85 + p * 0.15})`,
                filter: p >= 1 ? 'none' : `blur(${(1 - p) * 8}px)`,
                opacity: p >= 1 ? 1 : Math.min(p * 3, 1),
              }}
            >
              <img
                src={profileImg}
                alt="Manoj Chandra Joshi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: `scale(${1.08 + (1 - p) * 0.08}) translateY(${(1 - p) * -16}px)`,
                  transition: 'transform 0.25s ease-out',
                }}
              />
            </div>
            <div
              className="about-image-accent"
              style={{
                transform: `translate(${20 - (1 - p) * 30}px, ${20 - (1 - p) * 30}px)`,
                opacity: p * 0.4,
              }}
            />
          </div>
          <div className="about-text">
            {[
              <>
                Hello! I'm <span className="green">Manoj Chandra Joshi</span>, an aspiring
                developer who loves turning ideas into reality through clean code
                and thoughtful design.
              </>,
              'I am a passionate developer who enjoys building responsive and user-friendly web applications. I love working at the intersection of design and technology, turning ideas into seamless digital experiences.',
              "I have built 3 projects so far and I am actively working on more. When I'm not coding, you'll find me exploring new technologies, learning best practices, and sketching UI concepts.",
            ].map((text, i) => {
              const paragraphStart = 0.15 + i * 0.15;
              const paragraphProgress = Math.max(
                0,
                Math.min(1, (p - paragraphStart) / 0.25)
              );
              return (
                <p
                  key={i}
                  className={i === 0 ? 'about-lead' : ''}
                  style={{
                    clipPath: paragraphProgress >= 1 ? 'none' : `inset(0 0 ${(1 - paragraphProgress) * 100}% 0)`,
                    opacity: paragraphProgress,
                    transform: paragraphProgress >= 1 ? 'none' : `translateY(${(1 - paragraphProgress) * 20}px)`,
                  }}
                >
                  {text}
                </p>
              );
            })}
            <div className="about-details">
              {[
                { label: 'Name', value: 'Manoj Chandra Joshi' },
                { label: 'Email', value: 'manojjoshi230611@gmail.com' },
                { label: 'Location', value: 'Champawat,Uttarakhand,India' },
                { label: 'Availability', value: 'Open to internships & work', green: true },
              ].map((item, i) => {
                const detailStart = 0.55 + i * 0.07;
                const detailP = Math.max(
                  0,
                  Math.min(1, (p - detailStart) / 0.15)
                );
                return (
                  <div
                    key={i}
                    className="about-detail"
                    style={{
                      opacity: detailP,
                      transform: detailP >= 1 ? 'none' : `translateY(${(1 - detailP) * 25}px)`,
                    }}
                  >
                    <span className="detail-label">{item.label}</span>
                    <span className={`detail-value ${item.green ? 'green' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
