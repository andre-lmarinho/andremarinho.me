// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const directory = (section: string) =>
  join(process.cwd(), "src/content", section);

const markdownFiles = (section: string) => {
  const names = readdirSync(directory(section));
  return section === "projects"
    ? names.map((name) => join(name, "index.md"))
    : names.filter((name) => name.endsWith(".md"));
};

const slugOf = (name: string) => name.replace(/(?:\/index)?\.md$/, "");

describe("content", () => {
  it("finds posts and projects to check", () => {
    for (const section of ["posts", "projects"]) {
      expect(markdownFiles(section).length, section).toBeGreaterThan(0);
    }
  });

  it("gives every entry a unique slug across posts and projects", () => {
    const slugs = ["posts", "projects"].flatMap((section) =>
      markdownFiles(section).map(slugOf),
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("explains each project's context, ownership, scope, and decisions", () => {
    for (const name of markdownFiles("projects")) {
      const source = readFileSync(join(directory("projects"), name), "utf8");
      // raw scan, no markdown parse; a "## X" inside a code fence would false-pass.
      const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
      const headings = [...body.matchAll(/^## (.+)$/gm)].map(([, heading]) =>
        heading.trim(),
      );

      expect(headings, `${name} is missing essential context`).toEqual(
        expect.arrayContaining(["Context", "My role", "Scope", "Decisions"]),
      );
    }
  });
});
