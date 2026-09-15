import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { projects } from '../config';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function PracticeCube() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setProgress(0.18);
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(clamp(-rect.top / travel, 0, 1));
    };

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Keep the strong opening angle from the reference for longer, then begin
   * a slower turn through the rest of the sticky section. */
  const spinProgress = clamp((progress - 0.18) / 0.82, 0, 1);
  const rotateX = -15 + spinProgress * 7;
  const rotateY = -45 + spinProgress * 225;
  const rotateZ = 0;

  const intro = clamp(progress / 0.16, 0, 1);
  const scale = 0.72 + intro * 0.28;
  const opacity = 0.55 + intro * 0.45;

  /* The cube is a six-face object, so use six images directly from the
   * Selected Works portfolio rather than the service/Expertise artwork. */
  const faces = projects.slice(0, 6);
  const faceTransforms = [
    'rotateY(0deg) translateZ(calc(var(--cube-size) / 2))',
    'rotateY(180deg) translateZ(calc(var(--cube-size) / 2))',
    'rotateY(90deg) translateZ(calc(var(--cube-size) / 2))',
    'rotateY(-90deg) translateZ(calc(var(--cube-size) / 2))',
    'rotateX(90deg) translateZ(calc(var(--cube-size) / 2))',
    'rotateX(-90deg) translateZ(calc(var(--cube-size) / 2))',
  ];

  const sceneStyle = {
    '--cube-size': 'min(39.6vw, 64.8vh)',
    width: 'var(--cube-size)',
    height: 'var(--cube-size)',
    perspective: 'calc(var(--cube-size) * 5)',
    transform: `scale(${scale})`,
    opacity,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      aria-label="Six faces of selected Four Pillars work"
      className="relative min-h-[300vh] bg-[#e5eeea] text-[#10201d]"
    >
      <div className="sticky top-0 h-screen min-h-[620px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_48%_at_50%_48%,rgba(47,179,164,0.15),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />

        <div className="absolute inset-0 grid place-items-center px-6">
          <div
            className="relative will-change-transform transition-opacity duration-200"
            style={sceneStyle}
          >
            <div
              className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
              style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)` }}
            >
              {faces.map((face, index) => (
                <div
                  key={face.title}
                  className="absolute inset-0 overflow-hidden border border-black/15 bg-[#0a1412] shadow-[inset_0_0_30px_rgba(0,0,0,0.35),0_28px_70px_rgba(14,27,24,0.18)] [backface-visibility:hidden]"
                  style={{ transform: faceTransforms[index] }}
                >
                  <img
                    src={face.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/[0.04]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-6 sm:left-10 bottom-12 sm:bottom-14">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#31524c]">
            — Six faces of selected work
          </p>
        </div>

        <div className="absolute right-6 sm:right-10 top-24 max-w-[280px] text-right">
          <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] text-[#31524c]/70">
            Luxury · Digital · Brand · Commerce · Automotive · Experience
          </p>
        </div>
      </div>
    </section>
  );
}
