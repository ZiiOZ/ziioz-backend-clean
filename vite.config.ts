import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        const src = path.resolve(__dirname, 'public/_redirects');
        const dest = path.resolve(__dirname, 'dist/_redirects');
        fs.copyFileSync(src, dest);
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})
