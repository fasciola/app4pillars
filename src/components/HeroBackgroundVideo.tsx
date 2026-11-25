interface HeroBackgroundVideoProps {
  className?: string;
}

/**
 * Hero backdrop for the homepage and every city landing page. A still photo
 * of Business Lab's own Dubai office tower at sunset, with a slow cinematic
 * Ken Burns drift (disabled for visitors who asked for reduced motion).
 *
 * This replaced an earlier video (public/hero.mp4) that turned out to be a
 * mismatched macro shot of moss and wildflowers — on-brand UAE photography
 * instead, as a lightweight static image rather than a 1MB+ video.
 */
export default function HeroBackgroundVideo({ className = '' }: HeroBackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`} aria-hidden="true">
      <img
        src="/business-lab/business-lab-office-tower.webp"
        alt=""
        width={1672}
        height={941}
        fetchPriority="high"
        className="hero-kenburns absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />
    </div>
  );
}
