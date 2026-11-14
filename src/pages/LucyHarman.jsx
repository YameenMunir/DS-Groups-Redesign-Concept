import { Cta, PageHead, PageMeta, Posts, ReadingProgress } from '../components/Blocks';

export default function LucyHarman() {
  return (
    <>
      <PageMeta title="Domino’s Pizza: Lucy Harman | DS Groups" description="Lucy Harman is the first female Homegrown Hero, and her journey with Domino’s is inspiring. At 16, she began her Domino’s career working two evenings a wee" />
      <ReadingProgress />
      <PageHead
        image={{ src: '/assets/img/reel-pizza.webp', alt: 'Inside a Domino’s store', fp: '52% 24%' }}
        crumbs={[{ to: '/insights', label: 'Insights' }]}
        title="Domino’s Pizza: Lucy Harman"
        eyebrow={<p className="label" data-reveal>Success story, 18 June 2025</p>}
      />
      <section className="section">
        <div className="wrap">
          <div className="prose" style={{ marginInline: 'auto' }}>
            <p data-reveal>Lucy Harman is the first female Homegrown Hero, and her journey with Domino’s is inspiring. At 16, she began her Domino’s career working two evenings a week at our Whitstable branch in Kent, answering phones and making pizzas.</p>
            <p data-reveal>Her hands-on approach led her to take on more responsibility, rising from shift manager to store manager. With our support and mentoring Lucy took the bold step to become a franchisee, opening her first store in Hayling Island, Hampshire.</p>
            <p data-reveal>More than 90% of Domino’s store managers and area managers started out as a delivery driver or a pizza maker.</p>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>More insights</p>
          <Posts items={['gdk', 'bluewater', 'john']} />
        </div>
      </section>
      <Cta />
    </>
  );
}
