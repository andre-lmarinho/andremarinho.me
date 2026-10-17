import { getProject, getProjects } from "@/lib/projects";
import { siteName, siteUrl } from "@/lib/site";

export async function getStaticPaths() {
  return (await getProjects()).map(({ slug }) => ({ params: { slug } }));
}

export async function GET({ params }: { params: { slug?: string } }) {
  const { slug } = params;
  if (!slug) return new Response(null, { status: 404 });
  const project = await getProject(slug);
  if (!project) return new Response(null, { status: 404 });

  return new Response(
    `# ${project.title}\n\n> ${project.description}\n\nBy [${siteName}](${siteUrl}/about)\n\n${project.date ? `Published: ${project.date}\n\n` : ""}${project.body.trim()}\n`,
    {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        Link: `<${siteUrl}/projects/${slug}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
      },
    },
  );
}
