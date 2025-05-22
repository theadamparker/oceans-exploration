// vite.config.multilang.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in an ES modules environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This configuration is used to generate language-specific builds
export default defineConfig({
  plugins: [vue()],
  base: '/', // Base URL for serving assets - use '/' for absolute URLs
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // English (default)
        es: path.resolve(__dirname, 'es/index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
});
