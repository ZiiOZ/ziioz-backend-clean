import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'frontend',
  publicDir: 'frontend/public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'frontend/public/index.html', // 🔥 Explicit entry path
    },
  },
  plugins: [react()],
})
