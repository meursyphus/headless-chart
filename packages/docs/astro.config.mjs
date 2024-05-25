import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// Add your Tailwind CSS file as a global style
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte(), tailwind(), mdx()],
  style: {
    global: ["./src/styles/global.css"],
  },
  vite: {
    ssr: {
      noExternal: ["@meursyphus/flitter-svelte"],
    },
  },
});
