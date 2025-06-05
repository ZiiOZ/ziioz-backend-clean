// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'frontend',
  publicDir: 'frontend/public',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
});
