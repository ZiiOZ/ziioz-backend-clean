import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',
  publicDir: 'public', // ✅ THIS is essential
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react()],
});
