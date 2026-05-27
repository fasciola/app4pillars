import devServer from "@hono/vite-dev-server";
import path from "path";
const __dirname = import.meta.dirname;
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from 'kimi-plugin-inspect-react';

export default defineConfig({
    // ✅ Use root path since site is at https://4pillarsweb.online
    base: '/',

    plugins: [
        devServer({
            entry: "api/boot.ts",
            exclude: [/^\/(?!api\/).*$/]
        }),
        inspectAttr(),
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
});