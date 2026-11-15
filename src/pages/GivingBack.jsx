import { Cta, PageHead, PageMeta } from '../components/Blocks';
import { Split } from '../components/Text';

export default function GivingBack() {
  return (
    <>
      <PageMeta title="Giving back | DS Groups" description="DS Groups supports YLF, a Kent youth charity helping care leavers, and a range of national charities." />
      <PageHead
        image={{ src: '/assets/img/ds-hero-poster.webp', alt: 'DS Groups leadership in conversation at head office', fp: '50% 38%' }}
        title="Gratitude is thankfulness expressed in action"
        current="Giving back"
        lede="William George Jordan"
      />
      <section className="section">
        <div className="wrap">
          <div className="grid split">
            <div className="a">
              <p className="label" data-reveal>Our partnership</p>
              <Split as="h2" style={{ '--d0': '0s' }}>Supporting young people in Kent</Split>
            </div>
            <div className="b prose">
              <p data-reveal>Every day, we are deeply grateful for the opportunities that have shaped our journey, the people we’ve met along the way, and the unwavering love of our family.</p>
              <p data-reveal>We believe in the power of generosity and the value of giving back to our community. That is why we proudly support YLF, a local youth charity based in Kent, dedicated to helping young people thrive.</p>
              <p data-reveal>The struggles faced by those leaving the care system deeply resonate with us. Family is at the heart of everything we do, so joining a network that offers guidance, opportunity and mentorship to those who may have lacked that support is something we’re passionate about. Our mission is simple: to empower young people so they can build confidence, seize opportunities and forge their own path to success.</p>
              <p data-reveal><a className="link" href="https://ylf.org.uk/care-leavers-offer/">Futures Care Leavers Offer, The Young Lives Foundation</a></p>
              <figure className="quote" data-reveal>
                <blockquote style={{ margin: 0 }}>
                  <p>Over 2,000 care leavers in Kent and Medway deserve every opportunity to thrive and we’re proud to be partnering with DS Groups to make that happen.</p>
                </blockquote>
                <figcaption><cite>Anna Withers, Director of Advocacy and Futures Programmes, YLF</cite></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>2025</p>
          <Split as="h2" style={{ '--d0': '0s' }}>Charities we supported</Split>
          <ul className="charities">
            <li data-reveal style={{ '--d': '0.00s' }}>Teenage Cancer Trust<span>Supported in 2025</span></li>
            <li data-reveal style={{ '--d': '0.06s' }}>Madalani Cancer<span>Supported in 2025</span></li>
            <li data-reveal style={{ '--d': '0.12s' }}>Parkinson’s UK<span>Supported in 2025</span></li>
            <li data-reveal style={{ '--d': '0.18s' }}>Ellenor hospice<span>Supported in 2025</span></li>
            <li data-reveal style={{ '--d': '0.24s' }}>Azizi Life<span>Supported in 2025</span></li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid split">
            <div className="a">
              <p className="label" data-reveal>Christmas 2020</p>
              <Split as="h2" style={{ '--d0': '0s' }}>Stepping up</Split>
            </div>
            <div className="b">
              <div className="press">
                <p data-reveal>At Christmas 2020 the UK was back in lockdown, with lorry drivers stranded on the M20 on the way to Dover, away from their families and a good meal. Dip Dhillon, who runs multiple Domino’s franchises across Kent, called Ravinder Singh of Khalsa Aid to ask what he could do.</p>
                <p data-reveal>Nearby Domino’s stores each made 200 pizzas, coordinated with Khalsa Aid and delivered to the motorway roadside with a Kent Police escort. The effort went on to deliver 2,500 pizzas in a day.</p>
                <p data-reveal><a className="link" href="https://www.kentonline.co.uk/gravesend/news/more-curry-and-pizza-is-on-the-way-239829/">Read the Kent Online report</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
