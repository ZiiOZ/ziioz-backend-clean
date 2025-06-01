import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  base: '/', // ✅ Required for Render and production
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  envPrefix: ['VITE_'],
});
