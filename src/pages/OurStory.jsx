import JourneyReel from '../components/JourneyReel';
import { Cta, PageHead, PageMeta, ReadingProgress } from '../components/Blocks';
import { Split, Words } from '../components/Text';

export default function OurStory() {
  return (
    <>
      <PageMeta title="Our story | DS Groups" description="How Dip and Jit Dhillon grew a single Domino’s store, bought in 1999, into the multi-brand franchise group DS Groups." />
      <ReadingProgress />
      <PageHead
        image={{ src: '/assets/img/reel-founders.webp', alt: 'DS Groups leadership in conversation', fp: '71% 32%' }}
        crumbs={[{ to: '/about-us', label: 'About us' }]}
        title="From delivery driver to franchise group"
        current="Our story"
        lede="Dip Dhillon on building a multi-brand franchise group with his brother Jit."
      />
      <section className="section">
        <div className="wrap">
          <div className="story-col prose">
            <Words as="p" className="big-say say-quote" style={{ maxWidth: 'none', marginBottom: '.8em' }}>“I started my journey with Domino’s in Catford as a delivery driver… a place that transforms hard work into opportunity and ambition into success.”</Words>
            <p className="muted" data-reveal>Dip Dhillon</p>
            <p data-reveal>I’m Dip Dhillon, and together with my brother Jit, we’ve spent over two decades building our path in the franchise industry. What started as part-time pizza delivery jobs has grown into one of the UK’s most exciting franchise success stories, and we’re just getting started.</p>
            <div className="chapter" id="legacy" data-reveal>
              <span className="ch">Chapter 1</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>A legacy of resilience</Split>
            </div>
            <p data-reveal>Our family’s story is one of resilience and determination. My grandfather made the brave decision to leave Punjab, India, for the UK at a time when opportunities were limited and adapting to a new life came with many challenges. Despite speaking little English and having minimal resources, he was driven by the desire to build a better future for us.</p>
            <p data-reveal>My father, a qualified homeopathic doctor in India, left behind his profession when he moved to the UK. He began working on construction sites, starting as a labourer and eventually working his way up to senior management on major projects. He showed us what it meant to push forward with purpose and integrity.</p>
            <div className="chapter" id="beginnings" data-reveal>
              <span className="ch">Chapter 2</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>Humble beginnings</Split>
            </div>
            <p data-reveal>My own journey started early, helping my grandparents on construction sites and farms during school holidays. I enrolled in university but quickly realised that academic life wasn’t the right fit for me, so I made the bold decision to leave and jump straight into the workforce.</p>
            <p data-reveal>Everything changed when I started working at the Domino’s store in Catford. I was immediately hooked by the fast-paced environment and the efficient, high-energy operation, especially the make line and delivery systems. That’s when I knew I wanted to own a Domino’s store one day.</p>
          </div>
        </div>
        <figure className="bleed" data-reveal="img" style={{ marginInline: 0 }}>
          <img src="/assets/img/reel-dough.webp" alt="The make line in a Domino’s store" width="1400" height="788" loading="lazy" data-parallax="-0.14" style={{ '--fp': '52% 18%' }} />
          <figcaption>The make line: the part of the operation that first hooked Dip.</figcaption>
        </figure>
        <div className="wrap">
          <div className="story-col prose">
            <div className="chapter" id="building" data-reveal>
              <span className="ch">Chapter 3</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>Building a franchise group</Split>
            </div>
            <p data-reveal>That dream took its first steps in 1999 when my manager told me a store was for sale. I saw an opportunity and went all in. With relentless focus on service and quality, I quickly turned the store around.</p>
            <p data-reveal>In 2001, my brother Jit joined me after graduating. He brought incredible financial discipline and strategic thinking to the business. While I focused on operations and team building, Jit handled financials and long-term planning. That same year, we bought our second Domino’s store together.</p>
            <p data-reveal>By 2006, we made the shift from working in the stores daily to focusing on growth. By 2014, we had scaled up to 40 Domino’s stores through a mix of organic growth and acquisitions.</p>
          </div>
        </div>
        <figure className="bleed" data-reveal="img" style={{ marginInline: 0 }}>
          <img src="/assets/img/golden-franny.webp" alt="Dip Dhillon receiving the Domino’s Golden Franny Award" width="1400" height="788" loading="lazy" data-parallax="-0.14" style={{ '--fp': '32% 18%' }} />
          <figcaption>Golden Franny Award: an honour bestowed upon the top 1% of Domino’s Pizza franchise owners.</figcaption>
        </figure>
        <div className="wrap">
          <div className="story-col prose">
            <div className="chapter" id="diversification" data-reveal>
              <span className="ch">Chapter 4</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>Diversification and continued growth</Split>
            </div>
            <p data-reveal>That same year, we expanded into the fitness industry, partnering with Snap Fitness to launch several locations. Our first gym became the top-performing Snap Fitness location worldwide. So successful, in fact, that the U.S. CEO visited us to understand what we were doing right.</p>
            <p data-reveal>Then in 2017, we stepped into the premium coffee market by acquiring an 11-store Costa Coffee franchise in the Midlands. In 2020, we signed an agreement to open multiple German Doner Kebab locations across the UK, further diversifying our portfolio.</p>
          </div>
        </div>
        <figure className="bleed" data-reveal="img" style={{ marginInline: 0 }}>
          <img src="/assets/img/gdk-team.webp" alt="A GDK restaurant team" width="1400" height="788" loading="lazy" data-parallax="-0.14" style={{ '--fp': '52% 24%' }} />
          <figcaption>German Doner Kebab joined the portfolio in 2020.</figcaption>
        </figure>
        <div className="wrap">
          <div className="story-col prose">
            <div className="chapter" id="future" data-reveal>
              <span className="ch">Chapter 5</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>Eyes on the future</Split>
            </div>
            <p data-reveal>Today, Jit and I are as ambitious as ever. We’re continuing to explore new opportunities within the leisure and hospitality industries, using everything we’ve learned to create long-term value and growth.</p>
            <div className="chapter" id="advice" data-reveal>
              <span className="ch">Chapter 6</span>
              <Split as="h2" style={{ '--d0': '.15s' }}>Jit’s advice to young entrepreneurs</Split>
            </div>
            <p data-reveal>You don’t need to know everything right now. Start where you are, use what you have, and learn as you go. Don’t be afraid to take risks, but take smart ones. The key is preparation, research, and resilience.</p>
            <p data-reveal>Surround yourself with people who complement your skills. My brother and I work because we’re different but aligned. Stay grounded in your values. Our family history keeps us humble and hungry.</p>
            <Words as="p" className="big-say say-quote" style={{ marginTop: '1.2em' }}>Your background doesn’t define your future. Your actions do.</Words>
          </div>
        </div>
      </section>
      <JourneyReel title="The journey so far" costaCard={false} />
      <Cta />
    </>
  );
}
