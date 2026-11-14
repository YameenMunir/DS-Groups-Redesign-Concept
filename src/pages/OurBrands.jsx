import { BrandScenes, Cta, Marquee, PageHead, PageMeta } from '../components/Blocks';

export default function OurBrands() {
  return (
    <>
      <PageMeta title="Our brands | DS Groups" description="DS Groups operates Domino’s Pizza, German Doner Kebab (GDK) and Snap Fitness. Explore each brand and how it joined the group." />
      <PageHead
        image={{ src: '/assets/img/gdk-bluewater.webp', alt: 'The GDK team at Bluewater', fp: '46% 42%' }}
        title="Our brands"
        lede="From humble beginnings as a family business to a house of brands, our journey is fuelled by core family values, a deep sense of purpose and a commitment to inspiring happiness."
      />
      <BrandScenes copy="intro" />
      <Marquee />
      <Cta />
    </>
  );
}
