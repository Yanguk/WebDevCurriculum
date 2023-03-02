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
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      }
    }),
  ],
  // rollupOptions: {
  //   output: {
  //     manualChunks: false,
  //     inlineDynamicImports: true,
  //     entryFileNames: '[name].js', // currently does not work for the legacy bundle
  //     assetFileNames: '[name].[ext]', // currently does not work for images
  //   },
  // },
};
