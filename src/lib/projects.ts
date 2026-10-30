import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { isPublished } from "./content";

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  images: { src: ImageMetadata; alt: string; caption?: string }[];
  link: string;
  body: string;
};

const images = import.meta.glob<ImageMetadata>(
  "/src/content/projects/*/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, import: "default" },
);

function toProject({ id, data, body }: CollectionEntry<"projects">): Project {
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: data.date ?? "",
    tags: data.tags,
    images: Object.entries(images)
      .filter(([path]) => path.startsWith(`/src/content/projects/${id}/`))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, src]) => {
        const { alt, caption } =
          data.images[path.slice(path.lastIndexOf("/") + 1)];
        return { src, alt, caption };
      }),
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
