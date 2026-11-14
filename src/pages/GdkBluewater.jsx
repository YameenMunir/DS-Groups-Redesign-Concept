import { Cta, PageHead, PageMeta, Posts, ReadingProgress } from '../components/Blocks';

export default function GdkBluewater() {
  return (
    <>
      <PageMeta title="GDK Bluewater now open | DS Groups" description="We have now opened the doors to a fantastic new restaurant in Bluewater Shopping Centre, bringing our elite kebabs to one of the country’s most popular sho" />
      <ReadingProgress />
      <PageHead
        image={{ src: '/assets/img/gdk-bluewater.webp', alt: 'The GDK team outside the new Bluewater restaurant', fp: '46% 42%' }}
        crumbs={[{ to: '/insights', label: 'Insights' }]}
        title="GDK Bluewater now open"
        eyebrow={<p className="label" data-reveal>GDK, 14 July 2025</p>}
      />
      <section className="section">
        <div className="wrap">
          <div className="prose" style={{ marginInline: 'auto' }}>
            <p data-reveal>We have now opened the doors to a fantastic new restaurant in Bluewater Shopping Centre, bringing our elite kebabs to one of the country’s most popular shopping hubs.</p>
            <p data-reveal>Address: Unit EVL05, Winter Garden, Bluewater Shopping Centre, Bluewater Pkwy, Dartford, DA9 9ST.</p>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="label" data-reveal>More insights</p>
          <Posts items={['gdk', 'john', 'lucy']} />
        </div>
      </section>
      <Cta />
    </>
  );
}
