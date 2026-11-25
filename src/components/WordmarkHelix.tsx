import { useEffect, useRef } from 'react';

/**
 * Glowing double-helix of the brand's own letters for the homepage's
 * "immersive" capability section — a canvas centerpiece adapted from the
 * CKS project's HeritageHelix effect (two character strands orbiting a
 * shared axis in perspective, which is what gives the shape its tapered,
 * cone-like read as strands swing toward and away from the camera).
 *
 * Re-themed here for Four Pillars: the letters spell FOURPILLARSWEB instead
 * of CKS's ingredient copy, and each strand glows in the site's bioluminescent
 * cyan/violet palette (via canvas shadowBlur) instead of CKS's flat ink-on-
 * parchment look. Pure 2D canvas, no WebGL — consistent with the rest of the
 * site's "3D" effects (FlowField's shader canvas, PracticeCube's CSS cube).
 * Disabled (renders one static frame) under prefers-reduced-motion.
 */

interface Particle {
  y: number;
  offset: number;
  char: string;
  color: string;
  x: number;
  screenY: number;
  size: number;
  alpha: number;
}

const WORD = 'FOURPILLARSWEB';
const CYAN = '#35d8f0';
const VIOLET = '#a878ff';

export default function WordmarkHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chars = WORD.split('');
    const totalRungs = chars.length * 3; // three clean passes of the word per strand
    const fov = 1000;

    // Two strands, half a turn apart, each stepping through the word on its
    // own so both read as FOURPILLARSWEB rather than an interleaved jumble.
    const strand1: Particle[] = [];
    const strand2: Particle[] = [];

    for (let i = 0; i < totalRungs; i++) {
      strand1.push({
        y: i,
        offset: 0,
        char: chars[i % chars.length],
        color: i % 2 === 0 ? CYAN : VIOLET,
        x: 0,
        screenY: 0,
        size: 14,
        alpha: 1,
      });
      strand2.push({
        y: i,
        offset: Math.PI,
        char: chars[(i + 7) % chars.length],
        color: i % 2 === 0 ? VIOLET : CYAN,
        x: 0,
        screenY: 0,
        size: 14,
        alpha: 1,
      });
    }

    let canvasW = 0;
    let canvasH = 0;
    let radius = 120;
    let spacingY = 18;
    let baseFont = 14;

    function updateSize() {
      const rect = container!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height + 'px';
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      canvasW = rect.width;
      canvasH = rect.height;
      // Proportions scale to the container instead of CKS's fixed pixel
      // values, so the same shape reads correctly in our compact square
      // stage rather than CKS's tall, full-bleed scroll section.
      radius = canvasW * 0.3;
      spacingY = canvasH / (totalRungs * 0.92);
      baseFont = canvasW * 0.072;
    }

    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);

    function updateParticle(p: Particle, t: number) {
      const angle = p.y * 0.14 + t + p.offset;
      const x3d = Math.sin(angle) * radius;
      const z3d = Math.cos(angle) * radius;
      const scale = fov / (fov + z3d);
      p.x = canvasW * 0.5 + x3d * scale;
      p.screenY = p.y * spacingY * scale + canvasH * 0.06;
      p.size = baseFont * scale;
      p.alpha = scale > 1 ? 1 : 0.3;
    }

    function drawFrame(t: number) {
      ctx!.clearRect(0, 0, canvasW, canvasH);

      for (let i = 0; i < totalRungs; i++) {
        updateParticle(strand1[i], t);
        updateParticle(strand2[i], t);
      }

      // Faint connecting rungs, so the two strands still read as one
      // structure rather than a cloud of loose letters.
      for (let i = 0; i < totalRungs; i++) {
        const p1 = strand1[i];
        const p2 = strand2[i];
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.screenY);
        ctx!.lineTo(p2.x, p2.screenY);
        ctx!.strokeStyle = 'rgba(190, 225, 255, 0.10)';
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // Farthest (smallest) first, so nearer glowing letters sit on top.
      const allParticles = [...strand1, ...strand2].sort((a, b) => a.size - b.size);

      for (const p of allParticles) {
        ctx!.font = `700 ${p.size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 10 + p.size * 0.9;
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fillText(p.char, p.x, p.screenY);
        // Second, un-blurred pass gives the glyph a bright core inside its glow.
        ctx!.shadowBlur = 0;
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx!.globalAlpha = p.alpha * 0.85;
        ctx!.fillText(p.char, p.x, p.screenY);
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
    }

    if (reduceMotion) {
      drawFrame(0);
      return () => ro.disconnect();
    }

    function tick() {
      timeRef.current += 0.006;
      drawFrame(timeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
