// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',                // root stays at frontend/
  publicDir: 'public',      // use public folder
  build: {
    outDir: 'dist',         // default output
    rollupOptions: {
      input: 'public/index.html',  // 🔥 this is crucial
    }
  }
});
