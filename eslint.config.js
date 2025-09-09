import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfig([
   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
   
    js.configs.recommended,

    ...pluginVue.configs['flat/essential'],

    {
        files: ['**/*.{js,mjs,jsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },

    {
        files: ['**/*.vue'],
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },

    skipFormatting,
]);
