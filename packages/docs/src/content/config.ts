import { z, defineCollection } from "astro:content";
const charts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const showcases = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    key: z.string(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { charts, showcases };
