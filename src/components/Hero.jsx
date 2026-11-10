import { useEffect, useRef } from 'react';
import SpecularButton from './SpecularButton';
import Lanyard from './Lanyard';
import profileImg from '../assets/profile.jpg';
import scrollToSection from '../utils/scrollTo';

const aboutDetails = [
  { label: 'Name', value: 'Manoj Chandra Joshi' },
  { label: 'Email', value: 'manojjoshi230611@gmail.com' },
  { label: 'Location', value: 'Champawat, Uttarakhand, India' },
  { label: 'Availability', value: 'Available for freelance work', green: true },
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
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          src={`${import.meta.env.BASE_URL}video/hero-bg.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="hero-video-overlay" />
        <div className="hero-noise" />
      </div>
      <div className="hero-content">
        <div className="container hero-layout">
          <div className="hero-intro">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for freelance work
            </div>

            <h1 className="hero-title">
              Hi, I’m
              <span className="hero-title-name">Manoj Chandra Joshi</span>
            </h1>

            <p className="hero-sub">
              A developer who loves building clean, user-friendly and impactful digital experiences at the intersection of design and technology.
            </p>

            <div className="hero-tags">
              <div className="hero-tag">
                <svg className="hero-tag-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>Full-Stack Developer</span>
              </div>
              <div className="hero-tag">
                <svg className="hero-tag-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
                <span>Problem Solver</span>
              </div>
              <div className="hero-tag">
                <svg className="hero-tag-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 9V4s3.03.55 4 2c1.08 1.62 0 5 0 5" />
                </svg>
                <span>Open Source Contributor</span>
              </div>
            </div>

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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
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
                damping={0.4}
                elasticity={0.5}
                breeze={0.9}
                interactive
                intro
              />
            </div>
          </aside>

          <div className="hero-about" id="about">
            <span className="hero-about-eyebrow">01 / About</span>
            <p className="about-lead">
              Hello! I'm <span className="green">Manoj Chandra Joshi</span>, a developer who loves building clean, user-friendly and impactful digital experiences at the intersection of design and technology.
            </p>
            <p>
              I am passionate about turning ideas into seamless digital experiences through clean code, thoughtful architecture, and accessible interfaces.
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
