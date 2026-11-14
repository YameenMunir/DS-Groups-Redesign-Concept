/* Shared content for the DS Groups site. Pages and components read from here
   so that a brand, a post or a nav item is defined once. */

export const img = (file) => `/assets/img/${file}`;

export const contact = {
  phone: '01474 569 788',
  email: 'info@dsgroups.co.uk',
  address: ['Unit B, Endeavour Park, London Road,', 'Addington, West Malling, Kent ME19 5SH'],
};

export const mainNav = [
  { to: '/about-us/our-story', label: 'Our story' },
  { to: '/about-us', label: 'About us' },
  { to: '/our-brands', label: 'Our brands' },
  { to: '/giving-back', label: 'Giving back' },
  { to: '/insights', label: 'Insights' },
  { to: '/contacts', label: 'Contact' },
];

export const brands = [
  {
    id: 'dominos',
    name: 'Domino’s Pizza',
    short: 'Domino’s',
    to: '/our-brands/domino-brand-page',
    color: '#0b6ab0',
    since: 1999,
    photo: { src: img('dominos-team.webp'), fp: '74% 24%', alt: 'Domino’s Pizza team, part of DS Groups' },
    logo: { src: img('logo-dominos.png'), w: 731, h: 160, k: '1.0', alt: 'Domino’s Pizza' },
    tagline: 'Where it started. Almost 30 years on, Domino’s is still at the core of the group.',
    intro: 'Where it started. We bought our first Domino’s store in 1999, and Domino’s remains at the core of the group.',
  },
  {
    id: 'snap',
    name: 'Snap Fitness',
    short: 'Snap Fitness',
    to: '/our-brands/snap-fitness-brand-page',
    color: '#e3001b',
    since: 2014,
    photo: { src: img('snap-team.webp'), fp: '47% 66%', alt: 'Snap Fitness team, part of DS Groups' },
    logo: { src: img('logo-snap.png'), w: 915, h: 136, k: '0.78', alt: 'Snap Fitness' },
    tagline: 'Inclusive, supportive gyms. Our first became the top-performing Snap Fitness location worldwide.',
    intro: 'An opportunity to bring fitness into the portfolio. As a family, we believe in a healthy balance in life.',
  },
  {
    id: 'gdk',
    name: 'German Doner Kebab',
    short: 'GDK',
    longName: 'German Doner Kebab (GDK)',
    to: '/our-brands/gdk-brand-page-2',
    color: '#f26b21',
    since: 2020,
    photo: { src: img('gdk-team.webp'), fp: '52% 24%', alt: 'German Doner Kebab team, part of DS Groups' },
    logo: { src: img('logo-gdk.png'), w: 524, h: 159, k: '1.08', alt: 'German Doner Kebab' },
    tagline: 'Inspired by Berlin’s kebab scene. Fresh to order, served in a one-of-a-kind toasted waffle bread.',
    intro: 'Along the way we became excited by the new name in fast food. In 2020 our franchise business grew again.',
  },
];

/* The related-brands strip lists brands in this order */
export const relatedOrder = ['dominos', 'gdk', 'snap'];

export const posts = {
  gdk: { href: 'https://dsgroups.co.uk/gdk/', date: '22 July 2025', title: 'GDK', tag: 'Brands' },
  bluewater: { to: '/gdk-bluewater-now-open', date: '14 July 2025', title: 'GDK Bluewater now open', tag: 'GDK' },
  john: { to: '/snap-fitness', date: '18 June 2025', title: 'Snap Fitness', tag: 'Success story' },
  lucy: {
    to: '/more-than-90-of-dominos-store-managers-and-area-managers-started-out-as-a-delivery-driver-or-a-pizza-maker',
    date: '18 June 2025', title: 'Domino’s Pizza', tag: 'Success story',
  },
  dining: {
    href: 'https://dsgroups.co.uk/most-popular-dining-brands-in-the-united-kingdom-in-1st-quarter-of-2025/',
    date: '18 June 2025', title: 'Most popular dining brands in the United Kingdom in 1st quarter of 2025', tag: 'Brands',
  },
  expansion: { href: 'https://dsgroups.co.uk/brand-expansion/', date: '2 August 2021', title: 'Brand expansion', tag: 'GDK' },
};

const logoOf = (id) => brands.find((b) => b.id === id).logo;

/* The journey, 1999 to today. Used by the pinned film reel. */
export const journey = [
  { year: 1999, img: 'reel-pizza.webp', fp: '52% 24%', alt: 'A Domino’s store team', logo: { ...logoOf('dominos'), alt: 'Domino’s Pizza' },
    text: 'Dip Dhillon’s manager tells him a store is for sale. He goes all in, and quickly turns the store around.' },
  { year: 2001, img: 'founders.webp', fp: '24% 20%', alt: 'Two members of the DS Groups leadership',
    text: 'His brother Jit joins after graduating, bringing financial discipline and strategic thinking. Together they buy a second Domino’s store.' },
  { year: 2006, img: 'reel-founders.webp', fp: '71% 32%', alt: 'DS Groups leadership in conversation',
    text: 'The brothers move from working in the stores daily to focusing on growth.' },
  { year: 2014, img: 'golden-franny.webp', fp: '32% 18%', alt: 'Dip Dhillon receiving the Domino’s Golden Franny Award', logo: logoOf('snap'),
    text: '40 Domino’s stores. The group enters fitness with Snap Fitness, and its first gym becomes the top performer worldwide.' },
  { year: 2017, costa: true, text: 'An 11-store Costa Coffee franchise in the Midlands joins the group.' },
  { year: 2020, img: 'gdk-kiosk.webp', fp: '60% 45%', alt: 'An ordering kiosk inside a GDK restaurant', logo: { ...logoOf('gdk'), alt: 'German Doner Kebab (GDK)' },
    text: 'An agreement to open multiple German Doner Kebab restaurants across the UK.' },
  { year: 2025, img: 'gdk-bluewater.webp', fp: '46% 42%', alt: 'The GDK team at Bluewater', gold: true,
    text: 'GDK opens at Bluewater Shopping Centre, one of the country’s most popular shopping destinations.' },
];

/* Scenes from the brand film on the home hero */
export const filmScenes = [
  { brand: 'DS Groups', cap: 'The leadership team at work', img: 'reel-founders.webp', fp: '71% 32%', alt: 'Two members of the DS Groups leadership in conversation' },
  { brand: 'Domino’s', cap: 'Fresh pizza, made in store', img: 'reel-pizza.webp', fp: '52% 24%', alt: 'A Domino’s team member holding a fresh pizza in store' },
  { brand: 'Domino’s', cap: 'Dough stretched by hand on the make line', img: 'reel-dough.webp', fp: '52% 18%', alt: 'A Domino’s pizza maker stretching dough' },
  { brand: 'German Doner Kebab', cap: 'Served with a smile at the counter', img: 'reel-gdk-counter.webp', fp: '61% 24%', alt: 'A GDK team member serving a customer' },
  { brand: 'German Doner Kebab', cap: 'Doner sliced fresh to order', img: 'reel-doner.webp', fp: '56% 40%', alt: 'Doner being sliced at a GDK restaurant' },
  { brand: 'Snap Fitness', cap: 'Training on the gym floor', img: 'reel-gym.webp', fp: '64% 30%', alt: 'A member training at a Snap Fitness gym' },
];
