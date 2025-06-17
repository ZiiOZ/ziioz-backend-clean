import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


export default defineConfig({
  esbuild: {
  jsxInject: `import React from 'react'`
}
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
});
