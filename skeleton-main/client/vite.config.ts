import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { VitePWA } from 'vite-plugin-pwa';

export default {
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  plugins: [
    wasm(),
    topLevelAwait(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
    }),
  ],
};
