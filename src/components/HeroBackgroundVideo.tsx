import { useEffect, useRef, useState } from 'react';

interface HeroBackgroundVideoProps {
  className?: string;
}

/**
 * Hero backdrop. The still poster is the first thing painted (and the page's
 * largest image), so it is in the static HTML. The 1.1 MB video is attached
 * only after the page has loaded, and skipped entirely on small screens,
 * when the visitor asked for reduced data or reduced motion.
 */
export default function HeroBackgroundVideo({ className = '' }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const skip =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData === true;
    if (skip) return;

    // Some browsers (iOS Low Power Mode) reject autoplay even for muted inline
    // video. The poster simply stays visible then.
    const tryPlay = () => {
      video.play()?.catch(() => setIsPlaying(false));
    };

    const start = () => {
      if (!video.src) {
        video.src = '/hero.mp4';
        video.load();
      }
      tryPlay();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && video.paused && video.src) tryPlay();
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('load', start);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`} aria-hidden="true">
      <img
        src="/hero-poster.webp"
        alt=""
        width={1280}
        height={714}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />

      <video
        ref={videoRef}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          isPlaying ? 'opacity-95' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    </div>
  );
}
