import useScrollProgress from '../hooks/useScrollProgress';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Figma', 'VS Code', 'Linux', 'CI/CD'],
  },
  {
    category: 'Other',
    items: ['UI/UX Design', 'Responsive Design', 'SEO', 'Performance Optimization', 'Agile', 'Testing'],
  },
];

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Skills() {
  const [ref, progress, inView] = useScrollProgress();
  const p = inView ? ease(progress) : 0;

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p === 0 ? 1 : Math.min(p * 5, 1),
              transform: p === 0 ? 'none' : `scale(${0.5 + p * 0.5})`,
            }}
          >
            03 / Skills
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p === 0 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`,
            }}
          >
            My <span className="green">Expertise</span>
          </h2>
          <div
            style={{
              width: p === 0 ? '0px' : `${p * 60}px`,
              height: '2px',
              background: 'var(--green)',
              marginTop: '16px',
            }}
          />
        </div>
        <div className="skills-grid">
          {skills.map((group, index) => {
            const groupStart = 0.1 + index * 0.1;
            const groupP = Math.max(0, Math.min(1, (p - groupStart) / 0.3));
            const isLeft = index % 2 === 0;

            return (
              <div
                key={group.category}
                className="skill-group"
                style={{
                  transform: p === 0
                    ? 'none'
                    : `translateX(${(1 - groupP) * (isLeft ? -120 : 120)}px) rotate(${(1 - groupP) * (isLeft ? -5 : 5)}deg)`,
                  opacity: p === 0 ? 1 : groupP,
                  filter: p === 0 ? 'none' : `blur(${(1 - groupP) * 6}px)`,
                }}
              >
                <h3 className="skill-group-title">{group.category}</h3>
                <ul className="skill-list">
                  {group.items.map((skill, i) => {
                    const itemStart = groupStart + 0.08 + i * 0.025;
                    const itemP = Math.max(0, Math.min(1, (p - itemStart) / 0.15));
                    const dotScale = itemP;
                    const dotRipple = itemP > 0.5 ? (itemP - 0.5) * 2 : 0;

                    return (
                      <li
                        key={skill}
                        className="skill-item"
                        style={{
                          opacity: p === 0 ? 1 : itemP,
                          transform: p === 0 ? 'none' : `translateX(${(1 - itemP) * 30}px)`,
                        }}
                      >
                        <span
                          className="skill-dot"
                          style={{
                            transform: `scale(${p === 0 ? 1 : dotScale})`,
                            boxShadow:
                              dotRipple > 0
                                ? `0 0 ${dotRipple * 12}px ${dotRipple * 4}px rgba(185,255,102,${0.4 * (1 - dotRipple)})`
                                : 'none',
                          }}
                        />
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div
          className="marquee-section"
          style={{
            opacity: p === 0 ? 1 : Math.min(p * 3, 1),
            transform: p === 0 ? 'none' : `translateY(${(1 - p) * 40}px)`,
          }}
        >
          <div className="marquee">
            <div className="marquee-content">
              {[...skills.flatMap((g) => g.items), ...skills.flatMap((g) => g.items)].map(
                (skill, i) => (
                  <span key={i} className="marquee-item">
                    {skill}
                    <span className="marquee-star">&#10038;</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
