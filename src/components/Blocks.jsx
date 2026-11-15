import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Split } from './Text';
import { brands, posts, relatedOrder } from '../data/site';
import { fp } from '../lib/style';

/* Updates the tab title and the description meta tag that index.html ships with */
export function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
  return null;
}

export function ReadingProgress() {
  return <div className="progress" aria-hidden="true"></div>;
}

export function Crumbs({ trail, current }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link><span className="sep">/</span>
      {trail?.map((c) => (
        <Fragment key={c.to}><Link to={c.to}>{c.label}</Link><span className="sep">/</span></Fragment>
      ))}
      <span aria-current="page">{current}</span>
    </nav>
  );
}

/* Page header: full-bleed photo (or type only), breadcrumbs, split heading and lede */
export function PageHead({ image, crumbs, title, eyebrow, lede, ledeDelay = '.6s', className = 'has-img', style, current }) {
  return (
    <header className={`page-head ${className}`} style={style}>
      {image && <img src={image.src} alt={image.alt} width="1400" height="788" fetchPriority="high" data-parallax="-0.12" style={fp(image.fp)} />}
      <div className="wrap">
        {crumbs !== false && <Crumbs trail={crumbs} current={current ?? title} />}
        {eyebrow}
        <Split as="h1">{title}</Split>
        {lede && <p className="lede" data-reveal style={{ '--d': ledeDelay }}>{lede}</p>}
      </div>
    </header>
  );
}

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <img src="/assets/img/gdk-bluewater.webp" alt="" width="1400" height="769" loading="lazy" data-parallax="-0.1" style={fp('46% 42%')} />
      <div className="wrap">
        <p className="label" data-reveal>Work with us</p>
        <Split as="h2" id="cta-h" style={{ '--d0': '0s' }}>Join the DS Groups family</Split>
        <p data-reveal style={{ '--d': '.1s' }}>Questions about the group, our brands or working with us? Get in touch and we will point you to the right person.</p>
        <div className="actions" data-reveal style={{ '--d': '.2s' }}>
          <Link className="btn" to="/contacts">Contact us</Link>
          <Link className="btn line" to="/about-us/our-story">Read our story</Link>
        </div>
      </div>
    </section>
  );
}

/* A row of insight cards. items: post keys from data/site, or [key, { title }] to retitle a card. */
export function Posts({ items, style }) {
  return (
    <div className="posts" style={style}>
      {items.map((item, i) => {
        const [key, over] = Array.isArray(item) ? item : [item, {}];
        const p = { ...posts[key], ...over };
        const inner = <><time>{p.date}</time><h3>{p.title}</h3><span className="tag">{p.tag}</span></>;
        const props = { className: 'post', 'data-reveal': true, style: { '--d': `${(i * 0.06).toFixed(2)}s` } };
        return p.to
          ? <Link key={key} to={p.to} {...props}>{inner}</Link>
          : <a key={key} href={p.href} {...props}>{inner}</a>;
      })}
    </div>
  );
}

export function BrandLogo({ brand, className, alt = brand.logo.alt }) {
  const { src, w, h, k } = brand.logo;
  return <img className={className} src={src} alt={alt} width={w} height={h} style={{ '--k': k }} loading="lazy" decoding="async" />;
}

export function RelatedBrands({ current }) {
  return (
    <div className="related">
      {relatedOrder.map((id) => brands.find((b) => b.id === id)).map((b) => (
        <Link key={b.id} to={b.to} aria-current={b.id === current ? 'page' : undefined}>
          <img src={b.photo.src} alt="" width="1400" height="788" loading="lazy" style={fp(b.photo.fp)} />
          <span><BrandLogo brand={b} className="rel-logo" alt={b.longName ?? b.logo.alt} /></span>
        </Link>
      ))}
    </div>
  );
}

/* Full-screen brand scenes that slide up over each other. copy: 'tagline' (home) or 'intro' (our brands) */
export function BrandScenes({ copy = 'tagline' }) {
  return (
    <div className="bscenes">
      {brands.map((b) => (
        <article className="bscene" key={b.id} style={{ '--brand': b.color }}>
          <div className="bscene-pin">
            <img src={b.photo.src} alt={b.photo.alt} width="1400" height="788" loading="lazy" decoding="async" style={fp(b.photo.fp)} />
            <div className="wrap">
              <div className="copy">
                <p className="since"><i></i>With DS Groups since {b.since}</p>
                <h3><BrandLogo brand={b} className="blogo" /></h3>
                <p>{b[copy]}</p>
                <div className="actions"><Link className="btn" to={b.to}>Discover {b.short}</Link></div>
              </div>
            </div>
            <span className="num" aria-hidden="true">{b.since}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* Brand names running across the screen; speed follows scroll velocity (see lib/motion) */
export function Marquee() {
  const items = ['dominos', 'gdk', 'snap'].map((id) => brands.find((b) => b.id === id));
  return (
    <div className="mega" aria-hidden="true">
      <div className="run">
        {Array.from({ length: 12 }, (_, i) => {
          const b = items[i % 3];
          /* width/height reserve the logo's space so the loop width is right before the image loads */
          return (
            <span key={i}>
              <img src={b.logo.src} width={b.logo.w} height={b.logo.h} alt="" decoding="async" />
              {b.id === 'dominos' ? 'Domino’s Pizza' : b.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

