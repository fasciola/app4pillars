const canvas = document.getElementById('services-field');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setFallback(reason) {
  document.body.classList.add('field-fallback-active');
  if (reason) console.warn('[services-field]', reason);
}

async function boot() {
  if (!canvas) return;
  if (!navigator.gpu) {
    setFallback('WebGPU is not available in this browser.');
    return;
  }

  try {
    const { createStage } = await import(
      'https://cdn.jsdelivr.net/gh/fasciola/business-landing-page@main/src/scene/stage.js'
    );

    const stage = await createStage(canvas, { reducedMotion });
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

    // Build the GPU pipeline before fading the canvas in.
    stage.frame(1 / 60, drive);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    stage.frame(1 / 60, drive);
    document.body.classList.add('field-ready');

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
