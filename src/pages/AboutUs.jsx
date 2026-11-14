import { Link } from 'react-router-dom';
import { Cta, PageHead, PageMeta } from '../components/Blocks';
import { Split, Words } from '../components/Text';

export default function AboutUs() {
  return (
    <>
      <PageMeta title="About us | DS Groups" description="Founded in 2001 by the Dhillon family, DS Groups is a franchise group in Kent. Our vision, values and the team behind Domino’s, GDK and Snap Fitness." />
      <PageHead
        image={{ src: '/assets/img/founders.webp', alt: 'Two members of the DS Groups leadership at head office', fp: '24% 20%' }}
        title="About DS Groups"
        current="About us"
        lede="Founded in 2001 by the Dhillon family, DS Groups has grown from a small family-run venture into a respected franchise group with a strong presence in the fast food and fitness sectors."
      />
      <section className="section">
        <div className="wrap">
          <div className="grid split">
            <div className="a">
              <p className="label" data-reveal>Our story</p>
              <Split as="h2" style={{ '--d0': '0s' }}>Working as one</Split>
            </div>
            <div className="b">
              <Words as="p" className="big-say say-quote">Our brands hold a shared vision and a shared set of values. Working as one, we build businesses that are resilient and more adaptable to change.</Words>
              <p data-reveal><Link className="link" to="/about-us/our-story">Read our story</Link></p>
            </div>
          </div>
          <div className="grid split" style={{ marginTop: 'clamp(56px,7vw,96px)' }}>
            <div className="a">
              <p className="label" data-reveal>Vision and values</p>
              <Split as="h2" style={{ '--d0': '0s' }}>Happiness and vitality</Split>
            </div>
            <div className="b">
              <p data-reveal>A forward-thinking, dynamic environment where physical wellbeing is celebrated alongside nourishing family meals, to deliver happiness and vitality. Driven by enthusiasm and passion, staying dynamic, adaptable and embracing new opportunities for development and renewal.</p>
            </div>
          </div>
          <div className="cols3">
            <div data-reveal>
              <h3>Progression from within</h3>
              <p>More than 90% of Domino’s store managers and area managers started out as a delivery driver or a pizza maker.</p>
            </div>
            <div data-reveal style={{ '--d': '.08s' }}>
              <h3>Support for franchisees</h3>
              <p>We offer complete support and mentoring to people who want to own their own franchise, as with John Prior at Snap Fitness and Lucy Harman at Domino’s.</p>
            </div>
            <div data-reveal style={{ '--d': '.16s' }}>
              <h3>Rooted in community</h3>
              <p>Through our charity foundation we support a local Kent youth initiative, helping young people get the best possible start.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>Our people</p>
          <Split as="h2" style={{ '--d0': '0s' }}>The team behind the scenes</Split>
          <p className="muted" data-reveal>We wouldn’t be here today without the support of our community and our teams. No matter how far we go, we will always stay grounded in the values that got us here.</p>
          <div className="leads">
            <article className="lead" data-reveal style={{ '--d': '0.00s' }}>
              <figure className="photo" data-reveal="img" style={{ margin: 0 }}><img src="/assets/img/jake-thorn.webp" alt="Jake Thorn" width="452" height="513" loading="lazy" decoding="async" /></figure>
              <h3>Jake Thorn</h3>
              <p className="role">Operations Director, Domino’s Pizza</p>
              <p>I’m the go-to person between our store teams and head office, drawing on my experience leading fast-paced, high-volume restaurant operations, and always looking for ways to make our operations faster, safer and better for our customers.</p>
            </article>
            <article className="lead" data-reveal style={{ '--d': '0.08s' }}>
              <figure className="photo" data-reveal="img" style={{ margin: 0 }}><img src="/assets/img/sam-boyton.webp" alt="Samuel Boyton" width="452" height="513" loading="lazy" decoding="async" /></figure>
              <h3>Samuel Boyton</h3>
              <p className="role">Head of Operations, Snap Fitness</p>
              <p>I head up the Snap Fitness brand within DS Groups, from gym operations to growth and expansion. With 13 years in fitness and health and wellbeing, I’m committed to building a strong, supportive community and investing in our people.</p>
            </article>
            <article className="lead" data-reveal style={{ '--d': '0.16s' }}>
              <figure className="photo" data-reveal="img" style={{ margin: 0 }}><img src="/assets/img/golam-rabbi.webp" alt="Golam Rabbi" width="452" height="513" loading="lazy" decoding="async" /></figure>
              <h3>Golam Rabbi</h3>
              <p className="role">Operations Manager, GDK</p>
              <p>My journey with DS Group began in 2013 at Domino’s Catford as a Store Manager. Today I oversee daily operations across multiple GDK locations, building high-performing teams and driving continuous improvement.</p>
            </article>
          </div>
          <h3 style={{ marginTop: '72px' }} data-reveal>Head office and support</h3>
          <ul className="roster">
            <li data-reveal style={{ '--d': '0.00s' }}><strong>Suzanne Colston Lynch</strong><span>Executive Assistant</span></li>
            <li data-reveal style={{ '--d': '0.05s' }}><strong>Rags Dhillon</strong><span>Head of Compliance</span></li>
            <li data-reveal style={{ '--d': '0.10s' }}><strong>Melissa Thorn</strong><span>Head of Customer Service, Domino’s</span></li>
            <li data-reveal style={{ '--d': '0.00s' }}><strong>Ria Chakraborty</strong><span>Administration and Audit Manager</span></li>
            <li data-reveal style={{ '--d': '0.05s' }}><strong>Kimberley James</strong><span>Auditor and Trainer</span></li>
            <li data-reveal style={{ '--d': '0.10s' }}><strong>Kitty Kulenthiran</strong><span>Payroll Manager</span></li>
            <li data-reveal style={{ '--d': '0.00s' }}><strong>Kelly Duxbury</strong><span>HR Manager</span></li>
            <li data-reveal style={{ '--d': '0.05s' }}><strong>Rishi Kumar</strong><span>Accounts Manager, GDK and Snap Fitness</span></li>
            <li data-reveal style={{ '--d': '0.10s' }}><strong>Kaji Gurung</strong><span>Accounts Manager, Domino’s</span></li>
            <li data-reveal style={{ '--d': '0.00s' }}><strong>Akash Patel</strong><span>Compliance Manager</span></li>
            <li data-reveal style={{ '--d': '0.05s' }}><strong>Balaji Channamshetty</strong><span>HR Coordinator</span></li>
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}
