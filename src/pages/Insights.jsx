import { Cta, PageHead, PageMeta, Posts } from '../components/Blocks';

export default function Insights() {
  return (
    <>
      <PageMeta title="Insights | DS Groups" description="News and stories from DS Groups across Domino’s, GDK and Snap Fitness." />
      <PageHead
        image={{ src: '/assets/img/dominos-team.webp', alt: 'A Domino’s team member serving a customer', fp: '74% 24%' }}
        title="Insights"
        lede="Success is measured not just by the bank balance or the material things, but by the lives touched along the way."
      />
      <section className="section">
        <div className="wrap">
          <Posts items={['gdk', 'bluewater', 'john', 'lucy', 'dining', 'expansion']} style={{ marginTop: 0 }} />
        </div>
      </section>
      <Cta />
    </>
  );
}
