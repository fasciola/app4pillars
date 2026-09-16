import devServer from "@hono/vite-dev-server";
import path from "path";
const __dirname = import.meta.dirname;
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { inspectAttr } from 'kimi-plugin-inspect-react';
import { existsSync, createReadStream } from "node:fs";

// Vite's dev server serves exact file matches from public/ but does not do
// directory-index resolution (public/services/index.html is served at
// /services/index.html, but NOT at /services/ or /services) — any request
// without a literal file match falls through to the SPA index.html instead.
// `vite preview` and real static hosts (GitHub Pages, Cloudflare) handle this
// correctly on their own; this plugin only closes the gap in `npm run dev` so
// local testing of /services/ and /website-design-dubai/ isn't misleading.
function servePublicDirectoryIndex(): Plugin {
    return {
        name: "serve-public-directory-index",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const url = req.url?.split("?")[0] ?? "";
                if (req.method !== "GET" && req.method !== "HEAD") return next();
                if (!url.endsWith("/") || url === "/") return next();

                const candidate = path.join(__dirname, "public", url, "index.html");
                if (existsSync(candidate)) {
                    res.setHeader("Content-Type", "text/html");
                    createReadStream(candidate).pipe(res);
                    return;
                }
                next();
            });
        },
    };
}

export default defineConfig(({ command }) => ({
    // ✅ Use root path since site is at https://4pillarsweb.online
    base: '/',

    plugins: [
        devServer({
            entry: "api/boot.ts",
            exclude: [/^\/(?!api\/).*$/]
        }),
        // Dev-only: injects data-code-path attributes used by the editor's
        // click-to-source inspector. Must not ship to production — it has no
        // purpose for visitors or crawlers and was bloating every prerendered
        // page with hundreds of extra attributes.
        ...(command === 'serve' ? [inspectAttr(), servePublicDirectoryIndex()] : []),
        react()
    ],

    server: {
        port: 3000,
        host: "localhost",
        strictPort: true,
        hmr: {
            host: "localhost",
            port: 3000,
        },
    },

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@contracts": path.resolve(__dirname, "./contracts"),
            "@db": path.resolve(__dirname, "./db"),
            "db": path.resolve(__dirname, "./db"),
        },
    },

    envDir: path.resolve(__dirname),

    build: {
        outDir: path.resolve(__dirname, "dist/public"),
        emptyOutDir: true,
        // ✅ Ensure assets use relative paths for static hosting
        assetsDir: "assets",
    },
}));