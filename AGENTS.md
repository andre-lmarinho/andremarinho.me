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
- Tests that call `astro:content` need `// @vitest-environment node` and a
  populated data store; `vitest.global-setup.ts` boots `astro dev` once to
  write it. Page tests mock `getCollection` instead.
- Guides: `README.md` (setup, checks) and `src/content/README.md` (authoring).
