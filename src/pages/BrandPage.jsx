import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo, Cta, PageHead, PageMeta, Posts, RelatedBrands } from '../components/Blocks';
import { Split } from '../components/Text';
import { fp } from '../lib/style';
import { brands, img } from '../data/site';
import { brandPages } from '../data/brandPages';

/* One template for the Domino’s, GDK and Snap Fitness pages */
export default function BrandPage({ id }) {
  const brand = brands.find((b) => b.id === id);
  const page = brandPages[id];

  return (
    <>
      <PageMeta title={page.title} description={page.description} />
      <PageHead
        className="has-img brand-hero"
        style={{ '--brand': brand.color }}
        image={{ src: brand.photo.src, alt: brand.photo.alt, fp: brand.photo.fp }}
        crumbs={[{ to: '/our-brands', label: 'Our brands' }]}
        title={brand.name}
        lede={page.lede}
        ledeDelay=".1s"
        eyebrow={<>
          <div className="tag-line" data-reveal><i></i><span className="muted" style={{ color: '#d0d5da' }}>Since {brand.since} with DS Groups</span></div>
          <div data-reveal><BrandLogo brand={brand} className="hero-logo" alt="" /></div>
        </>}
      />
      <section className="section">
        <div className="wrap">
          <div className="grid split">
            <div className="a">
              <p className="label" data-reveal>At a glance</p>
              <dl className="facts-list">
                {page.facts.map(([dt, dd]) => <div data-reveal key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}
              </dl>
              <div className="actions" data-reveal><Link className="btn" to="/contacts">Contact us</Link></div>
            </div>
            <div className="b prose">
              {page.prose.map((s) => (
                <Fragment key={s.h}>
                  <Split as="h2" style={{ '--d0': '0s' }}>{s.h}</Split>
                  {s.p.map((t) => <p data-reveal key={t}>{t}</p>)}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="gallery">
            {page.gallery.map((g) => (
              <figure className="photo" data-reveal="img" style={{ margin: 0 }} key={g.img}>
                <img src={img(g.img)} alt={g.alt} width="1456" height="820" loading="lazy" decoding="async" style={fp(g.fp)} />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>From our insights</p>
          <Posts items={[page.post]} />
          <p className="label" data-reveal style={{ marginTop: 80 }}>Our brands</p>
          <RelatedBrands current={id} />
        </div>
      </section>
      <Cta />
    </>
  );
}
