import { readdirSync } from "node:fs";
import { join } from "node:path";
import { isPublished, readMarkdown } from "./content";

const DIR = join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

function parse(slug: string): Post & { html: string } {
  const { meta, html } = readMarkdown(DIR, slug);
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    html,
  };
}

export function getPosts(): Post[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .filter((p) => isPublished(p.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  try {
    const post = parse(slug);
    return isPublished(post.date) ? post : null;
  } catch {
    return null;
  }
}
