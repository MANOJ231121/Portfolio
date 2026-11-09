import { useEffect, useRef, useState } from 'react';

/**
 * Continuous scroll progress for a section.
 * Tracks `p` from 0.0 (entering) to 1.0 (settled), and stays clamped at 1.0
 * once the section has passed so elements never snap back to 0.
 * Smoothly reverses when scrolling back up.
 */
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const lastProgress = useRef(0);
  const lastInView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start calculating when the top of the element reaches 85% of viewport.
      // Finish when the element is well into view.
      const start = vh * 0.85;
      const end = Math.min(vh * 0.15, vh - rect.height * 0.5);

      let nextProgress = 0;
      let nextInView = false;

      if (rect.top > start) {
        // Element is still below viewport
        nextProgress = 0;
      } else if (rect.top < end) {
        // Element has fully animated into view and settled (or scrolled past)
        nextProgress = 1;
        nextInView = true;
      } else {
        // Element is currently in the active transition scrub zone
        nextProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        nextInView = true;
      }

      // Only update state when values actually change, so settled sections
      // stop re-rendering on every scroll frame.
      if (Math.abs(nextProgress - lastProgress.current) > 0.001) {
        lastProgress.current = nextProgress;
        setProgress(nextProgress);
      }
      if (nextInView !== lastInView.current) {
        lastInView.current = nextInView;
        setInView(nextInView);
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
