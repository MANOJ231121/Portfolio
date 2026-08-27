import useScrollProgress from '../hooks/useScrollProgress';
import profileImg from '../assets/profile.jpg';

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function About() {
  const [ref, progress, inView] = useScrollProgress();
  const p = inView ? ease(progress) : 0;

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p === 0 ? 1 : Math.min(p * 4, 1),
              transform: p === 0 ? 'none' : `translateY(${(1 - p) * 30}px)`,
            }}
          >
            01 / About
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p === 0 ? 'none' : `inset(0 ${(1 - p) * 100}% 0 0)`,
            }}
          >
            A passionate <span className="green">Developer</span> <br />
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
        <div className="about-grid">
          <div className="about-image-wrapper" style={{ perspective: '800px' }}>
            <div
              className="about-image"
              style={{
                transform: p === 0
                  ? 'none'
                  : `rotateX(${p * -15}deg) rotateY(${p * 12}deg) translateY(${(1 - p) * 60}px) scale(${0.85 + p * 0.15})`,
                filter: p === 0 ? 'none' : `blur(${(1 - p) * 8}px)`,
                opacity: p === 0 ? 1 : Math.min(p * 3, 1),
              }}
            >
              <img
                src={profileImg}
                alt="Manoj Chandra Joshi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            <div
              className="about-image-accent"
              style={{
                transform: p === 0
                  ? 'translate(20px, 20px)'
                  : `translate(${20 - p * 30}px, ${20 - p * 30}px)`,
                opacity: p === 0 ? 0.3 : p * 0.4,
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
              'I am currently working as an intern at Prodigy Infotech, where I am gaining hands-on experience in web development and building responsive applications. I enjoy working at the intersection of design and technology, creating seamless user interfaces.',
              "I have built 3 projects so far and am actively working on more. When I'm not coding, you'll find me exploring new technologies, learning best practices, and sketching UI concepts.",
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
                    clipPath: p === 0 ? 'none' : `inset(0 0 ${(1 - paragraphProgress) * 100}% 0)`,
                    opacity: p === 0 ? 1 : paragraphProgress,
                    transform: p === 0 ? 'none' : `translateY(${(1 - paragraphProgress) * 20}px)`,
                  }}
                >
                  {text}
                </p>
              );
            })}
            <div className="about-details">
              {[
                { label: 'Name', value: 'Manoj Chandra Joshi' },
                { label: 'Email', value: 'manojoshi230611@gmail.com' },
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
                      opacity: p === 0 ? 1 : detailP,
                      transform: p === 0 ? 'none' : `translateY(${(1 - detailP) * 25}px)`,
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
