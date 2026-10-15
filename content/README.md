# Content

Public site content is written in English. Posts live in `posts/`, project
cases in `projects/`, and the professional overview for `/llms.txt` in `llms.md`.

## Posts and project cases

Each entry is a `.md` file. Its filename without the extension becomes its
URL slug, so keep published filenames stable.

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

Frontmatter uses flat `key: value` lines, not a full YAML parser. Write values
without surrounding quotes; use comma-separated tags rather than YAML arrays.
`title` and `description` are required. Start body headings at `##`; the page
title and description come from frontmatter.

`date` is the publication date in `YYYY-MM-DD` format. Omit it to preview a
draft in development. Undated entries are excluded from production pages,
lists, the sitemap, `/llms.txt`, and public Markdown routes. A future date does
not schedule publication: any nonempty date publishes the entry at build time.
Lists are ordered by publication date, newest first.

Posts can optionally specify `project: turistar`, using a project's filename
without `.md`. The HTML post links to that project, and the case lists its
related posts. Missing or unpublished projects produce no related link in
production; cases without related posts show no related-content block.
General articles can use contextual links without assigning a project.

Project cases also accept these optional fields:

- `image`: a screenshot path, such as `/images/projects/turistar.webp`.
- `link`: the public product, repository, or package URL.
- `featured: true`: include the case in the home page's project list.
- `kind`: a short project category, such as `open source` or `npm CLI`.

Cases include `## Context`, `## My role`, `## Scope`, and `## Decisions`, which
the content checks verify. Add evidence and disclosure where relevant. Link
technical claims directly to public files, tests, PRs, or decision records;
use commit permalinks for historical claims.

## HTML and Markdown

Markdown renders directly as React elements on the server using
`markdown-to-jsx`. Internal links use Next.js `Link`; external web links open
in a new tab with `noopener noreferrer`. Use root-relative paths for internal
links and images, and describe images with alt text.

Every published post and case also has a static Markdown representation:

- `/posts/<slug>/index.md`
- `/projects/<slug>/index.md`

These responses contain the title, description, author link, and Markdown
body from the same source used by HTML. They do not include page navigation
or the related-content blocks added by the HTML templates.

HTML pages advertise their Markdown version with
`rel="alternate" type="text/markdown"`. Markdown responses use
`text/markdown; charset=utf-8` and HTTP `Link` headers pointing to the
canonical HTML page and `/llms.txt`. The sitemap keeps the HTML URLs.
The `index.md` convention follows the [llms.txt proposal](https://llmstxt.org/#proposal).

## Professional overview

Edit `llms.md` to update the public professional overview, keeping its facts
consistent with the About page and résumé. It is a Markdown fragment without
frontmatter. The `/llms.txt` route adds the site title, description, contacts,
and lists of published projects and posts, linking to their Markdown versions.
Keep case details and evidence in their original entries rather than copying
them into the overview.

To update the résumé, replace `public/resume.pdf`; the download URL stays the
same. Run the checks listed in the root README before publishing.
