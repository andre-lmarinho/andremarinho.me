import { type CollectionEntry, getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import { isPublished } from "./content";
import { imageFor } from "./images";

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: ImageMetadata;
  link: string;
  featured: boolean;
  kind: string;
  body: string;
};

function toProject({ id, data, body }: CollectionEntry<"projects">): Project {
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: data.date ?? "",
    tags: data.tags,
    image: data.image ? imageFor(data.image) : undefined,
    link: data.link ?? "",
    featured: data.featured ?? false,
    kind: data.kind ?? "",
    body: body ?? "",
  };
}

export async function getProjects() {
  const entries = await getCollection("projects");
  return entries
    .map(toProject)
    .filter((project) => isPublished(project.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getProject(slug: string) {
  const [entry] = await getCollection("projects", ({ id }) => id === slug);
  if (!entry) return null;
  const project = toProject(entry);
  return isPublished(project.date) ? project : null;
}
