import { useEffect, useRef, useState } from "react";
import "@fontsource/bodoni-moda/latin-500.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "@fontsource/jost/latin-400.css";
import "@fontsource/jost/latin-500.css";
import "./IcedMenu.css";

/**
 * Example build: an iced-drinks hero where scrolling (or picking a thumbnail)
 * moves to the next drink and swaps the cup, the
 * copy, the giant ghost word, the floating garnish and the background glow.
 *
 * The four cups in /public/coffee share one crop box, so they sit in exactly
 * the same place when they swap. `bit` is the floating garnish for each drink.
 */
const drinks = [
  {
    id: "latte",
    name: "Iced Latte",
    title: ["Iced Latte", "& Double Espresso"],
    ghost: "Iced Latte Espresso",
    text: "Two shots of house espresso over cold milk and clear ice. Silky, balanced and lightly sweet.",
    cup: "/coffee/latte.webp",
    bit: "/coffee/bean.webp",
  },
  {
    id: "cocoa",
    name: "Iced Chocolate",
    title: ["Iced Chocolate", "& Dark Cocoa"],
    ghost: "Dark Cocoa Cream",
    text: "Dark cocoa melted into cold milk, finished with whipped cream and shaved chocolate.",
    cup: "/coffee/cocoa.webp",
    bit: "/coffee/cocoa-chunk.webp",
  },
  {
    id: "matcha",
    name: "Iced Matcha",
    title: ["Iced Matcha", "& Sweet Cream"],
    ghost: "Matcha Sweet Cream",
    text: "Stone-ground matcha whisked fresh and layered over cold milk. Grassy, creamy and bright.",
    cup: "/coffee/matcha.webp",
    bit: "/coffee/leaf.webp",
  },
  {
    id: "tea",
    name: "Iced Tea",
    title: ["Iced Tea", "& Sicilian Lemon"],
    ghost: "Black Tea Lemon",
    text: "Cold-steeped black tea with fresh lemon and a hint of mint. Crisp, clean and refreshing.",
    cup: "/coffee/tea.webp",
    bit: "/coffee/tea-lemon.webp",
  },
];

// Floating garnish: [left %, top %, size cqw, rotation deg, blur px, float delay s]
const bits: Array<[number, number, number, number, number, number]> = [
  [-1.5, 22, 7, -20, 1.5, 0],
  [33, 28, 2.6, 30, 0, 1.2],
  [52, 3, 3, 70, 1, 0.4],
  [67, 28, 3.4, -40, 0, 2],
  [93, 5, 6, 25, 2, 0.8],
  [16, 88, 5, 110, 3, 1.6],
  [97, 52, 4, -70, 2.5, 2.6],
];

export default function IcedMenu() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Last drink chosen by the scroll position. A thumbnail click is left alone
  // until scrolling moves on to a different step.
  const scrollIndex = useRef(0);

  const select = (index: number) => {
    setActive(current => {
      if (current !== index) setPrevious(current);
      return index;
    });
  };

  // Scroll drives the drink. On large screens the frame is pinned (CSS, see
  // .iced-pin) while the page scrolls through four steps. On small screens
  // nothing is pinned and the steps are spread over the frame's own journey
  // up the viewport.
  useEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const frame = frameRef.current;
    if (!pin || !sticky || !frame) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const travel = pin.offsetHeight - sticky.offsetHeight;
      let progress: number;
      if (travel > 40) {
        progress = -pin.getBoundingClientRect().top / travel;
      } else {
        const rect = frame.getBoundingClientRect();
        progress = (vh * 0.75 - rect.top) / Math.max(1, rect.height * 0.75);
      }
      const clamped = Math.min(0.9999, Math.max(0, progress));
      const index = Math.floor(clamped * drinks.length);
      if (index !== scrollIndex.current) {
        scrollIndex.current = index;
        select(index);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Thumbnails: when pinned, scroll to that drink's step so the page position
  // and the drink stay in sync; otherwise just switch.
  const pick = (index: number) => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    if (pin && sticky) {
      const travel = pin.offsetHeight - sticky.offsetHeight;
      if (travel > 40) {
        const top =
          pin.getBoundingClientRect().top +
          window.scrollY +
          (travel * (index + 0.5)) / drinks.length;
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        return;
      }
    }
    select(index);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const drink = drinks[active];

  return (
    <section
      className="iced-showcase"
      id="iced-drinks-example"
      aria-labelledby="iced-heading"
    >
      <div className="iced-pin" ref={pinRef}>
        <div className="iced-pin__sticky" ref={stickyRef}>
          <div className="iced-showcase__caption">
            <span>Example build / Iced drinks brand</span>
            <span>Scroll to change the drink</span>
          </div>

          <div
            className="iced-showcase__frame"
            ref={frameRef}
            data-drink={drink.id}
          >
            {/* Background glow, one layer per drink, cross-faded */}
            {drinks.map((item, index) => (
              <span
                key={item.id}
                className={`iced-glow iced-glow--${item.id}${index === active ? " is-active" : ""}`}
                aria-hidden="true"
              />
            ))}

            {/* Giant ghost words */}
            <div className="iced-ghost" aria-hidden="true">
              {drinks.map((item, index) => (
                <span
                  key={item.id}
                  className={
                    index === active
                      ? "is-active"
                      : index === previous
                        ? "is-leaving"
                        : undefined
                  }
                >
                  {item.ghost}
                </span>
              ))}
            </div>

            {/* Floating garnish, one set per drink */}
            {drinks.map((item, index) => (
              <div
                key={item.id}
                className={`iced-bits${index === active ? " is-active" : ""}`}
                aria-hidden="true"
              >
                {bits.map(([left, top, size, rotate, blur, delay], i) => (
                  <span
                    key={i}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${size}cqw`,
                      filter: blur ? `blur(${blur}px)` : undefined,
                      animationDelay: `-${delay}s`,
                      transitionDelay: `${i * 35}ms`,
                    }}
                  >
                    <img
                      src={item.bit}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ rotate: `${rotate}deg` }}
                    />
                  </span>
                ))}
              </div>
            ))}

            <div className="iced-nav" aria-hidden="true">
              <span className="iced-nav__brand">Givré</span>
              <span className="iced-nav__links">
                <span>Home</span>
                <span>Menu</span>
                <span>Shop</span>
                <span>Contact</span>
              </span>
            </div>

            <div className="iced-body">
              {/* key forces the copy to re-mount, which replays its entrance */}
              <div className="iced-copy" key={drink.id} aria-live="polite">
                <h2 id="iced-heading">
                  {drink.title[0]}
                  <br />
                  {drink.title[1]}
                </h2>
                <p>{drink.text}</p>
                <button
                  type="button"
                  className="iced-cta"
                  onClick={scrollToContact}
                >
                  Get a site like this <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className="iced-stage">
                {drinks.map((item, index) => (
                  <img
                    key={item.id}
                    className={
                      index === active
                        ? "is-active"
                        : index === previous
                          ? "is-leaving"
                          : undefined
                    }
                    src={item.cup}
                    alt={
                      index === active
                        ? `${item.name} in a clear takeaway cup`
                        : ""
                    }
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <div className="iced-side">
                <p className="iced-side__tagline">Brewed slow. Poured cold.</p>
                <p className="iced-side__text">
                  Small-batch ingredients over clear ice, made to order.
                </p>
                <div
                  className="iced-picker"
                  role="group"
                  aria-label="Choose a drink"
                >
                  {drinks.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={index === active}
                      aria-label={item.name}
                      onClick={() => pick(index)}
                    >
                      <img
                        src={item.cup}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
