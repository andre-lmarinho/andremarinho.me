# andremarinho.me

Personal site, blog and portfolio of André Marinho — [andremarinho.me](https://andremarinho.me).

Built with Astro (static output), Tailwind CSS 4 and TypeScript. Deployed on Vercel.

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

Every project needs at least one image. The first image is used as its cover and
SEO image. `alt` is required, captions are optional, and covers use a 1280:769
aspect ratio.

Tags accept either a comma-separated string (`"postgres, supabase"`) or an array.

Home projects are selected by the slug array in `src/pages/index.astro`, in display order. Missing or unpublished projects are omitted in production.

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
- Per-page `/opengraph-image` routes rendered with `@vercel/og`
- `vercel.json` serves each post/project as raw Markdown with canonical `Link` headers
