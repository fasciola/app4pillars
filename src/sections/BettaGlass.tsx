import { useEffect, useRef, useState } from 'react';
import './BettaGlass.css';

const pillars = [
  { name: 'Design', note: 'Interfaces with presence' },
  { name: 'Strategy', note: 'Built around your goals' },
  { name: 'Performance', note: 'Fast on every device' },
  { name: 'Growth', note: 'Made to convert' },
];

/**
 * Deliberately isolated from the app's other canvas effects: the original
 * procedural Three.js fish runs in its own lazy-loaded iframe. Frosted glass
 * panels sit in front of it, so the fish swims behind the copy.
 */
export default function BettaGlass() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const visibleRef = useRef(false);
  const [ready, setReady] = useState(false);

  const post = (message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  };
  const notifyVisibility = (visible: boolean) => {
    post({ type: 'fourpillars-betta-visibility', visible });
  };

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      notifyVisibility(entry.isIntersecting);
    }, { rootMargin: '180px 0px', threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // The glass panels cover part of the iframe, so pointer movement over them
  // is forwarded to the fish to keep it turning toward the cursor.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      post({
        type: 'fourpillars-betta-pointer',
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };
    frame.addEventListener('pointermove', onMove, { passive: true });
    return () => frame.removeEventListener('pointermove', onMove);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="betta-showcase" id="living-design" ref={sectionRef} aria-labelledby="betta-heading">
      <div className="betta-showcase__frame" ref={frameRef}>
        <div className="betta-showcase__water" aria-label="Interactive three-dimensional betta fish">
          <iframe
            ref={iframeRef}
            src="/betta-fish.html"
            title="Interactive 3D Betta fish swimming behind glass"
            loading="lazy"
            onLoad={() => {
              setReady(true);
              notifyVisibility(visibleRef.current);
            }}
          />
          {!ready && <div className="betta-showcase__loading" aria-hidden="true" />}
        </div>
        <div className="betta-showcase__tint" aria-hidden="true" />

        <div className="betta-showcase__brand betta-glass">
          <img src="/logo.png" alt="" loading="lazy" />
        </div>

        <div className="betta-showcase__panel betta-glass">
          <p className="betta-showcase__eyebrow">
            <span className="betta-showcase__dot" aria-hidden="true" />
            Four Pillars / Digital craft
          </p>
          <h2 id="betta-heading">Designed to <em>move</em> you.</h2>
          <p className="betta-showcase__description">
            Digital experiences should feel alive. A study in fluid movement,
            thoughtful detail and the art of creating something unforgettable.
          </p>
          <div className="betta-showcase__actions">
            <button type="button" className="betta-showcase__cta" onClick={() => scrollTo('contact')}>
              Start a project <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="betta-showcase__ghost betta-glass" onClick={() => scrollTo('portfolio')}>
              See our work
            </button>
          </div>
        </div>

        <p className="betta-showcase__tag betta-glass">
          <span className="betta-showcase__dot" aria-hidden="true" />
          Live 3D, rendered in your browser
        </p>

        <ul className="betta-showcase__pillars betta-glass" aria-label="Our four pillars">
          {pillars.map((pillar) => (
            <li key={pillar.name}>
              <strong>{pillar.name}</strong>
              <span>{pillar.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="betta-showcase__footer">
        <span>The art of interaction</span>
        <span>Move your cursor to explore <span aria-hidden="true">↗</span></span>
      </div>
    </section>
  );
}
