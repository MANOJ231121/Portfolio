import { memo } from 'react';
import useScrollProgress from '../hooks/useScrollProgress';
import CircularTestimonials from './CircularTestimonials';
import foodImage from '../assets/food_image.png';
import kiranaImage from '../assets/kirana_ai.png';

const upcomingImage =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80';

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
    title: 'Kirana AI Voice Assistant',
    category: 'AI & Web Development',
    description:
      'An AI-powered local store voice assistant featuring continuous voice listening powered by Groq AI, real-time product catalog search, and interactive basket ordering.',
    tags: ['React', 'Groq AI', 'Voice AI', 'Vite', 'Tailwind CSS'],
    link: 'https://kirana-ai-rose.vercel.app/',
    image: kiranaImage,
  },
  {
    id: 3,
    title: 'Coming up',
    category: 'In Progress',
    description:
      'Something new is in the works. Check back soon for the next build.',
    tags: [],
    link: '#',
    image: null,
  },
];

// Stable slide data so the carousel (which is memoized) doesn't re-render
// every time the section's scroll-progress animation ticks.
const slides = projects.map((project) => ({
  quote: project.description,
  name: project.title,
  designation: project.category,
  src: project.image ?? upcomingImage,
  tags: project.tags,
  href: project.link !== '#' ? project.link : null,
  linkLabel: 'View Project',
}));

const colors = {
  name: '#f0f0f0',
  designation: '#b9ff66',
  testimony: '#aaaaaa',
  arrowBackground: '#b9ff66',
  arrowForeground: '#0a0a0a',
  arrowHoverBackground: '#8ecc4a',
};

const fontSizes = {
  name: 'clamp(1.35rem, 2.4vw, 1.75rem)',
  designation: '0.9rem',
  quote: 'clamp(1rem, 1.6vw, 1.125rem)',
};

const ProjectsCarousel = memo(function ProjectsCarousel() {
  return (
    <CircularTestimonials
      testimonials={slides}
      autoplay
      colors={colors}
      fontSizes={fontSizes}
      ariaLabel="Featured projects"
      itemLabel="project"
    />
  );
});

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Projects() {
  const [ref, progress] = useScrollProgress();
  const p = ease(progress);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p >= 1 ? 1 : Math.min(p * 5, 1),
              transform: p >= 1 ? 'none' : `translateX(${(1 - p) * -60}px)`,
            }}
          >
            02 / Projects
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p >= 1 ? 'none' : `inset(0 ${(1 - p) * 100}% 0 0)`,
            }}
          >
            Featured <span className="green">Work</span>
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

        <div className="sweep-line-container">
          <div
            className="sweep-line"
            style={{
              width: `${p * 110}%`,
              opacity: p > 0.05 ? 1 : 0,
            }}
          />
        </div>

        <ProjectsCarousel />
      </div>
    </section>
  );
}
