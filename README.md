# DS Groups — Website Redesign Concept

> **Concept design only.** This is not the live DS Groups website and is not affiliated with or endorsed by DS Groups.

A redesign concept for DS Groups, a family-founded franchise group that runs Domino's Pizza, German Doner Kebab and Snap Fitness. The site is designed like a brand film:

- pages open and close with cinematic letterbox bars
- the home hero plays scenes with subtitles
- the company's journey is a film reel you scroll through sideways
- each brand gets its own full-screen scene

Built with **React 19**, **React Router 7** and **Vite**. No animation libraries: all the motion is hand-written CSS and one `requestAnimationFrame` loop.

## Highlights

- **Scroll-driven motion without re-renders.** `src/lib/motion.js` runs one rAF loop for the pinned horizontal reel, the brand scenes, the parallax, the words that light up as you read, the velocity-based marquee and the reading progress bar. It writes CSS custom properties straight to the DOM, so React never re-renders while you scroll, and the loop does no layout work when the page is idle.
- **Page transitions.** Internal links are intercepted so the letterbox closes before React Router navigates. On the next page the bars open again.
- **Accessible by default.**
  - The hero scenes have a pause control (WCAG 2.2.2).
  - The mobile menu traps focus, closes on Escape and is `inert` when closed.
  - All motion is turned off for `prefers-reduced-motion`.
  - Split headings keep a readable `aria-label`.
- **Content as data.** Brands, insights, the journey timeline and the hero scenes live in `src/data`. The three brand pages share one template (`src/pages/BrandPage.jsx`).
- **Light and dark themes**, remembered across visits, applied before first paint so there is no flash.

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
| **Scenes and reel** | Auto-playing hero scenes, the pinned journey reel, full-screen brand scenes, a marquee that speeds up with scrolling | Home, Our brands, Our Story |
| **Reading progress** | A thin gold bar tracks how far through an article you are | Our Story and the insight articles |

How it's put together:

- **Entrances play when you reach them.** `<Split>` headings use an `IntersectionObserver` (`src/lib/useGo.js`), so a heading animates when it scrolls into view, not unseen at page load. `data-reveal` elements work the same way.
- **One loop for everything tied to scrolling.** `src/lib/motion.js` runs a single `requestAnimationFrame` loop that writes CSS custom properties directly, so React never re-renders while you scroll. The loop is set up again on every route change and cleaned up on the way out.
- **Same timing everywhere.** All effects share the easing curves (`--ease`, `--ease-out`) and the staggered delays (`--d`, `--d0`, `--i`) from `src/styles/cinema.css`.
- **Respectful of motion settings.** With `prefers-reduced-motion`, the letterbox, the hero auto-advance, parallax and every entrance are switched off. Content shows in its final state straight away.

## Project structure

```
src/
  components/   Layout, Header, Footer, HeroFilm, JourneyReel, Text (Split/Words), Blocks (shared sections)
  pages/        One component per route; BrandPage is the shared brand template
  data/         Site content: brands, posts, journey, hero scenes, brand page copy
  lib/          motion.js (scroll engine), useGo.js (entrance trigger), style.js
  styles/       style.css + cinema.css (original design system), refinements.css (type system, fixes, disclaimer)
public/assets/  Images
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
