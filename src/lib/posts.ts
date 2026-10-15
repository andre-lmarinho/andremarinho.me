import { join } from "node:path";
import { readAllContent, readMarkdown } from "./content";

const DIR = join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  project?: string;
  body: string;
  minutes: number;
};

function readingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

function parse(slug: string): Post {
  const { meta, body } = readMarkdown(DIR, slug);
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    project: meta.project || undefined,
    body,
    minutes: readingTime(body),
  };
}

export const getPosts = () => readAllContent(DIR, parse);

export const getPost = (slug: string) =>
  getPosts().find((post) => post.slug === slug) ?? null;
