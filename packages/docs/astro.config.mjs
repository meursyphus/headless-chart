import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// Add your Tailwind CSS file as a global style
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte(), tailwind()],
  style: {
    global: ["./src/styles/global.css"],
  },
});
