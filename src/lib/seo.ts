import type { Post } from "./posts";
import type { Project } from "./projects";

const siteUrl = "https://andremarinho.me";

const author = {
  "@type": "Person",
  name: "André Marinho",
  url: siteUrl,
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
  ...(post.date && { datePublished: post.date }),
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
  ...(project.date && { dateCreated: project.date }),
  ...(project.link && { sameAs: project.link }),
  author,
});

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "André Marinho",
    url: siteUrl,
    image: `${siteUrl}/images/me/andre-marinho.webp`,
    jobTitle: "Front-End Developer",
    sameAs: [
      "https://github.com/andre-lmarinho",
      "https://linkedin.com/in/andre-lmarinho",
      "https://www.instagram.com/andre.lmarinho/",
    ],
  },
};
