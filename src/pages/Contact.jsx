import { useState } from 'react';
import { PageHead, PageMeta } from '../components/Blocks';
import { Split } from '../components/Text';

const fields = [
  { id: 'f-name', name: 'name', label: 'Name', autoComplete: 'name', required: true },
  { id: 'f-email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { id: 'f-phone', name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { id: 'f-company', name: 'company', label: 'Company', autoComplete: 'organization' },
  { id: 'f-web', name: 'website', label: 'Website', type: 'url', autoComplete: 'url', full: true },
];

/* Prototype only: nothing is sent. On the live site this posts to info@dsgroups.co.uk. */
function EnquiryForm() {
  const [status, setStatus] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('This is a design prototype, so your enquiry was not sent. On the live site it goes to info@dsgroups.co.uk.');
  };
  return (
    <form className="enquiry" onSubmit={onSubmit} data-reveal style={{ marginTop: 32 }}>
      {fields.map(({ label, full, required, ...input }) => (
        <div className={full ? 'field full' : 'field'} key={input.id}>
          <label htmlFor={input.id}>{label}{!required && <> <span className="opt">(optional)</span></>}</label>
          <input {...input} required={required} />
        </div>
      ))}
      <div className="field full"><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" required></textarea></div>
      <div className="field full"><button className="btn" type="submit" style={{ alignSelf: 'flex-start' }}>Send enquiry</button></div>
      <p id="form-status" role="status" className="form-status">{status}</p>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact us | DS Groups" description="Contact DS Groups at Unit B, Endeavour Park, West Malling, Kent ME19 5SH. Call 01474 569 788 or email info@dsgroups.co.uk." />
      <PageHead
        image={{ src: '/assets/img/reel-founders.webp', alt: 'DS Groups leadership in conversation', fp: '71% 32%' }}
        title="Contact us"
        lede="Need to get in touch? We’re here to help, and we look forward to hearing from you."
      />
      <section className="section">
        <div className="wrap">
          <div className="grid contact-grid">
            <div className="a">
              <dl className="details">
                <div data-reveal>
                  <dt>Email us</dt>
                  <dd>info@dsgroups.co.uk</dd>
                </div>
                <div data-reveal style={{ '--d': '.06s' }}>
                  <dt>Call us</dt>
                  <dd>01474 569 788</dd>
                </div>
                <div data-reveal style={{ '--d': '.12s' }}>
                  <dt>Address</dt>
                  <dd>Unit B, Endeavour Park, London Road, Addington, West Malling, Kent ME19 5SH</dd>
                </div>
              </dl>
              <p style={{ marginTop: '24px' }} data-reveal><a className="link" href="https://www.google.com/maps/search/?api=1&query=Unit+B+Endeavour+Park+London+Road+Addington+West+Malling+ME19+5SH">View on Google Maps</a></p>
            </div>
            <div className="b" id="enquiry">
              <p className="label" data-reveal>Enquiry</p>
              <Split as="h2" style={{ '--d0': '0s' }}>Let’s connect</Split>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
