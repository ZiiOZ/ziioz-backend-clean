import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './frontend', // this tells Vite where to start
  build: {
    outDir: '../dist', // moves output back to root
    emptyOutDir: true,
  },
  plugins: [react()],
});
