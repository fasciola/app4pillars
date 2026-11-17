import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import '@fontsource/bodoni-moda/latin-500.css';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import './FashionDepth.css';

/**
 * Example build: a fashion "depth carousel". The active look stands sharp in
 * front; the previous looks step back to the left, smaller and blurred. The
 * product card follows the active look. All three models share one crop box
 * in /public/fashion, so their feet sit on the same line in every position.
 */
const looks = [
  {
    id: 'blush',
    number: '01',
    name: 'Blush satin',
    piece: 'Cropped satin jacket',
    detail: 'Feather-trim cuffs, collarless front, worn with rose satin trousers.',
    price: 'AED 2,450',
    model: '/fashion/model-blush.webp',
    garment: '/fashion/garment-blush.webp',
  },
  {
    id: 'trench',
    number: '02',
    name: 'Sand trench',
    piece: 'Double-breasted trench',
    detail: 'Cotton gabardine, wide lapels and a tied waist, cut below the knee.',
    price: 'AED 3,200',
    model: '/fashion/model-trench.webp',
    garment: '/fashion/garment-trench.webp',
  },
  {
    id: 'monochrome',
    number: '03',
    name: 'Monochrome',
    piece: 'Sculpted ruffle blouse',
    detail: 'Matte black ruffles over a long ivory pleated skirt.',
    price: 'AED 1,850',
    model: '/fashion/model-monochrome.webp',
    garment: '/fashion/garment-monochrome.webp',
  },
];

const AUTO_MS = 3800;

export default function FashionDepth() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const n = looks.length;

  const go = (index: number) => setActive(((index % n) + n) % n);

  // Auto-advance only while the section is on screen.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % n), AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [active, visible, paused, n]);

  const look = looks[active];

  return (
    <section className="fashion-showcase" id="fashion-example" aria-labelledby="fashion-example-heading">
      <div className="fashion-showcase__caption">
        <h2 id="fashion-example-heading">Example build / Fashion brand website</h2>
        <span>Depth carousel: looks step back as the next one arrives</span>
      </div>

      <div
        className="fashion-showcase__frame"
        ref={frameRef}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <img className="fashion-bg" src="/fashion/background.webp" alt="" loading="lazy" decoding="async" />

        <div className="fashion-nav" aria-hidden="true">
          <span className="fashion-nav__brand">Atelier Vela</span>
          <span className="fashion-nav__links">
            <span>New in</span>
            <span>Collections</span>
            <span>Atelier</span>
            <span>Journal</span>
          </span>
          <ShoppingBag className="fashion-nav__bag" />
        </div>

        <div className="fashion-copy" key={look.id}>
          <p className="fashion-copy__eyebrow">The autumn edit · Look {look.number}</p>
          <h3>{look.name}</h3>
          <p className="fashion-copy__text">{look.detail}</p>
          <span className="fashion-copy__count" aria-hidden="true">
            {look.number} <span>/ 0{n}</span>
          </span>
        </div>

        {/* Models: depth 0 is the active look, 1 and 2 stand further back */}
        <div className="fashion-stage" aria-hidden="true">
          {looks.map((item, index) => {
            const depth = (active - index + n) % n;
            return (
              <img
                key={item.id}
                src={item.model}
                alt=""
                width={357}
                height={900}
                loading="lazy"
                decoding="async"
                className="fashion-model"
                data-depth={depth}
              />
            );
          })}
        </div>

        <aside className="fashion-card" aria-label="Product in this look">
          <div className="fashion-card__media">
            {looks.map((item, index) => (
              <img
                key={item.id}
                src={item.garment}
                alt={index === active ? item.piece : ''}
                loading="lazy"
                decoding="async"
                className={index === active ? 'is-active' : undefined}
              />
            ))}
          </div>
          <div className="fashion-card__body" key={look.id}>
            <p className="fashion-card__name">{look.piece}</p>
            <p className="fashion-card__price">{look.price}</p>
          </div>
          <button type="button" className="fashion-card__cta" tabIndex={-1} aria-hidden="true">
            Add to bag
          </button>
        </aside>

        <div className="fashion-controls" role="group" aria-label="Choose a look">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous look">
            <ArrowLeft />
          </button>
          <div className="fashion-dots">
            {looks.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-label={`Look ${item.number}: ${item.name}`}
                aria-pressed={index === active}
                onClick={() => go(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next look">
            <ArrowRight />
          </button>
        </div>
      </div>
      <p className="fashion-showcase__note">Concept demo. Brand, products and prices are fictional; imagery is illustrative.</p>
    </section>
  );
}
