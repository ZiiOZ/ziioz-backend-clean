import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Ensure _redirects gets copied to dist
const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      const src = resolve(__dirname, 'public/_redirects');
      const dest = resolve(__dirname, 'dist/_redirects');
      fs.copyFileSync(src, dest);
    },
  };
};

export default defineConfig({
  plugins: [copyRedirects()],
})
