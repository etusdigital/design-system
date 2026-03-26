/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { copyFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

function buildComponentEntries(): Record<string, string> {
  const entries: Record<string, string> = {};
  const componentsDir = resolve(__dirname, 'src/components');
  if (existsSync(componentsDir)) {
    readdirSync(componentsDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && existsSync(resolve(componentsDir, d.name, 'index.ts')))
      .forEach(d => {
        entries[`components/${d.name}/index`] = resolve(componentsDir, d.name, 'index.ts');
      });
  }
  return entries;
}

function buildHookEntries(): Record<string, string> {
  const entries: Record<string, string> = {};
  const hooksDir = resolve(__dirname, 'src/hooks');
  if (existsSync(hooksDir)) {
    readdirSync(hooksDir)
      .filter(f => f.endsWith('.ts') && !f.includes('.test.') && f !== 'index.ts')
      .forEach(f => {
        entries[`hooks/${f.replace('.ts', '')}`] = resolve(hooksDir, f);
      });
  }
  return entries;
}

function buildProviderEntries(): Record<string, string> {
  const entries: Record<string, string> = {};
  const providersDir = resolve(__dirname, 'src/providers');
  if (existsSync(providersDir)) {
    readdirSync(providersDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && existsSync(resolve(providersDir, d.name, 'index.ts')))
      .forEach(d => {
        entries[`providers/${d.name}/index`] = resolve(providersDir, d.name, 'index.ts');
      });
    if (existsSync(resolve(providersDir, 'index.ts'))) {
      entries['providers/index'] = resolve(providersDir, 'index.ts');
    }
  }
  return entries;
}

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
      const mainDtsContent = [
        "export * from './components';",
        "export { useControllable } from './hooks/useControllable';",
        "export type { UseControllableOptions } from './hooks/useControllable';",
        "export { useTransition } from './hooks/useTransition';",
        "export type { UseTransitionOptions } from './hooks/useTransition';",
        "export { DesignSystemProvider } from './providers';",
        "export { ConfirmProvider, useConfirm } from './components/Confirm';",
        "export { ToastProvider, useToast } from './components/Toast';",
        "",
      ].join('\n');
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
    react(),
    tailwindcss(),
    copyTailwindConfig(),
    generateMainDts(),
    dts({
      tsconfigPath: './tsconfig.dts.json',
      outDir: 'lib',
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx', 'vite.config.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#composables': path.resolve(__dirname, './src/hooks'),
      '#': path.resolve(__dirname, './src')
    },
  },
  build: {
    outDir: 'lib',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.ts'),
        ...buildComponentEntries(),
        ...buildHookEntries(),
        ...buildProviderEntries(),
      },
      preserveEntrySignatures: 'exports-only',
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          exports: 'named',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'main') return 'design-system.es.js';
            return '[name].es.js';
          },
          globals: { react: 'React', 'react-dom': 'ReactDOM' },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'main.css') return 'index.css';
            return assetInfo.name || 'assets/[name]-[hash][extname]';
          },
        },
        {
          format: 'cjs',
          exports: 'named',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'main') return 'design-system.cjs.js';
            return '[name].cjs.js';
          },
          globals: { react: 'React', 'react-dom': 'ReactDOM' },
        },
      ],
      plugins: [
        nodeResolve({
          extensions: ['.ts', '.tsx'],
        }),
      ],
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, '.storybook')
          })
        ],
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
      },
      {
        // Unit test project with jsdom + React Testing Library
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
          setupFiles: ['./vitest.setup.ts'],
        }
      }
    ]
  }
});
