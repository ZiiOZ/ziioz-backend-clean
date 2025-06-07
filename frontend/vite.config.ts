import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // project root
  publicDir: 'public', // correct public path
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html' // 🛠️ This is the fix!
    }
  }
})
