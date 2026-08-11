import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/seo";

// Stamping every page with the build time tells crawlers the whole site changed
// on each deploy, which is a signal they learn to discount. Index pages inherit
// the newest date of what they list; /about has no dated source, so it ships
// without a lastModified rather than a made-up one.
const newest = (dates: readonly string[]) => {
  const times = dates.filter(Boolean).map((date) => new Date(date).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const projects = getProjects();

  const postsUpdated = newest(posts.map((post) => post.date));
  const projectsUpdated = newest(projects.map((project) => project.date));
  const siteUpdated = newest([
    ...posts.map((post) => post.date),
    ...projects.map((project) => project.date),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: postsUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: projectsUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.date ? new Date(project.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}
