import type { Post } from "./posts";
import type { Project } from "./projects";
import { socials } from "./site";

export const siteUrl = "https://andremarinho.me";
export const siteName = "André Marinho";
export const jobTitle = "Software Engineer";

export const siteDescription =
  "Software engineer in Salvador, Brazil. Full-stack web products with TypeScript, React, Next.js, Node.js and PostgreSQL.";

const author = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteName,
  url: `${siteUrl}/about`,
  jobTitle,
  description: siteDescription,
  image: `${siteUrl}/images/me/andre-marinho.webp`,
  sameAs: socials.map(({ href }) => href),
};

export const postJsonLd = (post: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  url: `${siteUrl}/posts/${post.slug}`,
  mainEntityOfPage: `${siteUrl}/posts/${post.slug}`,
  keywords: post.tags,
  image: `${siteUrl}/posts/${post.slug}/opengraph-image`,
  inLanguage: "en",
  timeRequired: `PT${post.minutes}M`,
  ...(post.date && { datePublished: post.date, dateModified: post.date }),
  author,
  publisher: author,
});

export const projectJsonLd = (project: Project) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: project.title,
  description: project.description,
  url: `${siteUrl}/projects/${project.slug}`,
  mainEntityOfPage: `${siteUrl}/projects/${project.slug}`,
  image: project.image ? `${siteUrl}${project.image}` : undefined,
  keywords: project.tags,
  inLanguage: "en",
  ...(project.date && { datePublished: project.date }),
  author,
  publisher: author,
});

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteUrl}/about`,
  mainEntity: author,
};

// Names the site as an entity in its own right, so the person and the domain
// resolve to one thing rather than two unrelated results.
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en",
  author,
  publisher: author,
};

// Breadcrumbs give search a labelled path for nested pages instead of letting
// it infer one from the URL.
export const breadcrumbJsonLd = (
  trail: readonly { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map(({ name, path }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: `${siteUrl}${path}`,
  })),
});
