import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LenisHUD from './components/LenisHUD';
import './App.css';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [skewEnabled, setSkewEnabled] = useState(true);
  const skewRef = useRef(null);

  // Initialize Lenis Smooth Scroll with butter-smooth exponential decay
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -70, duration: 1.2 },
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    const handleScroll = ({ progress }) => {
      setScrollProgress(progress);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Velocity-driven kinetic skew animation (Lenis.dev signature effect)
  useEffect(() => {
    let rafId;
    let currentSkew = 0;
    let targetSkew = 0;

    const onScroll = (e) => {
      if (!skewEnabled) {
        targetSkew = 0;
        return;
      }
      // Clamped skew proportional to scroll velocity
      const v = e.velocity || 0;
      targetSkew = Math.max(-2.5, Math.min(2.5, v * 0.04));
    };

    const updateSkew = () => {
      // Lerp for smooth elastic rebound
      currentSkew += (targetSkew - currentSkew) * 0.14;

      if (Math.abs(currentSkew) < 0.005) {
        currentSkew = 0;
      }

      if (skewRef.current) {
        skewRef.current.style.transform =
          currentSkew === 0 ? 'none' : `skewY(${currentSkew.toFixed(3)}deg)`;
      }

      // Natural damping decay
      targetSkew *= 0.9;

      rafId = requestAnimationFrame(updateSkew);
    };

    window.lenis?.on('scroll', onScroll);
    rafId = requestAnimationFrame(updateSkew);

    return () => {
      window.lenis?.off('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [skewEnabled]);

  // Cursor follower effect
  useEffect(() => {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;

    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const addHover = () => cursor.classList.add('hover');
    const removeHover = () => cursor.classList.remove('hover');

    window.addEventListener('mousemove', move);

    const interactives = document.querySelectorAll(
      'a, button, .project-card, .skill-group, .cert-card, input, textarea'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Top glowing scroll progress indicator */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Lenis Telemetry HUD */}
      <LenisHUD
        skewEnabled={skewEnabled}
        onToggleSkew={() => setSkewEnabled(!skewEnabled)}
      />

      <div className="cursor-follower" />
      <Navbar />

      {/* Kinetic Skew Content Wrapper */}
      <div className="lenis-skew-wrapper" ref={skewRef}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
