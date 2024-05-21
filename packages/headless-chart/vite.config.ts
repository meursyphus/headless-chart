import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "$lib/*": "src/lib/*",
    },
  },
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "@meursyphus/headless-chart",
      fileName: (format) => `headless-chart.${format}.js`,
    },
    rollupOptions: {
      external: ["@meursyphus/flitter"],
      output: {
        globals: {},
      },
    },
  },
});
