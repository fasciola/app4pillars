import { useEffect, useRef } from 'react';

/**
 * Background clip for the closing CTA/footer, shared by every page. Loads
 * and plays only once on screen, stays muted, and falls back to the static
 * poster for visitors who asked for reduced motion or reduced data — same
 * treatment as the homepage's Reef/Drift clips.
 */
export default function FooterBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = '/footer-background.mp4';
          video.play()?.catch(() => undefined);
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '300px 0px', threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster="/footer-background.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
    />
  );
}
