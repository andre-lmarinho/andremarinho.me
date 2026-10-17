import overview from "@/content/llms.md?raw";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { email, siteDescription, siteName, siteUrl, socials } from "@/lib/site";

export async function GET() {
  const posts = await getPosts();
  const projects = await getProjects();

  const body = `# ${siteName}

> ${siteDescription}

${overview.trim()}

## Full context

- [Complete professional context](${siteUrl}/llms-full.txt): Public overview and complete published project cases and posts in one file.

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
