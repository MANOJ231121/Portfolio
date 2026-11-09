import { useEffect, useRef } from 'react';
import SpecularButton from './SpecularButton';
import Lanyard from './Lanyard';
import profileImg from '../assets/profile.jpg';
import scrollToSection from '../utils/scrollTo';

const aboutDetails = [
  { label: 'Name', value: 'Manoj Chandra Joshi' },
  { label: 'Email', value: 'manojjoshi230611@gmail.com' },
  { label: 'Location', value: 'Champawat, Uttarakhand, India' },
  { label: 'Availability', value: 'Open to internships & work', green: true },
];

export default function Hero() {
  const heroRef = useRef(null);

  // Entrance animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      heroRef.current?.classList.add('animate-in');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero hero-merged" id="hero" ref={heroRef}>
      <div className="hero-bg-grid" />
      <div className="hero-content">
        <div className="container hero-layout">
          <div className="hero-intro">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for freelance work
            </div>
            <p className="hero-sub">
              An aspiring developer currently interning at Prodigy Infotech, focused
              on building exceptional digital experiences and accessible, human-centered products.
            </p>
            <div className="hero-buttons">
              <SpecularButton
                size="md"
                radius={100}
                tint="#b9ff66"
                tintOpacity={1}
                textColor="#0a0a0a"
                lineColor="#f4ffe0"
                baseColor="#7fae3a"
                intensity={1.1}
                idleIntensity={0.35}
                shineSize={12}
                shineFade={36}
                thickness={1.3}
                glow={0.9}
                proximity={300}
                style={{ fontWeight: 700 }}
                onClick={() => scrollToSection('#projects')}
              >
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </SpecularButton>
              <SpecularButton
                size="md"
                radius={100}
                tint="#141414"
                tintOpacity={0.95}
                textColor="#f0f0f0"
                lineColor="#b9ff66"
                baseColor="#3a3a3a"
                intensity={1}
                idleIntensity={0.3}
                shineSize={12}
                shineFade={38}
                thickness={1.2}
                glow={0.9}
                proximity={300}
                style={{ fontWeight: 600 }}
                onClick={() => scrollToSection('#contact')}
              >
                Get In Touch
              </SpecularButton>
            </div>
          </div>

          <aside className="hero-side">
            <div className="hero-photo-glow" />
            <div className="hero-lanyard">
              <Lanyard
                frontImage={profileImg}
                imageFit="cover"
                cardColor="#151515"
                orientation="portrait"
                finish="glossy"
                cornerRadius={0.28}
                size={0.62}
                anchor="center"
                strapLength={0.45}
                strapColor="#b9ff66"
                strapWidth={0.7}
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={0.6}
                interactive
                intro
              />
            </div>
            <p className="hero-lanyard-hint">
              Drag the card to swing <span>·</span> click to flip
            </p>
          </aside>

          <div className="hero-about" id="about">
            <span className="hero-about-eyebrow">01 / About</span>
            <p className="about-lead">
              Hello! I'm <span className="green">Manoj Chandra Joshi</span>, an aspiring
              developer who loves turning ideas into reality through clean code
              and thoughtful design.
            </p>
            <p>
              I am a passionate developer who enjoys building responsive and user-friendly
              web applications. I love working at the intersection of design and technology,
              turning ideas into seamless digital experiences.
            </p>
            <div className="about-details">
              {aboutDetails.map((item) => (
                <div key={item.label} className="about-detail">
                  <span className="detail-label">{item.label}</span>
                  <span className={`detail-value ${item.green ? 'green' : ''}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
