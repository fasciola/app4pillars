const gpuCanvas = document.getElementById('services-field');
const fallbackCanvas = document.getElementById('services-field-fallback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let fallbackRunning = true;
let fallbackRaf = 0;
let fallbackLast = 0;
let fallbackBlades = [];
let fallbackWidth = 0;
let fallbackHeight = 0;
let fallbackDpr = 1;

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function prepareFallback() {
  if (!fallbackCanvas) return null;
  const ctx = fallbackCanvas.getContext('2d', { alpha: true });
  if (!ctx) return null;

  fallbackDpr = Math.min(window.devicePixelRatio || 1, 1.5);
  fallbackWidth = Math.max(1, window.innerWidth);
  fallbackHeight = Math.max(1, window.innerHeight);
  fallbackCanvas.width = Math.round(fallbackWidth * fallbackDpr);
  fallbackCanvas.height = Math.round(fallbackHeight * fallbackDpr);
  fallbackCanvas.style.width = `${fallbackWidth}px`;
  fallbackCanvas.style.height = `${fallbackHeight}px`;
  ctx.setTransform(fallbackDpr, 0, 0, fallbackDpr, 0, 0);

  const random = seededRandom(42817 + Math.round(fallbackWidth));
  const horizon = fallbackHeight * 0.47;
  const count = Math.min(1800, Math.max(720, Math.round(fallbackWidth * 0.9)));
  fallbackBlades = Array.from({ length: count }, (_, index) => {
    const depthSeed = Math.pow(random(), 0.62);
    const y = horizon + depthSeed * (fallbackHeight - horizon + 34);
    const depth = Math.max(0, Math.min(1, (y - horizon) / Math.max(1, fallbackHeight - horizon)));
    const x = random() * (fallbackWidth + 80) - 40;
    const length = 5 + depth * (32 + random() * 34);
    const width = 0.35 + depth * (0.55 + random() * 0.8);
    const lean = (random() - 0.5) * (2 + depth * 7);
    const phase = random() * Math.PI * 2;
    const brightness = Math.round(45 + depth * 38 + random() * 22);
    const green = Math.round(55 + depth * 55 + random() * 28);
    const red = Math.round(38 + depth * 35 + random() * 20);
    const alpha = 0.34 + depth * 0.55;
    return {
      x,
      y,
      length,
      width,
      lean,
      phase,
      color: `rgba(${red},${green},${Math.max(12, brightness - 28)},${alpha.toFixed(2)})`,
      highlight: index % 19 === 0,
    };
  });

  return ctx;
}

function drawFallback(now = 0) {
  if (!fallbackCanvas) return;
  const ctx = fallbackCanvas.getContext('2d');
  if (!ctx) return;

  const w = fallbackWidth;
  const h = fallbackHeight;
  const horizon = h * 0.47;
  const t = reducedMotion ? 0 : now * 0.001;

  ctx.clearRect(0, 0, w, h);

  // Warm procedural sky inspired by the Meridian meadow state.
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#4a3936');
  sky.addColorStop(0.26, '#9a6f59');
  sky.addColorStop(0.47, '#dfb98d');
  sky.addColorStop(0.58, '#a39752');
  sky.addColorStop(1, '#1c210d');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const sunX = w * 0.56;
  const sunY = h * 0.43;
  const sunRadius = Math.max(110, Math.min(w, h) * 0.24);
  const sun = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
  sun.addColorStop(0, 'rgba(255,245,207,0.95)');
  sun.addColorStop(0.12, 'rgba(255,226,166,0.62)');
  sun.addColorStop(0.42, 'rgba(245,183,113,0.18)');
  sun.addColorStop(1, 'rgba(245,183,113,0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);

  // Distant soft hills.
  ctx.beginPath();
  ctx.moveTo(0, horizon + 12);
  for (let x = 0; x <= w + 30; x += 28) {
    const nx = x / Math.max(1, w);
    const hill = Math.sin(nx * Math.PI * 3.2 + 0.6) * 13 + Math.sin(nx * Math.PI * 7.3) * 4;
    const mound = Math.exp(-Math.pow((nx - 0.57) / 0.19, 2)) * -34;
    ctx.lineTo(x, horizon + 14 + hill + mound);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  const hills = ctx.createLinearGradient(0, horizon - 40, 0, h);
  hills.addColorStop(0, 'rgba(84,91,34,0.86)');
  hills.addColorStop(0.35, 'rgba(66,73,24,0.94)');
  hills.addColorStop(1, 'rgba(19,25,9,1)');
  ctx.fillStyle = hills;
  ctx.fill();

  // Atmospheric light just above the grass line.
  const haze = ctx.createLinearGradient(0, horizon - 55, 0, horizon + 100);
  haze.addColorStop(0, 'rgba(255,230,181,0)');
  haze.addColorStop(0.52, 'rgba(255,220,153,0.20)');
  haze.addColorStop(1, 'rgba(255,220,153,0)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - 70, w, 190);

  // Thousands of inexpensive 2D grass blades provide a real grass fallback
  // when the browser cannot run the original WebGPU scene.
  ctx.lineCap = 'round';
  for (const blade of fallbackBlades) {
    const depth = Math.max(0, Math.min(1, (blade.y - horizon) / Math.max(1, h - horizon)));
    const wind = Math.sin(t * (0.72 + depth * 0.38) + blade.phase) * (0.7 + depth * 4.2);
    const tipX = blade.x + blade.lean + wind;
    const tipY = blade.y - blade.length;
    ctx.beginPath();
    ctx.moveTo(blade.x, blade.y);
    ctx.quadraticCurveTo(
      blade.x + (blade.lean + wind) * 0.28,
      blade.y - blade.length * 0.58,
      tipX,
      tipY,
    );
    ctx.strokeStyle = blade.color;
    ctx.lineWidth = blade.width;
    ctx.stroke();

    if (blade.highlight && depth > 0.46) {
      ctx.beginPath();
      ctx.arc(tipX, tipY, 0.7 + depth * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225,198,103,${(0.10 + depth * 0.20).toFixed(2)})`;
      ctx.fill();
    }
  }

  // Dark foreground depth, similar to the reference frame.
  const foreground = ctx.createLinearGradient(0, h * 0.69, 0, h);
  foreground.addColorStop(0, 'rgba(8,11,4,0)');
  foreground.addColorStop(1, 'rgba(5,8,3,0.48)');
  ctx.fillStyle = foreground;
  ctx.fillRect(0, h * 0.69, w, h * 0.31);
}

function fallbackLoop(now) {
  fallbackRaf = requestAnimationFrame(fallbackLoop);
  if (!fallbackRunning) return;
  if (reducedMotion || now - fallbackLast >= 33) {
    fallbackLast = now;
    drawFallback(now);
    if (reducedMotion) fallbackRunning = false;
  }
}

function startFallback() {
  if (!prepareFallback()) return;
  drawFallback(0);
  if (!reducedMotion) fallbackRaf = requestAnimationFrame(fallbackLoop);
}

function resizeFallback() {
  prepareFallback();
  drawFallback(performance.now());
}

function setFallback(reason) {
  document.body.classList.add('field-fallback-active');
  document.body.classList.remove('field-ready');
  fallbackRunning = !reducedMotion;
  if (reason) console.warn('[services-field]', reason);
}

async function bootWebGPU() {
  if (!gpuCanvas) return;

  if (!navigator.gpu) {
    setFallback('WebGPU is not available in this browser; using animated grass fallback.');
    return;
  }

  try {
    const { createStage } = await import(
      'https://cdn.jsdelivr.net/gh/fasciola/business-landing-page@main/src/scene/stage.js'
    );

    const stage = await createStage(gpuCanvas, { reducedMotion });
    const drive = { phase: 0, travel: 0 };
    let last = performance.now();
    let running = true;

    const updateTravel = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      drive.travel = reducedMotion ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
    };

    updateTravel();

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      stage.setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      );
    };

    const onResize = () => {
      stage.resize();
      updateTravel();
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) last = performance.now();
    };

    window.addEventListener('scroll', updateTravel, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    // Build the GPU pipeline before fading the true Meridian renderer in.
    stage.frame(1 / 60, drive);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    stage.frame(1 / 60, drive);
    document.body.classList.remove('field-fallback-active');
    document.body.classList.add('field-ready');

    // Freeze the fallback after the WebGPU scene has taken over.
    setTimeout(() => {
      fallbackRunning = false;
    }, 1000);

    function frame(now) {
      requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.08);
      last = now;
      stage.frame(dt || 1 / 60, drive);
    }

    requestAnimationFrame(frame);
  } catch (error) {
    setFallback(error?.message || error);
  }
}

startFallback();
window.addEventListener('resize', resizeFallback, { passive: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootWebGPU, { once: true });
} else {
  bootWebGPU();
}
