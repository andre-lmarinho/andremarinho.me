import { join } from "node:path";
import { isPublished, readAllContent, readMarkdown } from "./content";

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

const featuredFirst = (a: Project, b: Project) =>
  Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date);

export const getProjects = () => readAllContent(DIR, parse, featuredFirst);

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
