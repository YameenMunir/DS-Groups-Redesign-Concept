import { Link } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';
import JourneyReel from '../components/JourneyReel';
import { BrandScenes, Cta, Marquee, PageMeta, Posts } from '../components/Blocks';
import { fp } from '../lib/style';
import { Split, Words } from '../components/Text';
import { img, posts } from '../data/site';

const figures = [
  { value: <span data-count="1999" data-from="1960">1999</span>, label: 'Dip Dhillon buys his first Domino’s store' },
  { value: <span data-count="40">40</span>, label: 'Domino’s stores by 2014' },
  { value: <>Top <span data-count="1" data-suf="%">1%</span></>, label: 'Golden Franny Award, given to the top 1% of Domino’s franchise owners' },
  { value: <span data-count="3">3</span>, label: 'Brands operated today: Domino’s, GDK and Snap Fitness' },
];

const stories = [
  {
    to: posts.lucy.to, photo: 'reel-dough.webp', fp: '52% 18%', link: 'Lucy’s story',
    title: 'Lucy Harman: from answering phones at 16 to owning a store',
    text: 'Lucy began at our Whitstable branch, two evenings a week. She rose from shift manager to store manager, then, with our support and mentoring, became a franchisee and opened her first store in Hayling Island, Hampshire. She is Domino’s first female Homegrown Hero.',
  },
  {
    to: posts.john.to, photo: 'reel-gym.webp', fp: '64% 30%', link: 'John’s story',
    title: 'John Prior: owning his own gym',
    text: 'After ten years as regional manager of our Snap Fitness franchise, John achieved his dream of owning his own gym franchise with our mentoring. In 2024 he was awarded CEO One Team of the Year.',
  },
];

const charities = ['Teenage Cancer Trust', 'Madalani Cancer', 'Parkinson’s UK', 'Ellenor hospice', 'Azizi Life'];

export default function Home() {
  return (
    <>
      <PageMeta title="DS Groups Redesign"
        description="DS Groups is a family-founded franchise group in Kent, operating Domino’s Pizza, German Doner Kebab (GDK) and Snap Fitness. Founded in 2001 by the Dhillon family." />
      <HeroVideo />

      <section className="section opening" id="about" aria-labelledby="say-h">
        <div className="wrap">
          <div className="grid">
            <div className="say">
              <p className="label" data-reveal>About DS Groups</p>
              <Words as="h2" id="say-h" className="big-say">
                Built on values of hard work, integrity and community, we take pride in delivering <em>consistent quality and service</em> across every brand we operate.
              </Words>
            </div>
            <div className="float">
              <figure className="photo" data-reveal="img" style={{ margin: 0 }}>
                <img src={img('founders.webp')} alt="Two members of the DS Groups leadership seated at head office" width="1400" height="788" loading="lazy" decoding="async" data-parallax="-0.08" style={fp('24% 20%')} />
              </figure>
            </div>
          </div>
          <div className="cols">
            <div>
              <p data-reveal>Today DS Groups operates a national network of franchise locations across two leading fast-food brands, Domino’s and German Doner Kebab (GDK), as well as a premier fitness franchise.</p>
              <p data-reveal style={{ '--d': '.05s' }}>Our mission is to deliver outstanding customer experiences, build lasting relationships based on trust, and promote sustainable growth for our team and partners.</p>
              <p data-reveal style={{ '--d': '.1s' }}><Link className="link" to="/about-us">More about us</Link></p>
            </div>
            <figure className="quote" data-reveal style={{ '--d': '.15s', margin: 0, padding: 0, border: 0 }}>
              <blockquote style={{ margin: 0 }}><p>I moved from delivering pizzas to making them, to serving customers, and ultimately learning the business inside out.</p></blockquote>
              <figcaption><cite>Dip Dhillon, co-founder</cite></figcaption>
            </figure>
          </div>
          <dl className="figures" style={{ marginTop: 'clamp(64px,8vw,112px)' }}>
            {figures.map((f, i) => (
              <div data-reveal style={i ? { '--d': `${(i * 0.08).toFixed(2)}s` } : undefined} key={f.label}>
                <dd>{f.value}</dd><dt>{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <JourneyReel title="From one store to a house of brands" />

      <section className="section ink" aria-labelledby="brands-h" style={{ paddingBottom: 'clamp(40px,6vw,72px)' }}>
        <div className="wrap">
          <div className="row-head">
            <div>
              <p className="label" data-reveal>Our brands</p>
              <Split as="h2" id="brands-h" style={{ '--d0': '0s', color: '#fff' }}>A thriving house of brands</Split>
            </div>
            <Link className="link" to="/our-brands" data-reveal>All brands</Link>
          </div>
        </div>
      </section>
      <BrandScenes copy="tagline" />
      <Marquee />

      <section className="section" aria-labelledby="ss-h">
        <div className="wrap">
          <p className="label" data-reveal>Our people</p>
          <Split as="h2" id="ss-h" style={{ '--d0': '0s' }}>Success stories</Split>
          <p className="muted" data-reveal style={{ '--d': '.1s' }}>More than 90% of Domino’s store managers and area managers started out as a delivery driver or a pizza maker.</p>
          <div className="stories">
            {stories.map((s) => (
              <article className="story" key={s.to}>
                <Link to={s.to} tabIndex={-1} aria-hidden="true">
                  <figure className="photo" data-reveal="img" style={{ margin: 0 }}>
                    <img src={img(s.photo)} alt="" width="1456" height="820" loading="lazy" decoding="async" style={fp(s.fp)} />
                  </figure>
                </Link>
                <h3 data-reveal>{s.title}</h3>
                <p data-reveal>{s.text}</p>
                <Link className="link" to={s.to} data-reveal>{s.link}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="give-h">
        <div className="wrap">
          <div className="grid give">
            <div className="a">
              <p className="label" data-reveal id="give-h">Giving back</p>
              <Words as="blockquote" className="big-say say-quote" style={{ marginBottom: 28 }}>
                “Over 2,000 care leavers in Kent and Medway deserve every opportunity to thrive and we’re proud to be partnering with DS Groups to make that happen.”
              </Words>
              <p className="muted" data-reveal style={{ fontSize: '.875rem' }}>Anna Withers, Director of Advocacy and Futures Programmes, YLF</p>
              <p data-reveal style={{ marginTop: 28 }}>We proudly support YLF, a local youth charity in Kent dedicated to helping young people thrive, including those leaving the care system.</p>
              <p data-reveal><Link className="link" to="/giving-back">How we give back</Link></p>
            </div>
            <div className="b">
              <p className="label" data-reveal>Charities we supported in 2025</p>
              <ul className="names">
                {charities.map((c, i) => <li data-reveal style={i ? { '--d': `${(i * 0.05).toFixed(2)}s` } : undefined} key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ins-h">
        <div className="wrap">
          <div className="row-head">
            <div>
              <p className="label" data-reveal>Insights</p>
              <Split as="h2" id="ins-h" style={{ '--d0': '0s' }}>Latest from the group</Split>
            </div>
            <Link className="link" to="/insights" data-reveal>All insights</Link>
          </div>
          <Posts items={['gdk', 'bluewater', 'john']} />
        </div>
      </section>
      <Cta />
    </>
  );
}
