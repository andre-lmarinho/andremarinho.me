# andremarinho.me

Personal portfolio and blog built with Next.js, TypeScript, Tailwind CSS, and Markdown.

## Run locally

Use Node.js 24 and the pnpm version declared in [package.json](package.json).

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

## Checks

Before publishing changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

CI runs these checks and Lighthouse on pull requests and pushes to `main`.
Lighthouse discovers every public page from the production build, including all
posts and projects. Four isolated runner shards each perform three cold mobile
runs per URL. Every run must score at least 99 for performance and 100 for
accessibility, best practices, and SEO; the worst result determines the gate.
Chrome 155.0.8059.84 and Lighthouse 12.6.1 are pinned, with Lighthouse's standard
mobile network and 4× CPU throttling. CI retains HTML/JSON reports, browser traces,
and network logs even when an assertion fails. Route discovery is checked with
`node --test scripts/check-lighthouse-routes.cjs` in CI.

After `pnpm build`, run the same checks with `pnpm lighthouse`. To validate an
existing Vercel preview before publishing to production:

```bash
LHCI_BASE_URL=https://your-preview.vercel.app LHCI_PREVIEW=1 pnpm lighthouse
```

The preview gate requires at least 97 for every page and run. `LHCI_PREVIEW=1`
excludes only the SEO `is-crawlable` audit because Vercel intentionally sends
`X-Robots-Tag: noindex` on previews. Omit that flag when testing production. Both remote modes include the
Vercel Analytics and Speed Insights scripts, which are blocked only in local
build measurements because their endpoints require Vercel hosting. Both modes
save traces and network logs in the project root and reports in `.lighthouseci/`.
Use `CHROME_PATH` to point local checks at the same pinned Chrome binary.

## Content

Edit posts, project cases, and the `/llms.txt` overview in `content/`.
See the [content guide](content/README.md) for formatting and publication rules.

Replace `public/resume.pdf` to update the downloadable résumé at `/resume.pdf`.
