import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getPosts } from "@/lib/posts";
import OpengraphImage, { getFonts, size } from "..";

const text = (container: HTMLElement) => container.textContent ?? "";

describe("OpengraphImage", () => {
  it("renders the title, the description and the domain", () => {
    const { container } = render(
      <OpengraphImage title="Hello World" description="A description." />,
    );

    expect(text(container)).toContain("Hello World");
    expect(text(container)).toContain("A description.");
    expect(text(container)).toContain("andremarinho.me");
  });

  it("appends the path to the domain", () => {
    const { container } = render(
      <OpengraphImage title="Projects" path="/projects" />,
    );

    expect(text(container)).toContain("andremarinho.me/projects");
  });

  // The footer is one unwrapped line, so a long slug is the only input that can
  // run past the card edge. JetBrains Mono advances 0.6em, so 22px glyphs are
  // 13.2px wide against the 1056px between the 72px gutters.
  it("keeps every post's footer inside the card", () => {
    const widest = getPosts()
      .map((post) => `andremarinho.me/posts/${post.slug}`)
      .sort((a, b) => b.length - a.length)[0];

    expect(widest.length * 13.2, `"${widest}" overflows`).toBeLessThan(1056);
  });

  it("still renders without a description", () => {
    const { container } = render(<OpengraphImage title="Writing" />);

    expect(text(container)).toContain("Writing");
    expect(text(container)).toContain("andremarinho.me");
  });

  // A title that overflows its box is invisible in the metadata and only shows
  // up once a card is shared, so the step down is worth pinning.
  it("drops the title a size once it passes the wrap threshold", () => {
    const short = render(<OpengraphImage title={"a".repeat(44)} />);
    const long = render(<OpengraphImage title={"a".repeat(45)} />);

    const fontSize = (result: ReturnType<typeof render>) =>
      [...result.container.querySelectorAll<HTMLElement>("div")].find(
        (el) => el.style.fontSize,
      )?.style.fontSize;

    expect(fontSize(short)).toBe("84px");
    expect(fontSize(long)).toBe("68px");
  });

  it("uses the dimensions every OG consumer expects", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
  });
});

describe("getFonts", () => {
  it("loads the two families the card asks for", async () => {
    const fonts = await getFonts();

    expect(fonts.map(({ name, weight }) => `${name} ${weight}`).sort()).toEqual(
      ["Archivo 400", "Archivo 600", "JetBrains Mono 400"],
    );
    expect(fonts.every((font) => font.data.byteLength > 0)).toBe(true);
  });
});

// jsdom serializes every color it parses as rgb(), so the tokens have to be
// converted before they can be compared against the rendered markup.
const toRgb = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((at) =>
    Number.parseInt(hex.slice(at, at + 2), 16),
  );
  return `rgb(${r}, ${g}, ${b})`;
};

// The card cannot import globals.css, so its palette is a second copy of the
// tokens. This is what stops that copy from drifting silently: change a color
// in globals.css and the suite names the one the card still has.
describe("palette", () => {
  it("matches the tokens in globals.css", async () => {
    const css = await readFile(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );
    const declared = new Map(
      [...css.matchAll(/--color-([a-z0-9-]+):\s*([^;]+);/g)].map(
        ([, name, value]) => [name, value.trim()],
      ),
    );

    const { container } = render(
      <OpengraphImage title="Title" description="Description." />,
    );
    const html = container.innerHTML;

    for (const token of ["bg", "foreground", "muted", "border", "accent"]) {
      const value = declared.get(token);
      expect(value, `globals.css is missing --color-${token}`).toBeDefined();
      expect(html, `the card no longer uses --color-${token}`).toContain(
        toRgb(value as string),
      );
    }
  });
});
