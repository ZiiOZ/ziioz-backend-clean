import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './frontend',
  publicDir: './frontend/public', // 👈 this tells Vite where your index.html and assets are
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [react()],
})
