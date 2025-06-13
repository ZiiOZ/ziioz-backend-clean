import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist'
    // 🔥 No rollupOptions, no input — Vite auto-detects public/index.html
  }
})
