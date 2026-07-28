import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://andremarinho.me";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPosts().map((post) => ({
      url: `${base}/posts/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...getProjects().map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.date || Date.now()),
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}
