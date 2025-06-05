// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'frontend',
  publicDir: 'frontend/public',  // This is correct
  build: {
    outDir: '../dist',           // Output in root-level dist
    emptyOutDir: true,
  },
  plugins: [react()],
});
