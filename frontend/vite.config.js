import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import legacy from '@vitejs/plugin-legacy';
import { terser } from 'rollup-plugin-terser';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import cssnano from 'cssnano';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

const postcssConfig = {
    plugins: [
        cssnano({
            preset: 'default',
        }),
    ],
};

export default defineConfig({
    css: {
        postcss: postcssConfig,
    },
    build: {
        target: 'es2015',
        minify: false,
        rollupOptions: {
            plugins: [
                terser({
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                    format: {
                        comments: false,
                    },
                    safari10: true,
                }),
            ],
        },
    },
    plugins: [
        vue(),
        vueDevTools(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(rootDir, 'src/assets/icons')],
            symbolId: 'icon-[name]',
            inject: 'body-last',
        }),

        legacy({
            targets: ['defaults', 'not IE 11'],
        }),

        ViteImageOptimizer({
            jpg: { quality: 85 },
            png: { quality: 85 },
            gif: { optimizationLevel: 3 },
        }),

        viteImagemin({
            gifsicle: { optimizationLevel: 3 },
            optipng: { optimizationLevel: 5 },
            mozjpeg: { quality: 85 },
            svgo: true,
        }),

        viteCompression({ algorithm: 'gzip' }),
        viteCompression({ algorithm: 'brotliCompress' }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8055',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //         },
    //     },
    // },
});
