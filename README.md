# DS Groups — Website Redesign Concept

> **Concept design only.** This is not the live DS Groups website and is not affiliated with or endorsed by DS Groups.

A redesign concept for DS Groups, a family-founded franchise group that runs Domino's Pizza, German Doner Kebab and Snap Fitness. The site is designed like a brand film:

- pages open and close with cinematic letterbox bars
- the home hero plays the original DS Groups reel full screen
- the company's journey is a film reel you scroll through sideways
- each brand gets its own full-screen scene

Built with **React 19**, **React Router 7** and **Vite**. No animation libraries: all the motion is hand-written CSS and one `requestAnimationFrame` loop.

## Highlights

- **Scroll-driven motion without re-renders.** `src/lib/motion.js` runs one rAF loop for the pinned horizontal reel, the brand scenes, the parallax, the words that light up as you read, the velocity-based marquee and the reading progress bar. It writes CSS custom properties straight to the DOM, so React never re-renders while you scroll, and the loop does no layout work when the page is idle.
- **Page transitions.** Internal links are intercepted so the letterbox closes before React Router navigates. On the next page the bars open again.
- **Accessible by default.**
  - The hero video has a pause control (WCAG 2.2.2).
  - The mobile menu traps focus, closes on Escape and is `inert` when closed.
  - All motion is turned off for `prefers-reduced-motion`.
  - Split headings keep a readable `aria-label`.
- **Content as data.** Brands, insights and the journey timeline live in `src/data`. The three brand pages share one template (`src/pages/BrandPage.jsx`).
- **Light and dark themes**, remembered across visits, applied before first paint so there is no flash.

## Hero video

The home hero uses the **original video from the live DS Groups homepage**: `Banner_ds_web_reel.webm` (1920×1080, 9 seconds), from `dsgroups.co.uk/wp-content/uploads/2025/04/`. It has not been swapped for stock footage or a still image.

The footage is unchanged. It was only re-encoded, with its unused audio track removed, so it loads fast:

| File | Used for |
|---|---|
| `public/assets/video/ds-hero-1080.webm` / `.mp4` | Screens wider than 900px |
| `public/assets/video/ds-hero-720.webm` / `.mp4` | Phones and small tablets |
| `public/assets/img/ds-hero-poster.webp` (+ `-960`) | The reel's first frame. It loads first with high priority, and the video fades in over it once it plays, so there is no flash |

WebM (VP9) is listed first; MP4 (H.264, fast start) covers browsers without VP9. How it plays (`src/components/HeroVideo.jsx`):

- **Starts by itself, loops, muted, inline on phones.** The `muted` attribute is set directly on the element, because iOS will not autoplay without it.
- **Doesn't waste data.** It stops decoding when it scrolls off screen or the tab is hidden. With Data Saver on or a 2G connection, it isn't downloaded at all and the poster stays.
- **Visitor control.** A pause button sits in the hero's bottom bar. With reduced motion, the video waits for the visitor to press play.

## Typography

The whole site uses two typefaces, each with a fixed job:

| Role | Typeface | Weights used |
|---|---|---|
| Headings, statements, big numbers, quotes | **Roboto Slab** (`--display`) | 300 for anything large; 400 for small display text such as card titles, names and facts |
| Body text, labels, buttons, navigation | **Poppins** (`--sans`) | 400 body; 500 labels, buttons and captions; 600 the brand mark and bold text |

Only these five faces are loaded from Google Fonts. The rules that keep the site on them live in `src/styles/refinements.css`:

- **No faked faces.** `font-synthesis: none` stops the browser inventing a bold or italic that wasn't loaded, and `<strong>` maps to Poppins 600. Before this, bold text used a smeared, browser-generated Poppins 700.
- **Form controls use the site font.** Buttons, inputs and text areas don't inherit fonts by default and showed the operating system font (Arial on Windows). They now inherit Poppins.
- **Two statement sizes.** Large statements had one-off inline sizes on each page (37 to 60px). Now there are two: `.big-say` for full-width statements and `.big-say.say-quote` for quotes and statements inside a column.

I checked this in a headless browser by reading the computed font of every piece of text on every page. Every element resolves to one of the five loaded faces.

## Cinematic motion

The site is built as a brand film, and every page uses the same motion language:

| Effect | What it does | Where |
|---|---|---|
| **Letterbox cut** | Black bars close over the page with the DS monogram, then open on the next page | Every internal link, on all screen sizes |
| **Header zoom** | The page-header photo eases in from a darker, closer frame | Every inner page with a photo header (all except Giving back, which opens on type) |
| **Masked heading rise** (`<Split>`) | Each word rises out of a mask, one after another | Every page title and section heading, including the Our Story chapters |
| **Fade up** (`data-reveal`) | Labels, paragraphs, cards and list items rise and fade in, staggered | Every page |
| **Photo wipe** (`data-reveal="img"`) | Photos are uncovered from a cropped, slightly zoomed frame | Home, team portraits, brand galleries, Our Story full-width photos |
| **Lit words** (`<Words>`) | Words in a statement brighten as you read down the page | Home, About us, Our Story |
| **Parallax** | Header and full-width photos move slower than the page | Page headers, Our Story, CTA |
| **Hero video** | The original reel fades in over its first frame; headline, button and brand bar follow in one sequence. Scrolling lifts the content away and dims the video | Home |
| **Scenes and reel** | The pinned journey reel, full-screen brand scenes, a marquee that speeds up with scrolling | Home, Our brands, Our Story |
| **Reading progress** | A thin gold bar tracks how far through an article you are | Our Story and the insight articles |

How it's put together:

- **Entrances play when you reach them.** `<Split>` headings use an `IntersectionObserver` (`src/lib/useGo.js`), so a heading animates when it scrolls into view, not unseen at page load. `data-reveal` elements work the same way.
- **One loop for everything tied to scrolling.** `src/lib/motion.js` runs a single `requestAnimationFrame` loop that writes CSS custom properties directly, so React never re-renders while you scroll. The loop is set up again on every route change and cleaned up on the way out.
- **Same timing everywhere.** All effects share the easing curves (`--ease`, `--ease-out`) and the staggered delays (`--d`, `--d0`, `--i`) from `src/styles/cinema.css`.
- **Respectful of motion settings.** With `prefers-reduced-motion`, the letterbox, video autoplay, parallax and every entrance are switched off. The hero shows the reel's first frame with a play button. Content shows in its final state straight away.

## Project structure

```
src/
  components/   Layout, Header, Footer, HeroVideo, JourneyReel, Text (Split/Words), Blocks (shared sections)
  pages/        One component per route; BrandPage is the shared brand template
  data/         Site content: brands, posts, journey, hero scenes, brand page copy
  lib/          motion.js (scroll engine), useGo.js (entrance trigger), style.js
  styles/       style.css + cinema.css (original design system), refinements.css (type system, fixes, disclaimer)
public/assets/  Images, and the hero video in assets/video
```

## Running locally

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve the production build
npm run lint
```

## Deploying

The app uses client-side routing. `vercel.json` rewrites every path to `index.html`, so deep links work on Vercel. On other hosts, add the equivalent SPA fallback.

## Static prototype

`public/prototype.html` is the original single-file prototype the React app was built from. It is served at `/prototype.html`.
