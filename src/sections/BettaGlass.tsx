import { useEffect, useRef, useState } from 'react';
import './BettaGlass.css';

/**
 * Deliberately isolated from the app's other canvas effects: the original
 * procedural Three.js fish runs in its own lazy-loaded iframe.
 */
export default function BettaGlass() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const visibleRef = useRef(false);
  const [ready, setReady] = useState(false);

  const notifyVisibility = (visible: boolean) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'fourpillars-betta-visibility', visible },
      window.location.origin,
    );
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

  return (
    <section className="betta-showcase" id="living-design" ref={sectionRef} aria-labelledby="betta-heading">
      <div className="betta-showcase__intro">
        <div>
          <p className="betta-showcase__eyebrow">FOUR PILLARS / DIGITAL CRAFT</p>
          <h2 id="betta-heading">Designed to <em>move</em> you.</h2>
        </div>
        <p className="betta-showcase__description">
          Digital experiences should feel alive. A study in fluid movement,
          thoughtful detail and the art of creating something unforgettable.
        </p>
      </div>

      <div className="betta-showcase__frame">
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
        <div className="betta-showcase__glass" aria-hidden="true">
          <span className="betta-showcase__glass-shine" />
          <div className="betta-showcase__brand">
            <img src="/logo.png" alt="" loading="lazy" />
          </div>
          <span className="betta-showcase__glass-index">01 / LIVING DESIGN</span>
          <span className="betta-showcase__glass-caption">AN EXPERIENCE IN MOTION</span>
          <span className="betta-showcase__glass-corner betta-showcase__glass-corner--tl" />
          <span className="betta-showcase__glass-corner betta-showcase__glass-corner--br" />
        </div>
      </div>

      <div className="betta-showcase__footer">
        <span>THE ART OF INTERACTION</span>
        <span>MOVE YOUR CURSOR TO EXPLORE <span aria-hidden="true">↗</span></span>
      </div>
    </section>
  );
}
