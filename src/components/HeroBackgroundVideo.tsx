import { useEffect, useRef, useState } from 'react';

interface HeroBackgroundVideoProps {
  className?: string;
}

export default function HeroBackgroundVideo({ className = '' }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Some mobile browsers, especially iOS in Low Power Mode, can reject
    // autoplay even for muted inline video. Keep the poster visible whenever
    // playback is blocked instead of exposing the browser's native play UI.
    const tryPlay = () => {
      const playAttempt = video.play();
      if (playAttempt) {
        playAttempt.catch(() => setIsPlaying(false));
      }
    };

    tryPlay();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && video.paused) tryPlay();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`} aria-hidden="true">
      <img
        src="/contact-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover object-center pointer-events-none transition-opacity duration-700 ${
          isPlaying ? 'opacity-95' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/contact-poster.jpg"
        controls={false}
        disablePictureInPicture
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      >
        <source src="/contact-optimized.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
