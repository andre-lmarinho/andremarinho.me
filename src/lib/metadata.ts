import { getPost } from "./posts";
import { getProject } from "./projects";
import { jobTitle, siteDescription, siteName, siteUrl } from "./seo";

type SocialImage = {
  url: string;
  type?: string;
  width: number;
  height: number;
  alt: string;
};

export type PageMetadata = {
  title: string;
  description: string;
  canonical: string;
  markdown?: string;
  authors?: { name: string; url: string }[];
  openGraph: {
    title: string;
    description: string;
    type: "website" | "profile" | "article";
    url: string;
    image: SocialImage;
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  noindex?: boolean;
};

function pageMetadata(
  title: string,
  description: string,
  path: string,
  imageAlt: string,
  type: "website" | "profile" = "website",
): PageMetadata {
  return {
    title,
    description,
    canonical: path,
    openGraph: {
      title,
      description,
      type,
      url: path,
      image: {
        url: `${path === "/" ? "" : path}/opengraph-image`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: imageAlt,
      },
    },
  };
}

export const homeMetadata = pageMetadata(
  `${siteName} - ${jobTitle}`,
  siteDescription,
  "/",
  `${siteName} - ${jobTitle}`,
);
export const aboutMetadata = pageMetadata(
  `About - ${siteName}`,
  "About André Marinho, a software engineer building full-stack web products with TypeScript, React and Node.js. Open to remote roles with international teams.",
  "/about",
  "About André Marinho",
  "profile",
);
export const postsMetadata = pageMetadata(
  `Posts - ${siteName}`,
  "Notes on software I build, bugs I investigate, and decisions I would make differently.",
  "/posts",
  "Posts by André Marinho",
);
export const projectsMetadata = pageMetadata(
  `Projects - ${siteName}`,
  "Work and open-source projects, with the problems they solve, my role, and the decisions behind them.",
  "/projects",
  "Projects by André Marinho",
);

export function getPostMetadata(slug: string): PageMetadata | undefined {
  const post = getPost(slug);
  if (!post) return;
  return {
    title: `${post.title} - ${siteName}`,
    description: post.description,
    canonical: `/posts/${slug}`,
    markdown: `/posts/${slug}/index.md`,
    authors: [{ name: siteName, url: `${siteUrl}/about` }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date || undefined,
      authors: [`${siteUrl}/about`],
      tags: post.tags,
      url: `/posts/${slug}`,
      image: {
        url: `/posts/${slug}/opengraph-image`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Writing by André Marinho",
      },
    },
  };
}

export function getProjectMetadata(slug: string): PageMetadata | undefined {
  const project = getProject(slug);
  if (!project) return;
  return {
    title: `${project.title} - ${siteName}`,
    description: project.description,
    canonical: `/projects/${slug}`,
    markdown: `/projects/${slug}/index.md`,
    authors: [{ name: siteName, url: `${siteUrl}/about` }],
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      publishedTime: project.date || undefined,
      authors: [`${siteUrl}/about`],
      tags: project.tags,
      url: `/projects/${slug}`,
      image: project.image
        ? {
            url: project.image,
            width: 1600,
            height: 900,
            alt: `${project.title} interface`,
          }
        : projectsMetadata.openGraph.image,
    },
  };
}

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
