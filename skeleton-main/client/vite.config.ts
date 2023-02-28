import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
    ],
  },
  publicDir: 'public',
  plugins: [wasm(), topLevelAwait()]
};
