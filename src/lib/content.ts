import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

// Flat `key: value` frontmatter between `---` fences. No YAML parser needed.
export function readMarkdown(dir: string, slug: string) {
  const raw = readFileSync(join(dir, `${slug}.md`), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`"${slug}": missing frontmatter`);
  const [, front, body] = match;

  const meta: Record<string, string> = {};
  for (const line of front.split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!meta.title) throw new Error(`"${slug}": missing title`);
  if (!meta.description) throw new Error(`"${slug}": missing description`);

  return { meta, html: marked.parse(body, { async: false }) };
}

const isPublished = (date: string) =>
  Boolean(date) || process.env.NODE_ENV === "development";

export function readAllContent<T extends { date: string }>(
  dir: string,
  parse: (slug: string) => T,
): T[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .filter((item) => isPublished(item.date))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });

export const formatShortDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
