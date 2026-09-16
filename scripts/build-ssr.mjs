// Bundles src/entry-server.tsx into a plain Node ESM module at dist/server/entry-server.js
// using the project's real vite.config.ts (so path aliases like '@/' resolve the same
// way they do in the client build). Used only at build time by scripts/prerender.mjs.
import path from 'node:path';
import { build, loadConfigFromFile, mergeConfig } from 'vite';

const loaded = await loadConfigFromFile(
  { command: 'build', mode: 'production' },
  path.resolve('vite.config.ts'),
);

if (!loaded) {
  throw new Error('Could not load vite.config.ts for the SSR build');
}

await build(
  mergeConfig(loaded.config, {
    build: {
      ssr: path.resolve('src/entry-server.tsx'),
      outDir: 'dist/server',
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        output: {
          format: 'es',
          entryFileNames: 'entry-server.js',
        },
      },
    },
  }),
);

console.log('Built SSR entry: dist/server/entry-server.js');
