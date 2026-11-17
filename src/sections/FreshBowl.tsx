import { useEffect, useRef } from 'react';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import '@fontsource/jost/latin-600.css';
import './FreshBowl.css';

const facts = [
  { value: '12', label: 'Seasonal fruits' },
  { value: '0', label: 'Added sugar' },
  { value: '5 min', label: 'To your table' },
];

/**
 * Example build: a compact fresh-food landing page made from four transparent
 * cut-outs in /public/freshfood. Two bands (hero and produce) sit in one framed
 * card. Each band assembles as it scrolls into
 * view: it reads an eased 0..1 value from --food-p, which defaults to 1 so the
 * page is complete without JS or with reduced motion.
 */
export default function FreshBowl() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bands = Array.from(frame.querySelectorAll<HTMLElement>('[data-food-band]'));
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => 1 - Math.pow(1 - t, 2);

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const band of bands) {
        const rect = band.getBoundingClientRect();
        // 0 as the band's top edge comes into view, 1 once the band is
        // centred (or, for bands taller than the screen, well inside it).
        const startTop = vh * 0.95;
        const endTop = Math.min(vh * 0.5 - rect.height / 2, startTop - vh * 0.45);
        const progress = clamp((startTop - rect.top) / (startTop - endTop));
        band.style.setProperty('--food-p', ease(progress).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="food-showcase" id="fresh-food-example" aria-labelledby="food-heading">
      <div className="food-showcase__caption">
        <span>Example build / Fresh food brand</span>
        <span>Four cut-outs, two sections, assembled on scroll</span>
      </div>

      <div className="food-showcase__frame" ref={frameRef}>
        {/* Hero */}
        <div className="food-band food-band--hero" data-food-band>
          <div className="food-nav" aria-hidden="true">
            <span className="food-nav__brand">Zest Kitchen</span>
            <span className="food-nav__links">
              <span>Menu</span>
              <span>Bowls</span>
              <span>Seasonal</span>
              <span>Story</span>
            </span>
            <span className="food-nav__pill">Order</span>
          </div>

          <div className="food-hero__copy food-rise">
            <p className="food-eyebrow">Fresh bowls, made daily</p>
            <h2 id="food-heading">
              Feel good.
              <br />
              Eat fresh.
            </h2>
            <p>
              Seasonal fruit, crisp greens and nothing you can&rsquo;t pronounce. Bowls built to order and ready in
              minutes.
            </p>
            <button type="button" className="food-cta" onClick={scrollToContact}>
              Get a site like this <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="food-hero__bowl">
            <img
              src="/freshfood/hero-bowl.webp"
              alt="Dark bowl filled with oranges, strawberries, blueberries and blackberries, seen from above"
              width={900}
              height={956}
              loading="lazy"
              decoding="async"
            />
          </div>
          <img className="food-leaf food-leaf--a" src="/freshfood/leaf.webp" alt="" width={300} height={272} loading="lazy" decoding="async" />
          <img className="food-leaf food-leaf--b" src="/freshfood/leaf.webp" alt="" width={300} height={272} loading="lazy" decoding="async" />
          <img className="food-leaf food-leaf--c" src="/freshfood/leaf.webp" alt="" width={300} height={272} loading="lazy" decoding="async" />
        </div>

        {/* Produce */}
        <div className="food-band food-band--produce" data-food-band>
          <img
            className="food-orange"
            src="/freshfood/orange-half.webp"
            alt=""
            width={360}
            height={366}
            loading="lazy"
            decoding="async"
          />
          <div className="food-produce__bowl">
            <img
              src="/freshfood/berry-bowl.webp"
              alt="Bowl of blueberries, strawberries, blackberries and orange slices"
              width={700}
              height={724}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="food-produce__copy food-rise">
            <p className="food-eyebrow">The produce</p>
            <h3>Picked at its peak</h3>
            <p>
              Berries and citrus chosen for flavour first, delivered every morning and served the same day.
            </p>
            <ul className="food-facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
