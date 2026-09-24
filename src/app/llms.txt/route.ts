import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

// llms.txt is the plain-text map answer engines read when they would otherwise
// scrape the rendered pages. Generated from the same content the site renders,
// so it cannot drift the way a hand-kept file in public/ would.
export const dynamic = "force-static";

const list = (
  items: readonly { title: string; description: string; url: string }[],
) =>
  items
    .map((item) => `- [${item.title}](${item.url}): ${item.description}`)
    .join("\n");

export function GET() {
  const posts = getPosts();
  const projects = getProjects();

  const body = `# ${siteName}

> ${siteDescription}

This personal site is written and maintained by ${siteName}. Project pages describe his responsibilities and technical decisions; posts cover his experience building software.

## Writing

${list(
  posts.map((post) => ({
    title: post.title,
    description: post.description,
    url: `${siteUrl}/posts/${post.slug}`,
  })),
)}

## Projects

${list(
  projects.map((project) => ({
    title: project.title,
    description: project.description,
    url: `${siteUrl}/projects/${project.slug}`,
  })),
)}

## About

- [About](${siteUrl}/about): How his work moved from business intelligence and digital strategy into building software full time.

## Contact

- Email: hey@andremarinho.me
- GitHub: https://github.com/andre-lmarinho
- LinkedIn: https://linkedin.com/in/andre-lmarinho
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
