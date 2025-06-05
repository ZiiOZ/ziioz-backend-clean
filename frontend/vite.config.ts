// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',                // frontend root is fine
  publicDir: 'public',      // where index.html + static assets live
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html' // 🔑 Entry point for Vite/Render
    }
  }
});
