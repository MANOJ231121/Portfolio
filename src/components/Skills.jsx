import { useEffect, useRef } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
  SiLinux,
  SiGithubactions,
  SiGooglesearchconsole,
  SiTestinglibrary,
} from 'react-icons/si';
import { FaCode, FaCloud, FaPenNib, FaMobileAlt, FaBolt, FaSyncAlt } from 'react-icons/fa';
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

// Logos shown next to each name in the running marquee.
const marqueeSkills = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'HTML/CSS', Icon: SiHtml5 },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'Express', Icon: SiExpress },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'REST APIs', Icon: FaCloud },
  { name: 'Git', Icon: SiGit },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Figma', Icon: SiFigma },
  { name: 'VS Code', Icon: FaCode },
  { name: 'Linux', Icon: SiLinux },
  { name: 'CI/CD', Icon: SiGithubactions },
  { name: 'UI/UX Design', Icon: FaPenNib },
  { name: 'Responsive Design', Icon: FaMobileAlt },
  { name: 'SEO', Icon: SiGooglesearchconsole },
  { name: 'Performance Optimization', Icon: FaBolt },
  { name: 'Agile', Icon: FaSyncAlt },
  { name: 'Testing', Icon: SiTestinglibrary },
];

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Skills() {
  const [ref, progress] = useScrollProgress();
  const p = ease(progress);
  const marqueeRef = useRef(null);

  // Scroll-velocity driven marquee acceleration (native scroll, no Lenis).
  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    if (!marqueeEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let lastY = window.scrollY;
    let timeout;

    const update = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;

      // Kinetic velocity tilt on marquee text
      const skew = Math.max(-5, Math.min(5, velocity * 0.12));
      marqueeEl.style.transform = skew !== 0 ? `skewX(${skew.toFixed(2)}deg)` : 'none';

      // Accelerate the CSS marquee animation speed with scroll velocity
      const anims = marqueeEl.getAnimations?.();
      if (anims && anims.length > 0) {
        anims[0].playbackRate = 1 + Math.min(4, Math.abs(velocity) * 0.12);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (anims[0]) anims[0].playbackRate = 1;
          marqueeEl.style.transform = 'none';
        }, 150);
      }

      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p >= 1 ? 1 : Math.min(p * 5, 1),
              transform: p >= 1 ? 'none' : `scale(${0.5 + p * 0.5})`,
            }}
          >
            03 / Skills
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p >= 1 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`,
            }}
          >
            My <span className="green">Expertise</span>
          </h2>
          <div
            style={{
              width: `${p * 60}px`,
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
                  transform: groupP >= 1
                    ? 'none'
                    : `translateX(${(1 - groupP) * (isLeft ? -120 : 120)}px) rotate(${(1 - groupP) * (isLeft ? -5 : 5)}deg)`,
                  opacity: groupP,
                  filter: groupP >= 1 ? 'none' : `blur(${(1 - groupP) * 6}px)`,
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
                          opacity: itemP,
                          transform: itemP >= 1 ? 'none' : `translateX(${(1 - itemP) * 30}px)`,
                        }}
                      >
                        <span
                          className="skill-dot"
                          style={{
                            transform: `scale(${dotScale})`,
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
            opacity: p >= 1 ? 1 : Math.min(p * 3, 1),
            transform: p >= 1 ? 'none' : `translateY(${(1 - p) * 40}px)`,
          }}
        >
          <div className="marquee">
            <div className="marquee-content" ref={marqueeRef}>
              {[...marqueeSkills, ...marqueeSkills].map(({ name, Icon }, i) => (
                <span key={`${name}-${i}`} className="marquee-item">
                  <Icon className="marquee-icon" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
