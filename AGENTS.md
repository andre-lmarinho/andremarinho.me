# AGENTS.md

Astro 7 static site (pnpm, Node 24). Commands: `pnpm dev`, `pnpm build`,
`pnpm typecheck`, `pnpm lint` / `pnpm lint:fix`, `pnpm test`. Husky runs lint
and typecheck on commit; CI adds build and tests.

## Layout

- `src/pages/`: file-based routes, including `.ts` endpoints (`llms.txt`,
  `llms-full.txt`, `sitemap.xml`, `<slug>/index.md`, `opengraph-image`).
- `src/content/`: posts and projects, loaded through the glob collections in
  `src/content.config.ts` (schema: `astro/zod`), plus `llms.md`, imported raw
  by the `llms.txt` endpoints.
- `src/lib/`: `site.ts` (name, URL, socials), `posts.ts` / `projects.ts`
  (async collection queries), `content.ts` (dates, draft rule), `images.ts`
  (`imageFor`), `metadata.ts`, `seo.ts`, `opengraph.ts`, `abacus.ts`.
- `src/assets/`: images and fonts, imported as assets; nothing image-like
  lives in `public/`.
- Tests sit in `__tests__/` next to the code they cover.

## Conventions

- Content queries are async and draft-aware: an entry without a `date` is
  hidden in production and visible in dev.
- Frontmatter `image` paths like `/images/projects/turistar.webp` resolve
  through `imageFor` against `src/assets/images`; a missing file fails the
  build. Project Open Graph images use the hashed `/_astro/` URL.
- Tests never start the content layer: route tests mock `astro:content`, and
  real-content checks read `src/content` from disk. Frontmatter is governed by
  the `src/content.config.ts` schema, enforced at dev/build time (non-empty
  `title` included).
- Guides: `README.md` (setup, checks) and `src/content/README.md` (authoring).
