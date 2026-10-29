import { useEffect, useRef, useState } from 'react';

/**
 * Butter-smooth, continuous scroll progress hook synchronized with Lenis.
 * Accurately tracks scroll progress `p` from 0.0 (entering) to 1.0 (settled).
 * Clamps to 1.0 when scrolled past so elements NEVER snap or glitch back to 0.
 * Smoothly reverses when scrolling back up.
 */
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start calculating when the top of the element reaches 85% of viewport
      const start = vh * 0.85;
      // Finish when the element is well into view (e.g. 25% past top or height)
      const end = Math.min(vh * 0.15, vh - rect.height * 0.5);

      if (rect.top > start) {
        // Element is still below viewport
        setProgress(0);
        setInView(false);
      } else if (rect.top < end) {
        // Element has fully animated into view and settled (or scrolled past)
        setProgress(1);
        setInView(true);
      } else {
        // Element is currently in the active transition scrub zone
        const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        setProgress(p);
        setInView(true);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Calculate immediately on mount
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return [ref, progress, inView];
}
