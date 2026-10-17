import overview from "@/content/llms.md?raw";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { email, siteDescription, siteName, siteUrl, socials } from "@/lib/site";

export async function GET() {
  const documents = (
    [
      ["projects", await getProjects()],
      ["posts", await getPosts()],
    ] as const
  ).flatMap(([section, entries]) =>
    entries.map(
      (entry) =>
        `# ${entry.title}\n\n> ${entry.description}\n\nBy [${siteName}](${siteUrl}/about)\n\nPublished: ${entry.date || "Draft"}\n\nSource: ${siteUrl}/${section}/${entry.slug}\n\n${entry.body.trim()}`,
    ),
  );

  return new Response(
    `# ${siteName}

> ${siteDescription}

Public professional overview followed by the complete published project cases and posts. Each document retains its source URL, evidence and limitations.

${overview.trim()}

## Contact

- [Email](mailto:${email})
${socials
  .slice(0, 2)
  .map(({ label, href }) => `- [${label}](${href})`)
  .join("\n")}

---

${documents.join("\n\n---\n\n")}
`,
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        Link: `<${siteUrl}/llms.txt>; rel="describedby"`,
      },
    },
  );
}
