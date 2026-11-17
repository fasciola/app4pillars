import { useEffect, useRef } from 'react';
import { Droplet, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import '@fontsource/bodoni-moda/latin-500.css';
import '@fontsource/allura/latin-400.css';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import './SkinRitual.css';

const benefits = [
  { icon: Droplet, label: 'Hydrates deeply' },
  { icon: Sparkles, label: 'Brightens skin' },
  { icon: Sprout, label: 'Nourishes naturally' },
  { icon: ShieldCheck, label: 'Strengthens skin barrier' },
];

/**
 * Example build: a skincare product section assembled from three transparent
 * cut-outs (cream swirl, serum bottle, botanical sprig) in /public/skincare.
 * The sage capsule, gold outline and all typography are CSS, so the copy stays
 * real text. The pieces assemble as the section scrolls into view, then drift
 * slightly with the cursor; both are switched off for reduced-motion users.
 */
export default function SkinRitual() {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll assembly: as the frame travels up the viewport the pieces arrive
  // one after another (capsule, swirl, bottle, sprig, then the copy). Each
  // piece reads its own eased 0..1 value from a CSS variable. Without JS, or
  // with reduced motion, the variables keep their default of 1 (assembled).
  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    // [variable, start, end] as fractions of the overall scroll progress
    const stages: Array<[string, number, number]> = [
      ['--skin-a-word', 0, 0.45],
      ['--skin-a-capsule', 0.05, 0.5],
      ['--skin-a-swirl', 0.2, 0.7],
      ['--skin-a-bottle', 0.35, 0.85],
      ['--skin-a-sprig', 0.5, 0.95],
      ['--skin-a-text', 0.6, 1],
    ];

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      // Measured on the product stage so the pieces are on screen while they
      // move: 0 as the stage's top edge comes into view, 1 once the stage is
      // centred in the viewport.
      const startTop = vh * 0.92;
      const endTop = Math.min(vh * 0.5 - rect.height / 2, startTop - vh * 0.45);
      const progress = clamp((startTop - rect.top) / (startTop - endTop));
      for (const [name, start, end] of stages) {
        frame.style.setProperty(name, ease(clamp((progress - start) / (end - start))).toFixed(4));
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

  // Cursor drift, layered on top of the assembled position.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = frame.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        frame.style.setProperty('--skin-px', x.toFixed(3));
        frame.style.setProperty('--skin-py', y.toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      frame.style.setProperty('--skin-px', '0');
      frame.style.setProperty('--skin-py', '0');
    };
    frame.addEventListener('pointermove', onMove, { passive: true });
    frame.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="skin-showcase" id="skincare-example" aria-labelledby="skin-example-heading">
      <div className="skin-showcase__caption">
        <h2 id="skin-example-heading">Example build / Skincare brand website</h2>
        <span>Layered cut-outs, real text, no flat banner image</span>
      </div>

      <div className="skin-showcase__frame" ref={frameRef}>
        <div className="skin-showcase__top">
          <p>
            Skincare
            <br />
            Essentials
          </p>
          <p>
            Good skin
            <br />
            Good mood
          </p>
        </div>

        <p className="skin-showcase__word" aria-hidden="true">
          SKIN
        </p>

        <div className="skin-showcase__body">
          <ul className="skin-showcase__benefits" aria-label="Serum benefits">
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="skin-showcase__icon" aria-hidden="true">
                  <Icon strokeWidth={1.25} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="skin-showcase__stage" ref={stageRef}>
            <span className="skin-showcase__capsule" aria-hidden="true" />
            <div className="skin-showcase__layer skin-showcase__layer--swirl">
              <img src="/skincare/cream-swirl.webp" alt="" width={820} height={1297} loading="lazy" decoding="async" />
            </div>
            <div className="skin-showcase__layer skin-showcase__layer--bottle">
              <img
                src="/skincare/serum-bottle.webp"
                alt="Radiance Glow Serum, a 30 ml dropper bottle with niacinamide and hyaluronic acid"
                width={478}
                height={1407}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="skin-showcase__layer skin-showcase__layer--sprig">
              <img src="/skincare/botanical-sprig.webp" alt="" width={520} height={799} loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="skin-showcase__copy">
            <h3 id="skin-heading">
              <span className="skin-showcase__script">Daily</span>
              Skin Ritual
            </h3>
            <span className="skin-showcase__rule" aria-hidden="true" />
            <p>
              Healthy skin is not an overnight process. It&rsquo;s a daily ritual. Consistency is the real secret.
            </p>
            <button type="button" className="skin-showcase__cta" onClick={scrollToContact}>
              Get a page like this <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="skin-showcase__base">
          <p>For all skin types</p>
          <p>
            Simple ingredients
            <br />
            Real results
          </p>
          <p>Niacinamide + Hyaluronic acid</p>
        </div>
      </div>
    </section>
  );
}
