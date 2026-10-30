// @vitest-environment node
import { expect, it } from "vitest";
import {
  getPostMetadata as postMetadata,
  getProjectMetadata as projectMetadata,
} from "../metadata";
import type { Post } from "../posts";
import type { Project } from "../projects";
import {
  postJsonLd,
  profileJsonLd,
  projectJsonLd,
  websiteJsonLd,
} from "../seo";
import { siteUrl } from "../site";

const post: Post = {
  slug: "example",
  title: "Example",
  description: "A technical decision.",
  date: "2026-07-17",
  tags: ["astro", "testing"],
  body: "The content.",
  minutes: 1,
};

const project: Project = {
  slug: "example",
  title: "Example",
  description: "A technical decision.",
  date: "2026-07-17",
  tags: ["astro", "testing"],
  link: "",
  images: [
    {
      src: { src: "/first.webp", width: 800, height: 600, format: "webp" },
      alt: "First image",
    },
    {
      src: { src: "/second.webp", width: 800, height: 600, format: "webp" },
      alt: "Second image",
    },
  ],
  body: "The content.",
};

it("uses the same identified person for the profile, site, and content authors", () => {
  const person = profileJsonLd.mainEntity;
  expect(profileJsonLd.url).toBe(`${siteUrl}/about`);
  expect(person["@id"]).toBe(`${siteUrl}/#person`);
  expect(person.url).toBe(profileJsonLd.url);
  expect(websiteJsonLd.author).toEqual(person);
  expect(postJsonLd(post).author).toEqual(person);
  expect(projectJsonLd(project).author).toEqual(person);
});

it("describes project cases as articles with topics, not source code or product identities", () => {
  for (const entry of [project, { ...project, tags: [] }]) {
    const schema = projectJsonLd(entry);
    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe(entry.title);
    expect(schema.keywords).toEqual(entry.tags);
    expect(schema).not.toHaveProperty("programmingLanguage");
    expect(schema).not.toHaveProperty("sameAs");
  }
});

it("preserves publication dates and omits dates on drafts", () => {
  expect(postJsonLd(post).datePublished).toBe(post.date);
  expect(postJsonLd(post)).not.toHaveProperty("dateModified");
  expect(projectJsonLd(project).datePublished).toBe(project.date);
  expect(postJsonLd({ ...post, date: "" })).not.toHaveProperty("datePublished");
  expect(projectJsonLd({ ...project, date: "" })).not.toHaveProperty(
    "datePublished",
  );
});

it("preserves canonical URLs and identifies the profile as the content author", () => {
  for (const [result, section] of [
    [postMetadata(post), "posts"],
    [projectMetadata(project), "projects"],
  ] as const) {
    expect(result.canonical).toBe(`/${section}/example`);
    expect(result.markdown).toBe(`/${section}/example/index.md`);
    expect(result.authors).toEqual([
      { name: profileJsonLd.mainEntity.name, url: `${siteUrl}/about` },
    ]);
    expect(result.openGraph).toMatchObject({
      type: "article",
      publishedTime: post.date,
      authors: [`${siteUrl}/about`],
    });
  }
});

it("omits draft dates from page metadata", () => {
  expect(
    postMetadata({ ...post, date: "" }).openGraph.publishedTime,
  ).toBeUndefined();
  expect(
    projectMetadata({ ...project, date: "" }).openGraph.publishedTime,
  ).toBeUndefined();
});

it("always uses the first project image for metadata and structured data", () => {
  const first = project.images[0];
  expect(projectMetadata(project).openGraph.image).toEqual({
    url: first.src.src,
    width: first.src.width,
    height: first.src.height,
    alt: first.alt,
  });
  expect(projectJsonLd(project).image).toBe(`${siteUrl}${first.src.src}`);
});
