import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlowCursor from './components/GlowCursor';
import './App.css';

/**
 * Top scroll-progress indicator.
 * Kept in its own component so App (and every section) doesn't re-render on scroll.
 */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

export default function App() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
      <GlowCursor
        className="glow-cursor--page"
        color="#b9ff66"
        secondaryColor="#6fae2e"
        intensity={1.15}
        trailWidth={3}
        linger={1.2}
        glow={1.1}
        hotspot={0.8}
        followSpeed={0.75}
        clickBurst
        quality="medium"
        theme="dark"
        maxDevicePixelRatio={1.5}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
