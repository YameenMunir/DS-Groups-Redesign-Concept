import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Split } from './Text';
import { useGo } from '../lib/useGo';
import { brands, relatedOrder } from '../data/site';
import { prefersReducedMotion } from '../lib/motion';

/* The original DS Groups homepage reel (Banner_ds_web_reel.webm from dsgroups.co.uk), re-encoded without its audio
   track in two sizes and two codecs. Phones and small tablets get 720p; larger screens get 1080p. */
const VIDEO = '/assets/video/ds-hero';
const POSTER = '/assets/img/ds-hero-poster';

/* Skip the video entirely for visitors who asked to save data or are on a very slow connection: the poster
   (the reel's first frame) stands in. With reduced motion the video loads but never starts on its own. */
function pickSources() {
  if (typeof window === 'undefined') return null;
  const c = navigator.connection;
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return null;
  const size = window.matchMedia('(max-width: 900px)').matches ? 720 : 1080;
  return [
    { src: `${VIDEO}-${size}.webm`, type: 'video/webm; codecs="vp9"' },
    { src: `${VIDEO}-${size}.mp4`, type: 'video/mp4; codecs="avc1.640028"' },
  ];
}

const heroBrands = relatedOrder.map((id) => brands.find((b) => b.id === id));

export default function HeroVideo() {
  const go = useGo();
  const video = useRef(null);
  const [sources] = useState(pickSources);
  const [playing, setPlaying] = useState(false);   /* frames are actually moving (drives the fade-in) */
  const [held, setHeld] = useState(prefersReducedMotion); /* visitor paused it, or reduced motion */
  const heldRef = useRef(held);
  useEffect(() => { heldRef.current = held; }, [held]);

  /* Autoplay: React does not write the `muted` attribute, and iOS Safari refuses to autoplay without it,
     so set it on the element directly and start playback ourselves. Low Power Mode can still block play();
     the poster then stays up and the control offers to play. */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
    const onPlaying = () => setPlaying(true);
    v.addEventListener('playing', onPlaying);

    const tryPlay = () => { if (!heldRef.current && v.paused) v.play()?.catch(() => setHeld(true)); };
    tryPlay();

    /* Off screen or in a background tab, the video stops decoding */
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tryPlay(); else v.pause(); }, { threshold: 0.05 });
      io.observe(v);
    }
    const onVis = () => { if (document.hidden) v.pause(); else tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      v.removeEventListener('playing', onPlaying);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (held) { setHeld(false); v.play()?.catch(() => setHeld(true)); }
    else { setHeld(true); v.pause(); }
  };

  /* Smooth scroll for the cue only (a global scroll-behavior would also animate the jump to top between pages) */
  const toNext = (e) => {
    const next = document.getElementById('about');
    if (!next) return;
    e.preventDefault();
    next.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const cls = ['vhero', go && 'go', playing && 'playing'].filter(Boolean).join(' ');

  return (
    <section className={cls} aria-labelledby="hero-h">
      <div className="vhero-media" aria-hidden="true">
        <img className="vhero-poster" src={`${POSTER}.webp`} srcSet={`${POSTER}-960.webp 960w, ${POSTER}.webp 1920w`}
          sizes="100vw" alt="" width="1920" height="1080" fetchPriority="high" decoding="async" />
        {sources && (
          <video ref={video} className="vhero-video" muted loop playsInline preload="auto" disablePictureInPicture
            disableRemotePlayback controlsList="nodownload nofullscreen" tabIndex={-1}>
            {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
          </video>
        )}
      </div>

      <div className="vhero-body wrap">
        <Split as="h1" id="hero-h" style={{ '--d0': '.45s' }}>A Family Business That Believes in Delivering Happiness Through Service</Split>
        <p className="lede vh-in" style={{ '--vd': '1.25s' }}>
          Founded by the Dhillon family in 2001, DS Groups has grown from one Domino’s store into a franchise group spanning fast food and fitness.
        </p>
        <div className="actions vh-in" style={{ '--vd': '1.4s' }}>
          <Link className="btn btn-lg" to="/about-us/our-story">Discover Our Story</Link>
        </div>
      </div>

      <div className="vhero-bar wrap vh-in" style={{ '--vd': '1.65s' }}>
        <nav className="vhero-brands" aria-label="Our brands">
          {heroBrands.map((b) => (
            <Link key={b.id} to={b.to} style={{ '--k': b.logo.k }}>
              <img src={b.logo.src.replace('.png', '-white.png')} alt={b.name} width={b.logo.w} height={b.logo.h} decoding="async" />
            </Link>
          ))}
        </nav>
        <div className="vhero-ctl">
          <a className="vhero-scroll" href="#about" onClick={toNext}>
            <span className="vhero-scroll-text">Scroll to explore</span>
            <span className="vhero-scroll-line" aria-hidden="true"><i></i></span>
          </a>
          {sources && (
            <button type="button" className="vhero-toggle" onClick={toggle}
              aria-label={held ? 'Play background video' : 'Pause background video'}>
              {held
                ? <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
