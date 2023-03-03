import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { VitePWA } from 'vite-plugin-pwa';

export default {
  server: {
    port: 3000,
    cors: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        file: 'dist/bundle.js',
      },
    },
  },
  publicDir: 'public',
  plugins: [
    wasm(),
    topLevelAwait(),
    VitePWA({
      // injectRegister: 'inline',
      // registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
};
