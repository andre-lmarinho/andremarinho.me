import { join } from "node:path";
import { readAllContent, readMarkdown } from "./content";

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
  kind: string;
  html: string;
};

function parse(slug: string): Project {
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
    kind: meta.kind ?? "",
    html,
  };
}

export const getProjects = () => readAllContent(DIR, parse);

export const getProject = (slug: string) =>
  getProjects().find((project) => project.slug === slug) ?? null;
