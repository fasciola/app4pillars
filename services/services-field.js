const gpuCanvas = document.getElementById('services-field');
const fallbackCanvas = document.getElementById('services-field-fallback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let fallbackRunning = true;
let fallbackRaf = 0;
let fallbackLast = 0;
let fallbackCtx = null;
let fallbackLayers = [];
let fallbackWidth = 0;
let fallbackHeight = 0;
let fallbackDpr = 1;
let scrollProgress = 0;

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

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function createGrassLayer(config, random) {
  const blades = [];
  for (let i = 0; i < config.count; i += 1) {
    const depth = Math.pow(random(), config.depthBias);
    const x = random() * (fallbackWidth + 100) - 50;
    const y = config.yStart + depth * (config.yEnd - config.yStart) + (random() - 0.5) * config.yJitter;
    const height = config.minHeight + depth * (config.maxHeight - config.minHeight) * (0.72 + random() * 0.42);
    const width = config.minWidth + depth * (config.maxWidth - config.minWidth) * (0.75 + random() * 0.45);
    const lean = (random() - 0.5) * config.lean;
    const phase = random() * Math.PI * 2;
    const tone = random();
    const red = mix(config.colorNear[0], config.colorFar[0], tone);
    const green = mix(config.colorNear[1], config.colorFar[1], tone);
    const blue = mix(config.colorNear[2], config.colorFar[2], tone);
    const alpha = config.alphaMin + random() * (config.alphaMax - config.alphaMin);

    blades.push({
      x,
      y,
      height,
      width,
      lean,
      phase,
      windScale: 0.7 + random() * 0.65,
      color: `rgba(${red},${green},${blue},${alpha.toFixed(3)})`,
      seedHead: config.seedHeads && random() > 0.965,
      glint: random() > 0.982,
    });
  }
  return { ...config, blades };
}

function buildFallbackLayers() {
  const random = seededRandom(42817 + Math.round(fallbackWidth * 0.7) + Math.round(fallbackHeight));
  const horizon = fallbackHeight * 0.455;
  const isSmall = fallbackWidth < 760;
  const density = isSmall ? 0.72 : 1;

  const farCount = Math.min(1100, Math.max(420, Math.round(fallbackWidth * 0.48 * density)));
  const midCount = Math.min(1700, Math.max(700, Math.round(fallbackWidth * 0.76 * density)));
  const nearCount = Math.min(1900, Math.max(760, Math.round(fallbackWidth * 0.88 * density)));

  fallbackLayers = [
    createGrassLayer(
      {
        count: farCount,
        yStart: horizon - 4,
        yEnd: fallbackHeight * 0.63,
        yJitter: 15,
        minHeight: Math.max(5, fallbackHeight * 0.012),
        maxHeight: Math.max(14, fallbackHeight * 0.045),
        minWidth: 0.35,
        maxWidth: 0.75,
        lean: 4,
        depthBias: 0.72,
        alphaMin: 0.28,
        alphaMax: 0.62,
        colorNear: [102, 111, 43],
        colorFar: [145, 139, 58],
        wind: 1.0,
        blur: 0.75,
        seedHeads: false,
      },
      random,
    ),
    createGrassLayer(
      {
        count: midCount,
        yStart: fallbackHeight * 0.56,
        yEnd: fallbackHeight * 0.80,
        yJitter: 25,
        minHeight: Math.max(15, fallbackHeight * 0.035),
        maxHeight: Math.max(48, fallbackHeight * 0.115),
        minWidth: 0.55,
        maxWidth: 1.2,
        lean: 8,
        depthBias: 0.66,
        alphaMin: 0.48,
        alphaMax: 0.86,
        colorNear: [73, 90, 24],
        colorFar: [124, 137, 46],
        wind: 1.45,
        blur: 0.25,
        seedHeads: true,
      },
      random,
    ),
    createGrassLayer(
      {
        count: nearCount,
        yStart: fallbackHeight * 0.70,
        yEnd: fallbackHeight + 18,
        yJitter: 34,
        minHeight: Math.max(34, fallbackHeight * 0.075),
        maxHeight: Math.max(118, fallbackHeight * 0.255),
        minWidth: 0.85,
        maxWidth: 2.15,
        lean: 14,
        depthBias: 0.55,
        alphaMin: 0.67,
        alphaMax: 0.98,
        colorNear: [42, 64, 13],
        colorFar: [94, 121, 30],
        wind: 2.05,
        blur: 0,
        seedHeads: true,
      },
      random,
    ),
  ];
}

function prepareFallback() {
  if (!fallbackCanvas) return null;
  fallbackCtx = fallbackCanvas.getContext('2d', { alpha: true });
  if (!fallbackCtx) return null;

  fallbackDpr = Math.min(window.devicePixelRatio || 1, fallbackWidth < 760 ? 1.25 : 1.6);
  fallbackWidth = Math.max(1, window.innerWidth);
  fallbackHeight = Math.max(1, window.innerHeight);
  fallbackCanvas.width = Math.round(fallbackWidth * fallbackDpr);
  fallbackCanvas.height = Math.round(fallbackHeight * fallbackDpr);
  fallbackCanvas.style.width = `${fallbackWidth}px`;
  fallbackCanvas.style.height = `${fallbackHeight}px`;
  fallbackCtx.setTransform(fallbackDpr, 0, 0, fallbackDpr, 0, 0);

  buildFallbackLayers();
  return fallbackCtx;
}

function drawSky(ctx, w, h) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#58433f');
  sky.addColorStop(0.20, '#8d6858');
  sky.addColorStop(0.38, '#c89472');
  sky.addColorStop(0.50, '#e7bd8c');
  sky.addColorStop(0.58, '#a5a05a');
  sky.addColorStop(0.72, '#58651f');
  sky.addColorStop(1, '#141b09');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
}

