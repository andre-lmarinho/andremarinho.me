import { type CollectionEntry, getCollection } from "astro:content";
import { isPublished } from "./content";

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

function toPost({ id, data, body }: CollectionEntry<"posts">): Post {
  const content = body ?? "";
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: data.date ?? "",
    tags: data.tags,
    project: data.project,
    body: content,
    minutes: readingTime(content),
  };
}

export async function getPosts() {
  const entries = await getCollection("posts");
  return entries
    .map(toPost)
    .filter((post) => isPublished(post.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const [entry] = await getCollection("posts", ({ id }) => id === slug);
  if (!entry) return null;
  const post = toPost(entry);
  return isPublished(post.date) ? post : null;
}
