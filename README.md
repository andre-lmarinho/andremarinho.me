# andremarinho.me

Personal site, blog and portfolio of André Marinho — [andremarinho.me](https://andremarinho.me).

Built with Astro (static output), Tailwind CSS 4 and TypeScript. Deployed on Vercel.

## Getting started

```bash
pnpm install
pnpm dev    # dev server
pnpm build  # static build to dist/
pnpm start  # preview the build on :3100
```

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

Projects — `src/content/projects/*.md`:

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | yes |
| `description` | string | yes |
| `date` | `YYYY-MM-DD` string or date | no |
| `tags` | string (`"a, b"`) or string array | no |
| `image` | string | no |
| `link` | string | no |
| `featured` | `true` (boolean or `"true"`) | no |
| `kind` | string | no |

Tags accept either a comma-separated string (`"postgres, supabase"`) or an array; `featured` accepts `true` or `"true"`.

## Structure

- `src/components/` — content, layout, motion, seo and ui components
- `src/layouts/` — `Base.astro` page shell
- `src/lib/` — site config, content helpers, metadata, OpenGraph and SEO utilities
- `src/pages/` — routes: index, about, posts, projects, 404, `sitemap.xml`
- `src/scripts/` — client-side browser script
- `src/styles/` — `global.css` and fonts

## AI and SEO extras

- `/llms.txt` and `/llms-full.txt` — generated Markdown for AI crawlers (`src/pages/llms.txt.ts`)
- Per-page `/opengraph-image` routes rendered with `@vercel/og`
- `vercel.json` serves each post/project as raw Markdown with canonical `Link` headers
