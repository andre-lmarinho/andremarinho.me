# andremarinho.me

Personal portfolio and blog built with Astro, TypeScript, Tailwind CSS, and
Markdown. Pages, social cards, and responsive images are generated during the
build. Fonts are self-hosted; small browser scripts handle counters, link
prefetching, page transitions, Vercel Analytics, and Speed Insights.

Astro's client router swaps pages without reloading the document. The header stays
outside page animations; title and project-image transitions retain their existing
styles. Navigation links are prefetched by Astro.
On the initial visit, content appears once its two preloaded fonts are ready;
subsequent client navigations reuse them.

## Development

Use Node.js 24 and the pnpm version declared in [package.json](package.json).

```bash
pnpm install
pnpm dev
```

Open [localhost:4321](http://localhost:4321). To preview the production build:

```bash
pnpm build
pnpm start
```

Open [localhost:3100](http://localhost:3100).

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm lighthouse
```

Lighthouse keeps the original CI policy: one run on the homepage and Turistar,
a performance warning below 90, and a minimum of 100 for accessibility, best
practices, and SEO. Reports are retained as CI artifacts on pull requests.

## Content

Edit Markdown in `content/`. The [content guide](content/README.md) describes
frontmatter, drafts, project links, and publication rules. Astro's Markdown
processor renders the articles, preserving external link behavior and the site's
existing typography.

Development serves the original images in `public/images/`, so edits and new files
appear immediately. The production build generates responsive AVIF and WebP
variants. Existing variants in `src/assets/image-cache/` preserve the previous
production images exactly; new or changed sources are encoded automatically.
Generated files have content hashes and live in `public/_images/`.
Replace `public/resume.pdf` to update the downloadable résumé.