function drawSunAndGlow(ctx, w, h, now) {
  const pulse = reducedMotion ? 1 : 1 + Math.sin(now * 0.00022) * 0.025;
  const sunX = w * 0.56;
  const sunY = h * 0.405;
  const outerRadius = Math.max(190, Math.min(w, h) * 0.40) * pulse;

  const outer = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, outerRadius);
  outer.addColorStop(0, 'rgba(255,250,225,0.92)');
  outer.addColorStop(0.07, 'rgba(255,236,194,0.76)');
  outer.addColorStop(0.23, 'rgba(255,211,149,0.38)');
  outer.addColorStop(0.48, 'rgba(245,181,111,0.13)');
  outer.addColorStop(1, 'rgba(245,181,111,0)');
  ctx.fillStyle = outer;
  ctx.fillRect(0, 0, w, h);

  const horizontal = ctx.createLinearGradient(0, sunY, w, sunY);
  horizontal.addColorStop(0, 'rgba(255,229,178,0)');
  horizontal.addColorStop(0.33, 'rgba(255,226,172,0.06)');
  horizontal.addColorStop(0.56, 'rgba(255,241,207,0.22)');
  horizontal.addColorStop(0.78, 'rgba(255,225,170,0.05)');
  horizontal.addColorStop(1, 'rgba(255,225,170,0)');
  ctx.fillStyle = horizontal;
  ctx.fillRect(0, sunY - h * 0.075, w, h * 0.15);

  const discRadius = Math.max(14, Math.min(w, h) * 0.018);
  const disc = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, discRadius * 2.4);
  disc.addColorStop(0, 'rgba(255,255,239,1)');
  disc.addColorStop(0.46, 'rgba(255,245,211,0.92)');
  disc.addColorStop(1, 'rgba(255,236,190,0)');
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(sunX, sunY, discRadius * 2.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawHill(ctx, w, h, baseline, colorTop, colorBottom, amplitude, frequency, offset, moundStrength) {
  const horizon = h * baseline;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  for (let x = 0; x <= w + 30; x += 22) {
    const nx = x / Math.max(1, w);
    const waves = Math.sin(nx * Math.PI * frequency + offset) * amplitude + Math.sin(nx * Math.PI * (frequency * 2.15) + 0.4) * amplitude * 0.22;
    const mound = Math.exp(-Math.pow((nx - 0.56) / 0.19, 2)) * moundStrength;
    ctx.lineTo(x, horizon + waves + mound);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();

  const fill = ctx.createLinearGradient(0, horizon - 55, 0, h);
  fill.addColorStop(0, colorTop);
  fill.addColorStop(1, colorBottom);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawHills(ctx, w, h) {
  drawHill(ctx, w, h, 0.455, 'rgba(111,104,69,0.74)', 'rgba(57,64,25,0.88)', 9, 2.25, 0.8, -25);
  drawHill(ctx, w, h, 0.495, 'rgba(91,99,38,0.88)', 'rgba(34,45,14,0.96)', 14, 3.15, 0.25, -30);
  drawHill(ctx, w, h, 0.535, 'rgba(74,86,28,0.95)', 'rgba(21,29,9,1)', 19, 3.8, 1.1, -22);
}

function drawHaze(ctx, w, h) {
  const horizon = h * 0.47;
  const haze = ctx.createLinearGradient(0, horizon - h * 0.13, 0, horizon + h * 0.28);
  haze.addColorStop(0, 'rgba(255,244,217,0)');
  haze.addColorStop(0.28, 'rgba(255,236,196,0.16)');
  haze.addColorStop(0.52, 'rgba(255,222,168,0.22)');
  haze.addColorStop(0.76, 'rgba(236,203,139,0.08)');
  haze.addColorStop(1, 'rgba(236,203,139,0)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - h * 0.15, w, h * 0.46);

  const veil = ctx.createLinearGradient(0, 0, w, 0);
  veil.addColorStop(0, 'rgba(255,242,218,0.035)');
  veil.addColorStop(0.50, 'rgba(255,242,218,0.075)');
  veil.addColorStop(1, 'rgba(255,242,218,0.018)');
  ctx.fillStyle = veil;
  ctx.fillRect(0, h * 0.30, w, h * 0.35);
}

function drawGrassLayer(ctx, layer, now, layerIndex) {
  const t = reducedMotion ? 0 : now * 0.001;
  const parallax = (scrollProgress - 0.5) * (layerIndex + 1) * 5;
  ctx.save();
  if (layer.blur > 0) ctx.filter = `blur(${layer.blur}px)`;
  ctx.lineCap = 'round';

  for (const blade of layer.blades) {
    const local = blade.y / Math.max(1, fallbackHeight);
    const breeze = Math.sin(t * (0.62 + layer.wind * 0.12) + blade.phase + blade.x * 0.0015) * layer.wind * blade.windScale;
    const gust = Math.sin(t * 0.21 + blade.phase * 0.35) * layer.wind * 0.45;
    const sway = (breeze + gust) * (0.8 + local * 2.8);
    const baseX = blade.x + parallax;
    const tipX = baseX + blade.lean + sway;
    const tipY = blade.y - blade.height;

    ctx.beginPath();
    ctx.moveTo(baseX, blade.y);
    ctx.quadraticCurveTo(
      baseX + (blade.lean + sway) * 0.28,
      blade.y - blade.height * 0.56,
      tipX,
      tipY,
    );
    ctx.strokeStyle = blade.color;
    ctx.lineWidth = blade.width;
    ctx.stroke();

    if (blade.seedHead) {
      ctx.beginPath();
      ctx.ellipse(tipX, tipY - 1, Math.max(0.7, blade.width * 0.9), Math.max(1.7, blade.width * 1.8), (blade.lean + sway) * 0.025, 0, Math.PI * 2);
      ctx.fillStyle = layerIndex === 2 ? 'rgba(180,165,70,0.34)' : 'rgba(198,183,90,0.22)';
      ctx.fill();
    }

    if (blade.glint && layerIndex > 0) {
      ctx.beginPath();
      ctx.arc(tipX, tipY, 0.55 + layerIndex * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = layerIndex === 2 ? 'rgba(239,211,120,0.20)' : 'rgba(239,211,120,0.12)';
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawForegroundDepth(ctx, w, h) {
  const shade = ctx.createLinearGradient(0, h * 0.67, 0, h);
  shade.addColorStop(0, 'rgba(8,11,4,0)');
  shade.addColorStop(0.58, 'rgba(7,10,3,0.10)');
  shade.addColorStop(1, 'rgba(3,6,2,0.42)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, h * 0.67, w, h * 0.33);
}

function drawFallback(now = 0) {
  const ctx = fallbackCtx || fallbackCanvas?.getContext('2d');
  if (!ctx || !fallbackCanvas) return;

  const w = fallbackWidth;
  const h = fallbackHeight;
  ctx.clearRect(0, 0, w, h);

  drawSky(ctx, w, h);
  drawSunAndGlow(ctx, w, h, now);
  drawHills(ctx, w, h);
  drawHaze(ctx, w, h);

  fallbackLayers.forEach((layer, index) => drawGrassLayer(ctx, layer, now, index));
  drawForegroundDepth(ctx, w, h);
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

function updateScrollProgress() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
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
    setFallback('WebGPU is not available in this browser; using layered animated meadow fallback.');
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

    stage.frame(1 / 60, drive);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    stage.frame(1 / 60, drive);
    document.body.classList.remove('field-fallback-active');
    document.body.classList.add('field-ready');

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

updateScrollProgress();
startFallback();
window.addEventListener('resize', resizeFallback, { passive: true });
window.addEventListener('scroll', updateScrollProgress, { passive: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootWebGPU, { once: true });
} else {
  bootWebGPU();
}
