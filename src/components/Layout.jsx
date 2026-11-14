import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { prefersReducedMotion, usePageMotion } from '../lib/motion';

const CUT_MS = 560;

/* "Cuts" between pages: the letterbox bars close over the page, then the next page opens.
   Intercepts internal link clicks in the capture phase, before React Router's own handler. */
function usePageCuts(setCutting) {
  const navigate = useNavigate();
  useEffect(() => {
    if (prefersReducedMotion) return;
    let timer;
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href') || '';
      if (/^(https?:|mailto:|tel:|#)/.test(href) || a.origin !== location.origin) return;
      if (a.pathname === location.pathname && a.hash) return;
      e.preventDefault();
      setCutting(true);
      timer = setTimeout(() => navigate(a.pathname + a.search + a.hash), CUT_MS);
    };
    document.addEventListener('click', onClick, true);
    return () => { document.removeEventListener('click', onClick, true); clearTimeout(timer); };
  }, [navigate, setCutting]);
}

/* Every page opens at the top; a #hash link keeps its own target */
function useScrollOnNavigate({ pathname, hash }) {
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);
  useLayoutEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;
  /* A cut runs until the next location arrives (including Back/Forward), then resets */
  const [cutting, setCutting] = useState(false);
  const [seenKey, setSeenKey] = useState(location.key);
  if (location.key !== seenKey) { setSeenKey(location.key); setCutting(false); }

  usePageCuts(setCutting);
  useScrollOnNavigate(location);

  /* Page-level classes the stylesheet keys off. Runs before the motion hook reads --lb-rest. */
  useLayoutEffect(() => {
    document.body.classList.add('has-hero');
    document.body.classList.toggle('home', pathname === '/');
  }, [pathname]);

  useEffect(() => { document.documentElement.classList.toggle('cutting', cutting); }, [cutting]);

  usePageMotion(pathname);

  return (
    <>
      {/* Keyed by path so the opening animation replays on every page */}
      <Fragment key={pathname}>
        <div className={cutting ? 'lb lb-t cut' : 'lb lb-t'} aria-hidden="true"></div>
        <div className={cutting ? 'lb lb-b cut' : 'lb lb-b'} aria-hidden="true"></div>
        <div className="lb-mark" aria-hidden="true"><img src="/assets/img/ds-monogram.png" alt="" width="179" height="196" /></div>
      </Fragment>
      <div className="grain" aria-hidden="true"></div>
      <a className="skip" href="#content">Skip to main content</a>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
