/**
 * Smooth-scroll to a section without relying on Lenis.
 * Falls back to instant scrolling when the user prefers reduced motion.
 */
export default function scrollToSection(target, offset = 80) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduceMotion ? 'auto' : 'smooth';

  if (!target || target === 0 || target === '#' || target === '#hero') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
}
