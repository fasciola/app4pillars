import PageHero from '../../components/PageHero';
import SkinRitual from '../../sections/SkinRitual';
import FreshBowl from '../../sections/FreshBowl';
import IcedMenu from '../../sections/IcedMenu';
import BettaGlass from '../../sections/BettaGlass';
import FashionDepth from '../../sections/FashionDepth';
import TechColors from '../../sections/TechColors';
import { showcaseItems } from '../../content/site';

/** Showcase: the interactive concept builds, each on the same dark stage. */
export default function ShowcasePage() {
  return (
    <>
      <PageHero
        eyebrow="Showcase / Concept builds"
        title={
          <>
            Motion, <span className="text-white/45">made to scroll</span>
          </>
        }
        intro="Concept sections we design to show what a page can do. Product cut-outs that assemble, a fashion depth carousel, a colour-changing product hero, scenes that change as you scroll and a real-time 3D fish. Every one is built with real text, so it stays fast and readable by search engines."
        aside={
          <nav aria-label="Builds on this page">
            <ol className="grid gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              {showcaseItems.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="flex gap-3 hover:text-white">
                    <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />
      <div className="pt-16 sm:pt-20">
        <SkinRitual />
        <FashionDepth />
        <FreshBowl />
        <TechColors />
        <IcedMenu />
        <BettaGlass />
      </div>
    </>
  );
}
