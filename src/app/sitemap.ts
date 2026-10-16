import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/posts` },
    { url: `${siteUrl}/projects` },
    ...getPosts().map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
    })),
    ...getProjects().map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
    })),
  ];
}
