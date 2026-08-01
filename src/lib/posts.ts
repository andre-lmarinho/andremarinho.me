import { join } from "node:path";
import { readAllContent, readMarkdown } from "./content";

const DIR = join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
  minutes: number;
};

function readingTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

function parse(slug: string): Post {
  const { meta, html } = readMarkdown(DIR, slug);
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    html,
    minutes: readingTime(html),
  };
}

export const getPosts = () => readAllContent(DIR, parse);

export const getPost = (slug: string) =>
  getPosts().find((post) => post.slug === slug) ?? null;
