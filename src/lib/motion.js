import { useEffect } from 'react';

const mq = (q) => (typeof window !== 'undefined' ? window.matchMedia(q) : { matches: false, addEventListener() {}, removeEventListener() {} });

export const prefersReducedMotion = mq('(prefers-reduced-motion: reduce)').matches;
export const finePointer = mq('(pointer: fine)').matches;
export const phoneMQ = mq('(max-width: 760px)');
export const smallMQ = mq('(max-width: 1000px)');

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* Scroll reveals ([data-reveal]) and number counters ([data-count]) for the current page */
function setupReveals(scope) {
  const cleanups = [];
  const reveal = scope.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.01 });
    reveal.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  } else reveal.forEach((el) => el.classList.add('in'));

  const runCount = (el) => {
    const to = parseFloat(el.dataset.count), from = parseFloat(el.dataset.from || 0);
    const pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    if (prefersReducedMotion) { el.textContent = pre + to + suf; return; }
    let t0 = null, raf;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(from + (to - from) * e) + suf;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    cleanups.push(() => cancelAnimationFrame(raf));
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    scope.querySelectorAll('[data-count]').forEach((c) => cio.observe(c));
    cleanups.push(() => cio.disconnect());
  }
  return () => cleanups.forEach((fn) => fn());
}

/* One requestAnimationFrame loop for every scroll-linked effect on the page: letterbox retract (home),
   the pinned journey reel, brand scenes, words lighting up, the velocity marquee, parallax and the
   reading progress bar. Styles are written straight to the DOM so scrolling never re-renders React. */
