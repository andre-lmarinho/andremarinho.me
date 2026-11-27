import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { isPublished } from "./content";

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: { src: ImageMetadata; alt: string };
  link: string;
  body: string;
};

const covers = import.meta.glob<ImageMetadata>(
  "/src/content/projects/*/cover.webp",
  { eager: true, import: "default" },
);

function toProject({ id, data, body }: CollectionEntry<"projects">): Project {
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: data.date ?? "",
    tags: data.tags,
    image: {
      src: covers[`/src/content/projects/${id}/cover.webp`],
      alt: data.alt,
    },
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
