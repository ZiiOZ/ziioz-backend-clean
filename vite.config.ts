import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

viteStaticCopy({
  targets: [
    { src: 'public/_redirects', dest: '.' }, // <- this ensures it's in /dist
  ]
})


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
