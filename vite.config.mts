/* eslint-disable sort-keys-plus/sort-keys */
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'spa-tools': ['@spa-tools/api-client', '@spa-tools/interaction-hooks'],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      root: resolve(__dirname, 'src'),
    },
  },
});
