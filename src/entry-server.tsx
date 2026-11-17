// Build-time only. Renders each page (header, content, footer) to a static
// HTML string so crawlers and non-JS clients get real markup and real links
// instead of an empty <div id="root">. The client still renders over this with
// createRoot().render(), so there is no hydration-mismatch risk.
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { notFoundRoute, routes } from './routes';

export { routes, notFoundRoute };

export function renderPath(path: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}
