/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'node:path';

// Separate UMD build config — single entry required for UMD format
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#composables': path.resolve(__dirname, './src/hooks'),
      '#': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'lib',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['umd'],
      fileName: () => 'design-system.umd.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
      plugins: [
        nodeResolve({ extensions: ['.ts', '.tsx'] }),
      ],
    },
  },
});
