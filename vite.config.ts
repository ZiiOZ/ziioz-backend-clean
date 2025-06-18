import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    base: "/",
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', // ⬅️ Must be exact path
          dest: '.'                // ⬅️ So it goes into dist/
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
