import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'frontend', // ✅ matches the folder containing index.html
  publicDir: 'frontend/public',
  build: {
    outDir: '../dist', // ✅ places final build one level up, outside /frontend
    emptyOutDir: true,
  },
  plugins: [react()],
});
