import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";
import { email, socials } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getPosts();
  const projects = getProjects();

  const body = `# ${siteName}

> ${siteDescription}

${readFileSync(join(process.cwd(), "content/llms.md"), "utf8").trim()}

## Projects

${projects
  .map(
    (project) =>
      `- [${project.title}](${siteUrl}/projects/${project.slug}/index.md): ${project.description}`,
  )
  .join("\n")}

## Writing

${posts
  .map(
    (post) =>
      `- [${post.title}](${siteUrl}/posts/${post.slug}/index.md): ${post.description}`,
  )
  .join("\n")}

## Contact

- [Email](mailto:${email}): Professional contact.
${socials
  .slice(0, 2)
  .map(({ label, href }) => `- [${label}](${href}): ${siteName} on ${label}.`)
  .join("\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