function setupScrollLoop(scope, { isHome }) {
  const root = document.documentElement;
  const reduce = prefersReducedMotion;
  const lbs = document.querySelectorAll('.lb');

  const reel = scope.querySelector('.reel');
  const track = reel?.querySelector('.track');
  const frames = reel ? [...reel.querySelectorAll('.frame')] : [];
  const count = reel?.querySelector('.reel-count b');
  let reelExtra = 0;
  const pinned = () => reel && !reduce && !phoneMQ.matches;
  const sizeReel = () => {
    if (!reel) return;
    if (pinned()) { reelExtra = track.scrollWidth - window.innerWidth; reel.style.height = (window.innerHeight + Math.max(0, reelExtra)) + 'px'; }
    else { reel.style.height = ''; track.style.transform = ''; }
  };

  const scenes = [...scope.querySelectorAll('.bscene')];
  const wordEls = [...scope.querySelectorAll('[data-words]')].map((el) => ({ el, w: el.querySelectorAll('.w'), n: -1 }));
  const par = reduce ? [] : [...scope.querySelectorAll('[data-parallax]')];
  const bar = document.querySelector('.progress');

  const megas = [...scope.querySelectorAll('.mega .run')].map((el) => ({ el, x: 0, w: 0, vis: true }));
  let mio;
  if ('IntersectionObserver' in window && megas.length) {
    mio = new IntersectionObserver((es) => es.forEach((e) => megas.forEach((m) => { if (m.el.parentElement === e.target) m.vis = e.isIntersecting; })));
    megas.forEach((m) => mio.observe(m.el.parentElement));
  }

  let lastY = window.scrollY, vel = 0, dirty = true, lbRest = 0, raf, alive = true;
  const readRest = () => { lbRest = parseFloat(getComputedStyle(document.body).getPropertyValue('--lb-rest')) || 0; };

  const tick = () => {
    if (!alive) return;
    const y = window.scrollY, vh = window.innerHeight, vw = window.innerWidth;
    const moved = y !== lastY;
    vel = vel * 0.85 + (y - lastY) * 0.15; lastY = y;
    /* Idle frames do no layout work: only scrolling, a resize or the marquee needs the loop */
    const live = !reduce && megas.some((m) => m.vis);
    if (!moved && !dirty && !live && Math.abs(vel) < 0.05) { raf = requestAnimationFrame(tick); return; }
    dirty = false;

    if (isHome && !reduce) {
      const lbNow = Math.max(0, 1 - y / 320) * (lbRest * vh / 100);
      lbs.forEach((l) => { if (!l.classList.contains('cut')) l.style.setProperty('--lb', lbNow.toFixed(1) + 'px'); });
    }

    if (pinned() && reelExtra > 0) {
      const r = reel.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh), 0, 1);
      track.style.transform = `translate3d(${(-p * reelExtra).toFixed(1)}px,0,0)`;
      reel.style.setProperty('--rp', p.toFixed(4));
      let best = 0, bd = 1e9;
      frames.forEach((f, j) => {
        const fr = f.getBoundingClientRect();
        const dist = (fr.left + fr.width / 2 - vw * 0.42) / vw, a = Math.abs(dist);
        if (a < bd) { bd = a; best = j; }
        f.style.setProperty('--fs', (1 - Math.min(a, 0.6) * 0.1).toFixed(3));
        f.style.setProperty('--fo', (1 - Math.min(a, 0.7) * 0.75).toFixed(3));
        f.style.setProperty('--fx', (clamp(dist, -1, 1) * -6).toFixed(2));
      });
      if (count) count.textContent = frames[best].dataset.year;
    }

    if (!phoneMQ.matches) scenes.forEach((s) => {
      const r = s.getBoundingClientRect(); if (r.bottom < -vh || r.top > vh * 1.2) return;
      const p = reduce ? 1 : clamp(1 - r.top / vh, 0, 1);
      s.style.setProperty('--p', (p * p * (3 - 2 * p)).toFixed(4));
    });

    wordEls.forEach((o) => {
      const r = o.el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const p = reduce ? 1 : clamp((vh * 0.92 - r.top) / (r.height + vh * 0.3), 0, 1);
      const n = Math.round(p * o.w.length);
      if (o.n === n) return; o.n = n;
      for (let i = 0; i < o.w.length; i++) o.w[i].classList.toggle('on', i < n);
    });

    megas.forEach((m) => {
      if (!m.vis || reduce) return;
      if (!m.w) m.w = m.el.scrollWidth / 2;
      m.x -= 0.6 + Math.min(Math.abs(vel), 60) * 0.35;
      if (-m.x >= m.w) m.x += m.w;
      m.el.style.transform = `translate3d(${m.x.toFixed(1)}px,0,0)`;
    });

    if (!phoneMQ.matches) par.forEach((el) => {
      const r2 = el.parentElement.getBoundingClientRect();
      const off = clamp((r2.top + r2.height / 2 - vh / 2) * parseFloat(el.dataset.parallax), -90, 90);
      el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
    });

    if (bar) { const h = root.scrollHeight - vh; root.style.setProperty('--read', h > 0 ? (y / h).toFixed(4) : 0); }
    raf = requestAnimationFrame(tick);
  };

  const refresh = () => { sizeReel(); readRest(); dirty = true; };
  const onResize = () => { refresh(); megas.forEach((m) => { m.w = 0; }); };
  const onPhone = () => { if (phoneMQ.matches) par.forEach((el) => { el.style.transform = ''; }); refresh(); };
  refresh();
  window.addEventListener('resize', onResize);
  window.addEventListener('load', refresh);
  phoneMQ.addEventListener('change', onPhone);
  document.fonts?.ready.then(() => alive && refresh());
  /* Images above the reel can change its position once they load */
  const imgs = [...scope.querySelectorAll('img')].filter((i) => !i.complete);
  imgs.forEach((i) => i.addEventListener('load', refresh, { once: true }));
  raf = requestAnimationFrame(tick);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    mio?.disconnect();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('load', refresh);
    phoneMQ.removeEventListener('change', onPhone);
    imgs.forEach((i) => i.removeEventListener('load', refresh));
    root.style.removeProperty('--read');
  };
}

/* Wires up every imperative effect for the page currently in <main>. Re-runs on each route change. */
export function usePageMotion(pathname) {
  useEffect(() => {
    const scope = document.getElementById('content');
    if (!scope) return;
    const a = setupReveals(scope);
    const b = setupScrollLoop(scope, { isHome: pathname === '/' });
    return () => { a(); b(); };
  }, [pathname]);
}
