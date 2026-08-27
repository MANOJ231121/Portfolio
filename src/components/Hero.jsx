import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      heroRef.current?.classList.add('animate-in');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const heading = headingRef.current;
    if (!hero || !content) return;

    let ticking = false;
    let ready = false;

    // Wait for entrance animation to finish before scroll takes over
    const readyTimer = setTimeout(() => { ready = true; }, 1200);

    const onScroll = () => {
      if (ticking || !ready) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrollY / (vh * 0.6), 1);

        const heroEl = hero;
        const ease = progress * progress;

        heroEl.style.setProperty('--scroll', ease);

        // Main content: zoom in + tilt + blur + fade
        const scale = 1 + ease * 0.8;
        const rotateY = ease * 25;
        const rotateX = ease * -8;
        const translateX = ease * 60;
        const translateY = ease * -120;
        const opacity = 1 - ease * 1.2;
        const blur = ease * 10;

        content.style.transform = `
          perspective(1000px)
          scale(${scale})
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          translate3d(${translateX}px, ${translateY}px, 0)
        `;
        content.style.opacity = Math.max(0, opacity);
        content.style.filter = `blur(${blur}px)`;

        // Heading lines scatter apart
        if (heading) {
          const lines = heading.querySelectorAll('.hero-line');
          lines.forEach((line, i) => {
            const scatterX = (i - 1) * ease * 200;
            const scatterY = ease * (i === 1 ? -80 : i === 0 ? 60 : 100);
            const lineRotate = (i - 1) * ease * 15;
            const lineScale = 1 - ease * 0.3;
            line.style.transform = `translate(${scatterX}px, ${scatterY}px) rotate(${lineRotate}deg) scale(${lineScale})`;
            line.style.opacity = Math.max(0, 1 - ease * 1.5);
          });
        }

        // Scroll indicator: spin + fly up + zoom
        if (scrollIndicator) {
          const indicatorProgress = Math.min(scrollY / (vh * 0.15), 1);
          const indicatorScale = 1 + indicatorProgress * 3;
          const indicatorRotate = indicatorProgress * 360;
          const indicatorY = indicatorProgress * -200;
          const indicatorOpacity = 1 - indicatorProgress * 1.5;

          scrollIndicator.style.transform = `
            translateX(-50%)
            translateY(${indicatorY}px)
            scale(${indicatorScale})
            rotate(${indicatorRotate}deg)
          `;
          scrollIndicator.style.opacity = Math.max(0, indicatorOpacity);
        }

        // Background grid: warp with perspective
        const grid = hero.querySelector('.hero-bg-grid');
        if (grid) {
          grid.style.transform = `scale(${1 + ease * 0.5}) rotate(${ease * 5}deg)`;
          grid.style.opacity = Math.max(0, 1 - ease * 1.3);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg-grid" />
      <div className="hero-content" ref={contentRef}>
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for freelance work
          </div>
          <h1 className="hero-heading" ref={headingRef}>
            <span className="hero-line">I craft</span>
            <span className="hero-line hero-line-green">
              digital experiences<span className="hero-dot">.</span>
            </span>
            <span className="hero-line">that inspire.</span>
          </h1>
          <p className="hero-sub">
            An aspiring developer currently interning at Prodigy Infotech, focused
            on building exceptional digital experiences and accessible, human-centered products.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat" data-animate="fade-up" data-delay="5">
              <span className="stat-number">1</span>
              <span className="stat-label">Internship</span>
            </div>
            <div className="stat-divider" />
            <div className="stat" data-animate="fade-up" data-delay="6">
              <span className="stat-number">3+</span>
              <span className="stat-label">Projects Built</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <div className="scroll-line" />
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
