import { getProject, getProjects } from "@/lib/projects";
import { siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response(null, { status: 404 });

  return new Response(
    `# ${project.title}\n\n> ${project.description}\n\nBy [${siteName}](${siteUrl}/about)\n\n${project.body.trim()}\n`,
    {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        Link: `<${siteUrl}/projects/${slug}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
      },
    },
  );
}
