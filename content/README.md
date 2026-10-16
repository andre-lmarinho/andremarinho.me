# Content

Write public content in English:

- `posts/`: blog posts.
- `projects/`: project cases.
- `llms.md`: the professional overview included in `/llms.txt`.

## Posts and project cases

Create a `.md` file in the appropriate folder. Its filename becomes the URL
slug: `posts/example.md` produces `/posts/example`. Keep published filenames stable.

Start with flat `key: value` frontmatter. `title` and `description` are required;
use unquoted values and comma-separated tags. YAML arrays and multiline values
are not supported.

```markdown
---
title: A technical note
description: A short description of the problem and decision.
date: 2026-10-15
tags: TypeScript, PostgreSQL
---

## Context

Start the article here.
```

Start body headings at `##`; the page supplies the title and description.

Omit `date` to preview a draft with `pnpm dev`. Undated entries are excluded
from production pages, lists, the sitemap, `/llms.txt`, and Markdown routes.
To publish, add a date in `YYYY-MM-DD` format. Any nonempty date publishes at
build time, including future dates; publication is not scheduled. Lists sort
by publication date, newest first.

## Project cases and related posts

Cases must include `## Context`, `## My role`, `## Scope`, and `## Decisions`;
the content tests check these headings. Add evidence and disclosure where
relevant. Link technical claims to public code, tests, PRs, or decision records,
using commit permalinks for historical claims.

Optional project fields:

- `image`: screenshot path, such as `/images/projects/turistar.webp`.
- `link`: public product, repository, or package URL.
- `featured: true`: show the case on the home page.
- `kind`: category label, such as `open source` or `npm CLI`.

Posts can optionally specify `project: turistar`, using a project's filename
without `.md`. The HTML post links to that project, and the case lists its
related posts. Missing or unpublished projects produce no related link in
production; cases without related posts show no related-content block.
General articles can use contextual links without assigning a project.

## Links and public Markdown

Use root-relative paths for internal links and images, and give images alt text.
External web links open in a new tab with `noopener noreferrer`.

Every published post and case also has a static Markdown representation:

- `/posts/<slug>/index.md`
- `/projects/<slug>/index.md`

Edit the source entry to update both formats. The Markdown response includes
the title, description, author link, and body; page navigation and automatic
related-content blocks appear only in HTML.

HTML pages link to their Markdown alternative. Markdown responses use
`text/markdown` and supply canonical and `/llms.txt` links in HTTP headers.
The sitemap lists HTML URLs. The `index.md` convention follows the
[llms.txt proposal](https://llmstxt.org/).

## Professional overview

Edit `llms.md` as a Markdown fragment without frontmatter. Keep its public
facts consistent with the About page and résumé, and project-specific evidence
in the cases. The `/llms.txt` route adds the site title, description, contacts,
and lists of published projects and posts linked to their Markdown versions.

`/llms-full.txt` combines this public overview with every published case and
post, preserving authorship, publication dates, source URLs, and complete bodies.
It uses the same publication rules as HTML and is linked from `/llms.txt`.
Edit the existing sources to update it.

Before publishing, run the [checks in the root README](../README.md#checks).
