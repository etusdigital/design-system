/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'fs';
import typescript2 from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const copyTailwindConfig = () => ({
  name: 'copy-tailwind-config',
  writeBundle() {
    try {
      copyFileSync('tailwind.config.cjs', 'lib/tailwind.config.cjs');
    } catch (error) {
      console.warn('Could not copy tailwind.config.cjs:', error);
    }
  }
});

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => {
            return tag == 'ion-icon';
          },
        },
      },
    }), 
    tailwindcss(),
    copyTailwindConfig(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
    typescript2({
      check: false,
      include: ['src/**/*.ts'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'lib',
          skipLibCheck: true,
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      '#composables': path.resolve(dirname, './src/composables'),
      'vue': 'vue/dist/vue.esm-bundler.js',
      '#': path.resolve(dirname, './src')
    },
  },
  build: {
    outDir: 'lib',
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `design-system.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'index.css';
          return assetInfo.name || 'assets/[name]-[hash][extname]';
        },
      },
      plugins: [
        nodeResolve({
          extensions: ['.ts', '.vue'],
        }),
      ],
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});