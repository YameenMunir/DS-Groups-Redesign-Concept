import { Link } from 'react-router-dom';
import { brands, contact, relatedOrder } from '../data/site';

const groupLinks = [
  { to: '/about-us/our-story', label: 'Our story' },
  { to: '/about-us', label: 'About us' },
  { to: '/giving-back', label: 'Giving back' },
  { to: '/insights', label: 'Insights' },
];

const legal = [
  { href: 'https://dsgroups.co.uk/privacy', label: 'Privacy policy' },
  { href: 'https://dsgroups.co.uk/terms-of-use/', label: 'Terms of use' },
  { href: 'https://dsgroups.co.uk/site-map', label: 'Site map' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link className="brand" to="/"><img src="/assets/img/ds-monogram.png" alt="" width="179" height="196" loading="lazy" /><span>DS Groups</span></Link>
            <address>{contact.address[0]}<br />{contact.address[1]}<br />{contact.phone}<br />{contact.email}</address>
          </div>
          <nav aria-label="The group">
            <h2>The group</h2>
            <ul>{groupLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Our brands">
            <h2>Our brands</h2>
            <ul>
              {relatedOrder.map((id) => brands.find((b) => b.id === id)).map((b) => (
                <li key={b.id}><Link to={b.to}>{b.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Get in touch">
            <h2>Get in touch</h2>
            <ul>
              <li><Link to="/contacts">Contact us</Link></li>
              <li><Link to="/contacts#enquiry">Send an enquiry</Link></li>
            </ul>
          </nav>
        </div>
        <div className="legal">
          <a className="to-top" href="#content">Back to top</a>
          <span>DS Groups © 2026. All rights reserved.</span>
          <ul>{legal.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
        <p className="concept-note">
          Concept design only. This is not the live DS Groups website and is not affiliated with or endorsed by DS Groups.
        </p>
      </div>
    </footer>
  );
}
