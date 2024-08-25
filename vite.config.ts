import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [tsconfigPaths()],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    // Uncomment this if you're running on a local network for testing:
    host: true,
  },
});

