export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ this is required for routing to work on Render
  envPrefix: ['VITE_'],
});
