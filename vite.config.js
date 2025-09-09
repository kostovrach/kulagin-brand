import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(rootDir, 'src/assets/icons')],
            symbolId: 'icon-[name]',
            inject: 'body-last',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});