# andremarinho.me

Personal portfolio and blog built with Astro, React components rendered at build
time, TypeScript, Tailwind CSS, and Markdown. React and a client router are not
shipped to visitors. Small browser scripts handle view counters, link prefetching,
and Vercel telemetry; page transitions use the browser's native API.

## Run locally

Use Node.js 24 and the pnpm version declared in [package.json](package.json).

```bash
pnpm install
pnpm dev
```

Open [localhost:4321](http://localhost:4321).

## Checks

Before publishing changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm lighthouse
```

The build generates responsive WebP images and all public HTML, Markdown, XML,
and social image routes in `dist/`. No image optimization runs on the first visit.

CI runs checks and Lighthouse on pull requests and pushes to `main`. Lighthouse
discovers every public HTML page in the build, including all posts and projects.
Four isolated runners each perform three cold mobile runs per URL. Every run
must score at least 99 for performance and 100 for accessibility, best practices,
and SEO. The worst result determines the gate.

Chrome 155.0.8059.84 and Lighthouse 12.6.1 are pinned. Lighthouse's standard mobile
network and 4× CPU throttling are preserved. CI retains HTML/JSON reports, browser
traces, and network logs even when assertions fail. Route discovery is checked
with `node --test scripts/check-lighthouse-routes.cjs`.

To check an existing Vercel preview before publishing:

```bash
LHCI_BASE_URL=https://your-preview.vercel.app LHCI_PREVIEW=1 pnpm lighthouse
```

Remote checks require at least 97 for every page and run and include real Vercel
Analytics and Speed Insights scripts. Their endpoints are blocked only in local
build checks because they require Vercel hosting. `LHCI_PREVIEW=1` excludes only
the SEO `is-crawlable` audit: Vercel intentionally marks previews `noindex`. Omit
that flag when testing production. Protected previews also require an authorized
browser session; keep authentication outside reports and source control.

Use `CHROME_PATH` to point local checks at the same pinned Chrome binary.
Reports are written to `.lighthouseci/`; traces and network logs are written to
the project root.

## Content

Edit posts, project cases, and the `/llms.txt` overview in `content/`.
See the [content guide](content/README.md) for formatting and publication rules.
Images in `public/images/` are processed automatically during development and
build. Generated variants have content hashes and live in `public/_images/`.

Replace `public/resume.pdf` to update the downloadable résumé at `/resume.pdf`.
