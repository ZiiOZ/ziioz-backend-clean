import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [
    react(),
    VitePluginRewriteAll(), // ✅ force client-side routing fallback
  ],
  publicDir: 'public',
});
