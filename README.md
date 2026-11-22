# andremarinho.me

[Live site](https://andremarinho.me)

Personal site, blog and portfolio of André Marinho.

Built with Astro 7, TypeScript and Tailwind CSS 4. Astro content collections
validate Markdown posts and project case studies. Pages use static output.
Two API routes read and update post view counts.

Selected projects: [Turistar](https://turistar.me/),
[LawFlow](https://www.lawflowhub.com/) and
[create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp).

## Getting started

```bash
pnpm install
pnpm dev    # dev server
pnpm build  # generate the Vercel deployment artifact
pnpm start  # static-only preview on :3100
```

Use `pnpm dev` to verify the counters and local API. The static preview does not run `/api/views` endpoints.

For static preview and Lighthouse, use trailing-slash routes, such as
`/projects/turistar/`. Audits block analytics and view-counter requests.

`pnpm install` also sets up a pre-commit hook (husky) that runs `lint` and `typecheck`.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm lighthouse
```

Type checking uses TypeScript 7.1 beta and `@astrojs/ts-content-mapper` to check
both TypeScript and Astro files. The project pins these versions while the
integration remains experimental. `pnpm typecheck` runs `astro sync` before
`tsc --noEmit --runExternalCode`.

## Adding content

Posts and projects are Markdown files in `src/content/`, validated by the schemas in `src/content.config.ts`.

Posts — `src/content/posts/*.md`:

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | yes |
| `description` | string | yes |
| `date` | `YYYY-MM-DD` string or date | no |
| `tags` | string (`"a, b"`) or string array | no |
| `project` | string (project slug) | no |

Projects — `src/content/projects/<slug>/index.md`:

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | yes |
| `description` | string | yes |
| `date` | `YYYY-MM-DD` string or date | no |
| `tags` | string (`"a, b"`) or string array | no |
| `link` | string | no |
| `images` | file-name map of `{ alt, caption? }` | yes |

Keep each project's Markdown and images together. Images appear in file-name
order, so name the cover `01-cover.webp`:

```text
src/content/projects/example/
  index.md
  01-cover.webp
  02-detail.webp
```

The folder name is the project slug. Describe each image in `index.md`:

```yaml
images:
  01-cover.webp:
    alt: A description of the project cover
  02-detail.webp:
    alt: A description of the detail shown
    caption: Optional caption
```

Every project needs at least one image. The site uses the first image as each
project's cover and SEO image. Each image needs an `alt` value. A caption is
optional. Covers use a 1280:769 aspect ratio.

Tags accept either a comma-separated string (`"postgres, supabase"`) or an array.

The slug array in `src/pages/index.astro` sets the home project order.
Production omits missing or unpublished projects.

## Structure

- `src/components/` — content, layout, motion, seo and ui components
- `src/layouts/` — `Base.astro` page shell
- `src/lib/` — site config, content helpers, metadata, OpenGraph and SEO utilities
- `src/pages/` — routes: index, about, posts, projects, 404, `sitemap.xml`
- `src/scripts/` — client-side browser script
- `src/styles/` — `global.css` and fonts

## AI and SEO extras

- `/rss.xml` — full-content feed for RSS readers
- `/llms.txt` and `/llms-full.txt` — generated Markdown for AI crawlers (`src/pages/llms.txt.ts`)
- Satori and Sharp render a page-specific `/opengraph-image` route for each page
- `vercel.json` routes serve raw Markdown for posts and projects with canonical `Link` headers
