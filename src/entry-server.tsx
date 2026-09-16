// Build-time only. Renders the real page content to a static HTML string so
// crawlers and other non-JS clients get actual markup instead of an empty
// <div id="root">. The client bundle still hydrates over this on mount via
// createRoot().render() (not hydrateRoot()), so there is no hydration-mismatch
// risk — the browser render simply replaces this markup once React loads.
import { renderToStaticMarkup } from 'react-dom/server';
import Hero from './sections/Hero';
import Services from './sections/Services';
import PracticeCube from './sections/PracticeCube';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import WebsiteDesignDubai from './pages/WebsiteDesignDubai';

export function renderHome(): string {
  return renderToStaticMarkup(
    <>
      <Hero onExplore={() => {}} onServices={() => {}} />
      <Services />
      <PracticeCube />
      <Portfolio />
      <Contact />
    </>,
  );
}

export function renderWebsiteDesignDubai(): string {
  return renderToStaticMarkup(<WebsiteDesignDubai />);
}
