import { Split } from './Text';
import { img, journey } from '../data/site';

/* The journey as a film reel. On desktop the section pins and the strip scrolls sideways
   (positioning is driven by lib/motion); on phones it is a swipeable row.
   costaCard: show the 2017 Costa Coffee frame as a typographic card (home) or a plain caption (our story). */
export default function JourneyReel({ title, costaCard = true }) {
  return (
    <section className="reel" aria-labelledby="reel-h">
      <div className="reel-pin">
        <div className="wrap reel-head">
          <div>
            <p className="label">Our journey</p>
            <Split as="h2" id="reel-h" style={{ '--d0': '0s' }}>{title}</Split>
          </div>
          <p className="reel-count">Now showing <b>{journey[0].year}</b></p>
        </div>
        <div className="strip">
          <div className="track">
            {journey.map((f) => (
              <article className="frame" data-year={f.year} key={f.year}>
                {f.costa ? (
                  costaCard ? (
                    <div className="pic blank cc" role="img" aria-label="Costa Coffee, 11 stores in the Midlands">
                      <span className="cc-n" aria-hidden="true">11</span>
                      <span className="cc-t" aria-hidden="true">Costa Coffee</span>
                      <span className="cc-s" aria-hidden="true">Franchise stores in the Midlands</span>
                    </div>
                  ) : (
                    <div className="pic blank"><span>Costa Coffee: an 11-store franchise in the Midlands</span></div>
                  )
                ) : (
                  <div className="pic">
                    <img src={img(f.img)} alt={f.alt} width="1400" height="788" loading="lazy" decoding="async" style={{ '--fp': f.fp }} />
                  </div>
                )}
                <span className={f.gold ? 'yr gold' : 'yr'}>{f.year}</span>
                {f.logo && (
                  <img className="tl-logo" src={f.logo.src} alt={f.logo.alt} width={f.logo.w} height={f.logo.h}
                    style={{ '--k': f.logo.k }} loading="lazy" decoding="async" />
                )}
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="reel-bar"><i></i></div>
      </div>
    </section>
  );
}
