import type { Post } from "./posts";
import type { Project } from "./projects";

export const siteUrl = "https://andremarinho.me";
export const siteName = "André Marinho";
export const jobTitle = "Frontend Engineer";

export const siteDescription =
  "Frontend engineer in Brazil building responsive, accessible web products with React, Next.js, and TypeScript, from interface architecture to production.";

const author = {
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle,
  description: siteDescription,
};

// Article schema is what search and AI answer engines read to attribute a post
// to an author and a date. Undated posts are drafts, so datePublished is dropped
// rather than faked.
export const postJsonLd = (post: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  url: `${siteUrl}/posts/${post.slug}`,
  mainEntityOfPage: `${siteUrl}/posts/${post.slug}`,
  keywords: post.tags,
  // The per-post OG card is the only image a text post has; naming it here is
  // what lets an answer engine show something next to the citation.
  image: `${siteUrl}/posts/${post.slug}/opengraph-image`,
  inLanguage: "en",
  timeRequired: `PT${post.minutes}M`,
  ...(post.date && { datePublished: post.date, dateModified: post.date }),
  author,
  publisher: author,
});

// Projects are software, so SoftwareSourceCode carries more than a generic
// CreativeWork: it lets the tag list stand in for the languages used.
export const projectJsonLd = (project: Project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: project.title,
  description: project.description,
  url: `${siteUrl}/projects/${project.slug}`,
  image: project.image ? `${siteUrl}${project.image}` : undefined,
  programmingLanguage: project.tags,
  inLanguage: "en",
  ...(project.date && { datePublished: project.date }),
  ...(project.link && { sameAs: project.link }),
  author,
});

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    ...author,
    image: `${siteUrl}/images/me/andre-marinho.webp`,
    sameAs: [
      "https://github.com/andre-lmarinho",
      "https://linkedin.com/in/andre-lmarinho",
      "https://www.instagram.com/andre.lmarinho/",
    ],
  },
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
