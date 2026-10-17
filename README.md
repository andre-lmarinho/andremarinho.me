# andremarinho.me

Personal portfolio and blog built with Astro, TypeScript, Tailwind CSS, and
Markdown. Pages, social cards, and responsive images are generated during the
build. Fonts are self-hosted; small browser scripts handle counters, link
prefetching, page transitions, Vercel Analytics, and Speed Insights.

Astro's client router swaps pages without reloading the document. The header stays
outside page animations; title and project-image transitions retain their existing
styles. Navigation links are prefetched by Astro.
Text remains visible with fallback fonts while the two preloaded fonts load;
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

Lighthouse checks the home, About, both indexes, a project, and an article. It
warns below 90 for performance and requires 100 for accessibility, best practices,
and SEO. Reports are retained as CI artifacts on pull requests. Its user agent
identifies the audit to avoid recording synthetic visits. Analytics and the
external view counter are blocked in these repeatable local measurements;
their availability and failure behavior require separate checks.

## Content

Edit Markdown in `content/`. The [content guide](content/README.md) describes
frontmatter, drafts, project links, and publication rules. Astro's Markdown
processor renders the articles, preserving external link behavior and the site's
existing typography.

Images live in `src/assets/images/` and enter the build as imported assets. The
shared `ResponsiveImage` component resolves content image paths and delegates
AVIF/WebP variants, dimensions, hashing, and caching to Astro's native `Picture`
component. Development processes edits on demand; production emits optimized
files with content-hashed URLs in `dist/_astro/`.
In Astro 7.4 dev, image edits that keep the same dimensions can require bypassing
the browser cache.
Replace `public/resume.pdf` to update the downloadable résumé.
