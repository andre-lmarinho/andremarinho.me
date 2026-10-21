import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { isPublished } from "./content";

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: ImageMetadata;
  link: string;
  body: string;
};

const images = import.meta.glob<ImageMetadata>(
  "/src/assets/images/projects/*.webp",
  { eager: true, import: "default" },
);

function imageFor(slug: string) {
  return images[`/src/assets/images/projects/${slug}.webp`];
}

function toProject({ id, data, body }: CollectionEntry<"projects">): Project {
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: data.date ?? "",
    tags: data.tags,
    image: imageFor(id),
    link: data.link ?? "",
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
  const entry = await getEntry("projects", slug);
  if (!entry) return null;
  const project = toProject(entry);
  return isPublished(project.date) ? project : null;
}
