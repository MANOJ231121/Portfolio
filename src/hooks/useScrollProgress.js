import { useEffect, useRef, useState } from 'react';

export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        const visible = rect.top < vh * 0.85 && rect.bottom > 0;
        setInView(visible);

        const start = vh * 0.85;
        const end = -rect.height * 0.3;
        const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        setProgress(p);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [ref, progress, inView];
}
