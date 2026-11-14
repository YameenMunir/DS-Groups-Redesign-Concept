import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Split } from './Text';
import { useGo } from '../lib/useGo';
import { filmScenes, img } from '../data/site';
import { finePointer, prefersReducedMotion } from '../lib/motion';

const SCENE_MS = 7000;
const pad = (n) => String(n).padStart(2, '0');

/* Auto-advancing stills from the brand film. Pausable (WCAG 2.2.2) and frozen while the tab is hidden.
   With reduced motion the scenes never advance on their own, so the pause control is hidden. */
function useScenes(count) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); /* bumps on every change so progress bars restart */
  const [held, setHeld] = useState(false);
  const [hidden, setHidden] = useState(false);

  const show = useCallback((n) => { setIndex(n); setTick((t) => t + 1); }, []);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  /* Restarting the interval whenever tick changes means a manual pick gets a full scene length */
  useEffect(() => {
    if (prefersReducedMotion || held || hidden) return;
    const t = setInterval(() => { setIndex((i) => (i + 1) % count); setTick((x) => x + 1); }, SCENE_MS);
    return () => clearInterval(t);
  }, [count, held, hidden, tick]);

  const toggleHeld = () => {
    if (held) setTick((t) => t + 1); /* resuming restarts the current scene */
    setHeld(!held);
  };
  return { index, tick, held, hidden, show, toggleHeld };
}

export default function HeroFilm() {
  const { index, tick, held, hidden, show, toggleHeld } = useScenes(filmScenes.length);
  const go = useGo();
  const ref = useRef(null);
  const scene = filmScenes[index];

  /* The frame drifts slightly with the pointer */
  const onPointerMove = finePointer && !prefersReducedMotion ? (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  } : undefined;

  const cls = ['film', go && 'go', held && 'held', hidden && 'paused'].filter(Boolean).join(' ');

  return (
    <section className={cls} aria-label="Introduction" ref={ref} style={{ '--dur': `${SCENE_MS}ms` }} onPointerMove={onPointerMove}>
      <div className="frames">
        {filmScenes.map((s, j) => (
          <div key={s.img} className={j === index ? 'fr on' : 'fr'}>
            <img src={img(s.img)} alt={s.alt} width="1456" height="820" decoding="async" style={{ '--fp': s.fp }}
              {...(j === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })} />
          </div>
        ))}
      </div>
      <div className="wrap">
        <p className="label fade-up">A family business since 2001</p>
        <Split as="h1">A family business that believes in delivering happiness through service</Split>
        <div className="row">
          <div>
            <p className="lede fade-up d2">Founded by the Dhillon family, DS Groups has grown from a small family-run venture into a respected franchise group in fast food and fitness.</p>
            <div className="actions fade-up d3">
              <Link className="btn" to="/about-us/our-story">Read our story</Link>
              <Link className="btn line" to="/our-brands">Our brands</Link>
            </div>
          </div>
          <p className="subtitle fade-up d3">
            <span className="tc">Scene {pad(index + 1)} of {pad(filmScenes.length)}, {scene.brand}</span>
            <span className="cap"><span key={tick}>{scene.cap}</span></span>
          </p>
        </div>
        <div className="reelctl fade-up d3">
          <div className="reelbar" role="group" aria-label="Scenes from the DS Groups brand film">
            {filmScenes.map((s, j) => (
              <button key={s.img} type="button" aria-label={`Scene ${j + 1}: ${s.cap}`} aria-pressed={j === index}
                className={j === index ? 'on' : j < index ? 'done' : undefined} onClick={() => show(j)}>
                <i key={tick}></i>
              </button>
            ))}
          </div>
          <button type="button" className="reelpause" hidden={prefersReducedMotion} onClick={toggleHeld}
            aria-label={held ? 'Play scene changes' : 'Pause scene changes'}>
            <svg className="ic-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            <svg className="ic-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
