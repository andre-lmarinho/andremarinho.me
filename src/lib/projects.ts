import { readdirSync } from "node:fs";
import { join } from "node:path";
import { isPublished, readMarkdown } from "./content";

const DIR = join(process.cwd(), "content/projects");

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  link: string;
  featured: boolean;
};

function parse(slug: string): Project & { html: string } {
  const { meta, html } = readMarkdown(DIR, slug);
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    image: meta.image ?? "",
    link: meta.link ?? "",
    featured: meta.featured === "true",
    html,
  };
}

export function getProjects(): Project[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .filter((p) => isPublished(p.date))
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date),
    );
}

// The home page shows a curated pair, not the newest two.
export const getFeaturedProjects = () =>
  getProjects().filter((p) => p.featured);

export function getProject(slug: string) {
  try {
    const project = parse(slug);
    return isPublished(project.date) ? project : null;
  } catch {
    return null;
  }
}
