import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: "src/index.ts",
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
