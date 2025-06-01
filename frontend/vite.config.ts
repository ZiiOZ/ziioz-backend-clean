import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ important for Render
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  envPrefix: ['VITE_'],
});
