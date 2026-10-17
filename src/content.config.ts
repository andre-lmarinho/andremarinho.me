import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const date = z
  .union([z.string(), z.date()])
  .optional()
  .transform((value) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value,
  );

const tags = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) =>
    typeof value === "string"
      ? value.split(",").map((tag) => tag.trim())
      : (value ?? []),
  );

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string(),
    date,
    tags,
    project: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string(),
    date,
    tags,
    image: z.string().optional(),
    link: z.string().optional(),
    featured: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((value) => value === true || value === "true"),
    kind: z.string().optional(),
  }),
});

export const collections = { posts, projects };
