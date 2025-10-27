/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { copyFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

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

const generateMainDts = () => ({
  name: 'generate-main-dts',
  writeBundle() {
    try {
      const mainDtsContent = `
        export * from './index'
        import DesignSystem from './index'
        export default DesignSystem
      `;
      writeFileSync(resolve('lib/main.d.ts'), mainDtsContent);
    } catch (error) {
      console.warn('Could not generate main.d.ts:', error);
    }
  }
});

// https://vite.dev/config/
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
    generateMainDts(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      outDir: 'lib',
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts', 'vite.config.ts'],
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
      '@': path.resolve(__dirname, './src'),
      '#composables': path.resolve(__dirname, './src/composables'),
      'vue': 'vue/dist/vue.esm-bundler.js',
      '#': path.resolve(__dirname, './src')
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
        configDir: path.join(__dirname, '.storybook')
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