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

it("uses the project's image when available and the listing image otherwise", () => {
  const image = {
    src: "/example.webp",
    width: 800,
    height: 600,
    format: "webp",
  } as const;
  expect(projectMetadata({ ...project, image }).openGraph.image).toEqual({
    url: image.src,
    width: image.width,
    height: image.height,
    alt: "Example interface",
  });
  expect(projectMetadata(project).openGraph.image.url).toBe(
    "/projects/opengraph-image",
  );
});
