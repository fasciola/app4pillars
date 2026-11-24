import { useEffect, useRef, useState, type ReactNode } from 'react';

interface PinnedRailProps {
  /** The <li> cards. */
  children: ReactNode;
  /** Classes for the list when the rail is not pinned (desktop, or before JS runs). */
  listClassName: string;
  /** Accessible label for the list. */
  label?: string;
}

const MOBILE_QUERY = '(max-width: 1023px)';
const HEADER_OFFSET = 64; // height of the sticky site header

/**
 * On phones and tablets a row of cards is pinned to the screen and slides
 * sideways as the visitor scrolls down, so every card passes by without a
 * swipe. On desktop (and with reduced motion, or before the script runs) the
 * list renders with its normal classes: a grid, or a swipeable row.
 */
export default function PinnedRail({ children, listClassName, label }: PinnedRailProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);

  // Decide whether to pin: small screen and motion allowed.
  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPinned(mobile.matches && !reduced.matches);
    update();
    mobile.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const panel = panelRef.current;
    const track = trackRef.current;
    if (!outer || !panel || !track) return;

    if (!pinned) {
      outer.style.height = '';
      track.style.transform = '';
      return;
    }

    let travel = 0;
    let frame = 0;

    const measure = () => {
      travel = Math.max(0, track.scrollWidth - panel.clientWidth);
      outer.style.height = `${panel.clientHeight + travel}px`;
      apply();
    };

    const apply = () => {
      frame = 0;
      const top = outer.getBoundingClientRect().top - HEADER_OFFSET;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0;
      track.style.transform = `translate3d(${-progress * travel}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    measure();
    // Images can change the track width once they load.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(panel);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      outer.style.height = '';
      track.style.transform = '';
    };
  }, [pinned]);

  return (
    <div ref={outerRef} className="relative">
      <div
        ref={panelRef}
        className={
          pinned
            ? '-mx-6 flex h-[calc(100svh-64px)] flex-col justify-center overflow-hidden sm:-mx-10'
            : undefined
        }
        style={pinned ? { position: 'sticky', top: HEADER_OFFSET } : undefined}
      >
        <ul
          ref={trackRef}
          aria-label={label}
          className={pinned ? 'flex w-max gap-4 px-6 will-change-transform sm:gap-5 sm:px-10' : listClassName}
        >
          {children}
        </ul>
        {pinned && (
          <div className="mx-6 mt-6 h-px overflow-hidden bg-white/10 sm:mx-10" aria-hidden="true">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-white/60" />
          </div>
        )}
      </div>
    </div>
  );
}
