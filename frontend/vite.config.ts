import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'frontend', // ✅ actual app location
  publicDir: 'public',
  build: {
    outDir: '../dist', // ✅ write to root-level dist for Render
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
});
