import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // project root
  base: '/', // required for Render
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './public/index.html', // this is the key line
    },
  },
});
