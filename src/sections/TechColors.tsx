import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import './TechColors.css';

/**
 * Example build: an audio-product colour carousel. Picking a colour slides the
 * headphones through the centre, cross-fades the matching background and
 * floats the matching ear-cup detail beside them. Neighbouring colours wait,
 * small and blurred, at the edges. Every colour shares one crop box in
 * /public/tech so the products line up exactly.
 */
const variants = [
  { id: 'coral', name: 'Coral', swatch: '#e9825e', text: 'Warm, bright and made to be seen.' },
  { id: 'steel-blue', name: 'Steel Blue', swatch: '#5d7f8e', text: 'Cool anodized metal with a quiet, focused finish.' },
  { id: 'lilac', name: 'Lilac', swatch: '#a596c0', text: 'Soft dusty violet, from cushions to headband.' },
];

const specs = ['Adaptive noise cancelling', '40-hour battery', 'Spatial audio'];
const AUTO_MS = 3600;

/** -1 = waiting at the left edge, 0 = centre, 1 = waiting at the right edge. */
function relative(index: number, active: number, n: number) {
  const diff = (index - active + n) % n;
  return diff === 0 ? 0 : diff === 1 ? 1 : -1;
}

export default function TechColors() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const n = variants.length;

  const go = (index: number) => {
    setPrevious(active);
    setActive(((index % n) + n) % n);
  };

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
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % n);
    }, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [active, visible, paused, n]);

  const variant = variants[active];

  return (
    <section className="tech-showcase" id="tech-example" aria-labelledby="tech-example-heading">
      <div className="tech-showcase__caption">
        <h2 id="tech-example-heading">Example build / Tech product website</h2>
        <span>Colour carousel: product, detail and background change together</span>
      </div>

      <div
        className="tech-showcase__frame"
        ref={frameRef}
        data-variant={variant.id}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {variants.map((item, index) => (
          <img
            key={item.id}
            className={`tech-bg${index === active ? ' is-active' : ''}`}
            src={`/tech/background-${item.id}.webp`}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}

        <div className="tech-nav" aria-hidden="true">
          <span className="tech-nav__brand">Sonora</span>
          <span className="tech-nav__links">
            <span>Headphones</span>
            <span>Earbuds</span>
            <span>Speakers</span>
            <span>Support</span>
          </span>
          <span className="tech-nav__pill">Buy now</span>
        </div>

        <div className="tech-copy">
          <p className="tech-copy__eyebrow">Wireless over-ear headphones</p>
          <h3>
            Sonora <span>One</span>
          </h3>
          <p className="tech-copy__colour" key={variant.id}>
            <span style={{ background: variant.swatch }} aria-hidden="true" />
            {variant.name}
            <em>{variant.text}</em>
          </p>
          <ul className="tech-copy__specs">
            {specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>

        {/* Headphones: centre for the active colour, small and blurred at the edges for the rest */}
        <div className="tech-stage" aria-hidden="true">
          {variants.map((item, index) => {
            const rel = relative(index, active, n);
            const was = relative(index, previous, n);
            // An item wrapping from one edge to the other should not visibly fly across.
            const jump = Math.abs(rel - was) > 1;
            return (
              <img
                key={item.id}
                src={`/tech/headphones-${item.id}.webp`}
                alt=""
                width={584}
                height={760}
                loading="lazy"
                decoding="async"
                className={`tech-product${jump ? ' is-jumping' : ''}`}
                data-pos={rel}
              />
            );
          })}
          {variants.map((item, index) => (
            <img
              key={`detail-${item.id}`}
              src={`/tech/earcup-${item.id}.webp`}
              alt=""
              width={328}
              height={560}
              loading="lazy"
              decoding="async"
              className={`tech-detail${index === active ? ' is-active' : ''}`}
            />
          ))}
        </div>

        <div className="tech-controls" role="group" aria-label="Choose a colour">
          <button type="button" className="tech-arrow" onClick={() => go(active - 1)} aria-label="Previous colour">
            <ArrowLeft />
          </button>
          <div className="tech-swatches">
            {variants.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-label={item.name}
                aria-pressed={index === active}
                onClick={() => go(index)}
                style={{ background: item.swatch }}
              />
            ))}
          </div>
          <button type="button" className="tech-arrow" onClick={() => go(active + 1)} aria-label="Next colour">
            <ArrowRight />
          </button>
        </div>
      </div>
      <p className="tech-showcase__note">Concept demo. Brand and product are fictional; imagery is illustrative.</p>
    </section>
  );
}
