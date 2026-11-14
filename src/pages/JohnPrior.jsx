import { Cta, PageHead, PageMeta, Posts, ReadingProgress } from '../components/Blocks';

export default function JohnPrior() {
  return (
    <>
      <PageMeta title="Snap Fitness: John Prior | DS Groups" description="A great success story: John Prior began as regional manager of our Snap Fitness franchise. After ten years, with our complete support and mentoring, he ach" />
      <ReadingProgress />
      <PageHead
        image={{ src: '/assets/img/reel-gym.webp', alt: 'Inside a Snap Fitness gym', fp: '64% 30%' }}
        crumbs={[{ to: '/insights', label: 'Insights' }]}
        title="Snap Fitness: John Prior"
        eyebrow={<p className="label" data-reveal>Success story, 18 June 2025</p>}
      />
      <section className="section">
        <div className="wrap">
          <div className="prose" style={{ marginInline: 'auto' }}>
            <p data-reveal>A great success story: John Prior began as regional manager of our Snap Fitness franchise. After ten years, with our complete support and mentoring, he achieved his dream of owning his own gym franchise.</p>
            <p data-reveal>In 2024 he was awarded CEO One Team of the Year. We couldn’t be more proud.</p>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>More insights</p>
          <Posts items={['gdk', 'bluewater', 'lucy']} />
        </div>
      </section>
      <Cta />
    </>
  );
}
