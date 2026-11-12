import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const md = (dir: string) =>
  glob({ pattern: "**/*.md", base: `./src/content/${dir}` });

const awards = defineCollection({
  loader: md("awards"),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    date: z.coerce.date(),
  }),
});

const talks = defineCollection({
  loader: md("talks"),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    slides: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: md("projects"),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

const posts = defineCollection({
  loader: md("posts"),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const media = defineCollection({
  loader: md("media"),
  schema: z.object({
    title: z.string(),
    type: z.enum([
      "book",
      "anime",
      "manga",
      "show",
      "movie",
      "game",
      "podcast",
    ]),
    rating: z.number().min(0).max(10),
    date: z.coerce.date(),
    note: z.string().optional(),
  }),
});

export const collections = { awards, talks, projects, posts, media };
