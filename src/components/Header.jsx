import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contact, mainNav } from '../data/site';
import { smallMQ } from '../lib/motion';

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('dsg-theme', theme); } catch { /* storage blocked */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))];
}

/* Transparent over the hero, solid once scrolled. On small screens it tucks away while
   scrolling down and comes back on scroll up. */
function useHeaderScroll(menuOpen) {
  const [solid, setSolid] = useState(false);
  const [tuck, setTuck] = useState(false);
  const lastY = useRef(0);
  const open = useRef(menuOpen);
  useEffect(() => { open.current = menuOpen; }, [menuOpen]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (smallMQ.matches && !open.current) {
        if (y > lastY.current + 6 && y > 160) setTuck(true);
        else if (y < lastY.current - 6 || y < 160) setTuck(false);
      } else setTuck(false);
      lastY.current = y;
    };
    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return { solid, tuck: tuck && !menuOpen };
}

function useMediaQuery(mql) {
  const [matches, setMatches] = useState(mql.matches);
  useEffect(() => {
    const on = (e) => setMatches(e.matches);
    mql.addEventListener('change', on);
    return () => mql.removeEventListener('change', on);
  }, [mql]);
  return matches;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const small = useMediaQuery(smallMQ);
  const { solid, tuck } = useHeaderScroll(open);
  const navRef = useRef(null);
  const btnRef = useRef(null);

  const setMenu = useCallback((next, restoreFocus) => {
    setOpen(next);
    if (!next && restoreFocus) btnRef.current?.focus();
  }, []);

  /* Lock page scroll and style the open menu */
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      const t = setTimeout(() => navRef.current?.querySelector('a')?.focus({ preventScroll: true }), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Close when the screen grows past the mobile layout, or when a new page opens */
  const { pathname } = useLocation();
  const closeKey = `${small}|${pathname}`;
  const [lastKey, setLastKey] = useState(closeKey);
  if (closeKey !== lastKey) { setLastKey(closeKey); setOpen(false); }

  /* Escape closes; Tab stays inside the menu and its toggle while open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenu(false, true); return; }
      if (e.key !== 'Tab') return;
      const f = [btnRef.current, ...navRef.current.querySelectorAll('a, button')];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setMenu]);

  const closeOnPick = (e) => { if (e.target.closest('a') && small) setMenu(false); };
  const light = theme === 'light';

  return (
    <header className={['site-header', solid && 'solid', tuck && 'tuck'].filter(Boolean).join(' ')}>
      <div className="wrap">
        <Link className="brand" to="/" aria-label="DS Groups home">
          <img src="/assets/img/ds-monogram.png" alt="" width="179" height="196" /><span>DS Groups</span>
        </Link>
        <nav className={open ? 'nav open' : 'nav'} id="site-nav" aria-label="Main" ref={navRef} onClick={closeOnPick} inert={small && !open}>
          <ul>
            {mainNav.map((item) => (
              <li key={item.to}><NavLink className="nl" to={item.to} end>{item.label}</NavLink></li>
            ))}
          </ul>
          <Link className="btn" to="/contacts">Contact us</Link>
          <div className="nav-meta">
            <p><strong>Call us</strong>{contact.phone}</p>
            <p><strong>Email us</strong>{contact.email}</p>
          </div>
        </nav>
        <div className="head-tools">
          <button className="icon-btn theme-btn" type="button" onClick={toggleTheme}
            aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'} title={light ? 'Dark mode' : 'Light mode'}>
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button className="icon-btn menu-btn" type="button" ref={btnRef} onClick={() => setMenu(!open, true)}
            aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
