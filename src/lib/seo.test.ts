import { expect, it } from "vitest";
import {
  getPostMetadata as postMetadata,
  getProjectMetadata as projectMetadata,
} from "./metadata";
import * as posts from "./posts";
import * as projects from "./projects";
import { postJsonLd, profileJsonLd, projectJsonLd, websiteJsonLd } from "./seo";
import { siteUrl } from "./site";

const post = posts.getPosts()[0];
const project = projects.getProjects()[0];

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
  for (const entry of projects.getProjects()) {
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

it("preserves canonical URLs and identifies the profile as the content author", async () => {
  for (const [entry, metadata, section] of [
    [post, postMetadata, "posts"],
    [project, projectMetadata, "projects"],
  ] as const) {
    const result = metadata(entry.slug);
    expect(result?.canonical).toBe(`/${section}/${entry.slug}`);
    expect(result?.authors).toEqual([
      { name: profileJsonLd.mainEntity.name, url: `${siteUrl}/about` },
    ]);
    expect(result?.openGraph).toMatchObject({
      type: "article",
      publishedTime: entry.date,
      authors: [`${siteUrl}/about`],
    });
  }
});
