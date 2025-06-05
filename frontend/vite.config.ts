import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'frontend', // Vite starts from frontend
  publicDir: 'frontend/public', // Explicit public dir
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/public/index.html'), // Correct HTML entry point
    },
  },
  plugins: [react()],
});
