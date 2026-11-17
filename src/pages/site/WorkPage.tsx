import PageHero from '../../components/PageHero';
import Portfolio from '../../sections/Portfolio';
import { portfolioConfig, projects } from '../../config';

/** Work: the full portfolio of live client projects. */
export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work / Selected projects"
        title={
          <>
            Selected <span className="text-white/45">work</span>
          </>
        }
        intro={portfolioConfig.subtitle}
        aside={
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            {String(projects.length).padStart(2, '0')} live projects
            <br />
            Each opens the live website
          </p>
        }
      />
      <Portfolio showHeader={false} />
    </>
  );
}
