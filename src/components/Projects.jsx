import useScrollProgress from '../hooks/useScrollProgress';
import foodImage from '../assets/food_image.png';

const projects = [
  {
    id: 1,
    title: 'Food Exchange Platform',
    category: 'Full Stack Development',
    description:
      'A full-stack Artisanal solution with real-time inventory, Connectivity, and an intuitive admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'SpringBoot'],
    link: 'https://artisanal-food-app2311-byfcf7dzcwcwbte8.centralindia-01.azurewebsites.net/',
    image: foodImage,
  },
  {
    id: 2,
    title: 'Coming up',
    category: '',
    description: '',
    tags: [],
    link: '#',
    image: null,
  },
];

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Projects() {
  const [ref, progress, inView] = useScrollProgress();
  const p = inView ? ease(progress) : 0;

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p === 0 ? 1 : Math.min(p * 5, 1),
              transform: p === 0 ? 'none' : `translateX(${(1 - p) * -60}px)`,
            }}
          >
            02 / Projects
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p === 0 ? 'none' : `inset(0 ${(1 - p) * 100}% 0 0)`,
            }}
          >
            Featured <span className="green">Work</span>
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

        <div className="sweep-line-container">
          <div
            className="sweep-line"
            style={{
              width: p === 0 ? '0%' : `${p * 110}%`,
              opacity: p > 0.05 ? 1 : 0,
            }}
          />
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const cardStart = 0.12 + index * 0.12;
            const cardP = Math.max(0, Math.min(1, (p - cardStart) / 0.3));
            const isEven = index % 2 === 0;

            return (
              <a
                key={project.id}
                href={project.link}
                className="project-card"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  transform: p === 0
                    ? 'none'
                    : `perspective(800px) rotateX(${(1 - cardP) * (isEven ? -25 : 25)}deg) rotateY(${(1 - cardP) * (isEven ? 8 : -8)}deg) translateY(${(1 - cardP) * 80}px) scale(${0.8 + cardP * 0.2})`,
                  opacity: p === 0 ? 1 : cardP,
                  filter: p === 0 ? 'none' : `blur(${(1 - cardP) * 4}px)`,
                }}
              >
                <div className="project-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image-img"
                    />
                  ) : (
                    <div
                      className="project-image-placeholder"
                      style={{ transform: `scale(${1 + cardP * 0.05})` }}
                    >
                      {project.description ? (
                        <span>{project.category}</span>
                      ) : (
                        <span>Coming Soon</span>
                      )}
                    </div>
                  )}
                  <div className="project-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-number">0{project.id}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
