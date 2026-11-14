import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './motion';

/* Returns true once an entrance animation should play, which adds the "go" class.
   - With a ref: waits until the element scrolls into view, so headings further down
     the page animate when the visitor reaches them, not unseen at page load.
   - Without a ref: fires two frames after mount (used by the hero, which is always in view).
   With reduced motion it is true from the start, so nothing animates. */
export function useGo(ref) {
  const [go, setGo] = useState(prefersReducedMotion);
  useEffect(() => {
    if (go) return;
    const el = ref?.current;
    if (el && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setGo(true); io.disconnect(); }
      }, { rootMargin: '0px 0px -12% 0px' });
      io.observe(el);
      return () => io.disconnect();
    }
    let b;
    const a = requestAnimationFrame(() => { b = requestAnimationFrame(() => setGo(true)); });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [go, ref]);
  return go;
}
