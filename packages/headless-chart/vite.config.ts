import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [tsconfigPaths(), dts()],
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
