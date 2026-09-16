import { useEffect, useRef } from 'react';

/* A small ambient field of warm, drifting embers rendered around the practice
 * cube. Purely decorative — lazy-loaded and excluded from the prerendered
 * HTML (see PracticeCube.tsx), same treatment as the site's other canvas
 * background effects (FlowField, MoonlitRipple, RainOnGlass). */

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const EMBER_COUNT = 42;
// Matches --color-accent (#c8956c) used as the brand accent throughout the site.
const EMBER_COLOR = '200, 149, 108';
const GLOW_COLOR = '232, 199, 150';

function createEmber(width: number, height: number): Ember {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.018 + Math.random() * 0.045;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.012, // gentle upward drift, like rising embers
    radius: 0.6 + Math.random() * 1.7,
    baseAlpha: 0.25 + Math.random() * 0.55,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.014 + Math.random() * 0.03,
  };
}

export default function CubeSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const embers: Ember[] = Array.from({ length: EMBER_COUNT }, () => createEmber(width, height));

    const draw = (animated: boolean) => {
      ctx.clearRect(0, 0, width, height);
      for (const e of embers) {
        const twinkle = animated ? 0.5 + 0.5 * Math.sin(e.twinklePhase) : 0.7;
        const alpha = e.baseAlpha * (0.35 + 0.65 * twinkle);
        ctx.beginPath();
        ctx.shadowColor = `rgba(${GLOW_COLOR}, 0.85)`;
        ctx.shadowBlur = e.radius * 4.5;
        ctx.fillStyle = `rgba(${EMBER_COLOR}, ${alpha})`;
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    if (reducedMotion) {
      draw(false);
      const onResize = () => {
        resize();
        draw(false);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let raf = 0;
    let running = true;

    const step = () => {
      if (!running) return;
      for (const e of embers) {
        e.x += e.vx;
        e.y += e.vy;
        e.twinklePhase += e.twinkleSpeed;

        // Wrap around edges so the field feels continuous rather than emptying out.
        if (e.x < -4) e.x = width + 4;
        if (e.x > width + 4) e.x = -4;
        if (e.y < -4) e.y = height + 4;
        if (e.y > height + 4) e.y = -4;
      }
      draw(true);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
