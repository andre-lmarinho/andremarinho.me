---
title: Moving my portfolio from Next.js to static Astro
description: Moving a Markdown-driven portfolio to static Astro, preserving its public routes and interactions, and checking the Lighthouse improvement in CI.
date: 2026-10-19
tags: Astro, Next.js, Architecture, Static sites, Performance
---

My portfolio's main job is to serve writing and project cases. The content lives in Markdown, the pages are public, and the visitor needs to read them without waiting for application data. I moved the site from Next.js and React to static Astro to make that shape explicit in the implementation.

The migration shipped in [PR #39](https://github.com/andre-lmarinho/andremarinho.me/pull/39). It covered the page shell, content pipeline, images, navigation and deployment configuration. Swapping dependencies was only part of the work: a post still needed the same public address, a preview image and readable content after the move.

## What the CI history measures

The [pre-migration PR #38 CI run](https://github.com/andre-lmarinho/andremarinho.me/actions/runs/38930334816/job/117072386062), on October 16, recorded a Lighthouse Performance score of 73/100 for the home page. The [final migration CI run](https://github.com/andre-lmarinho/andremarinho.me/actions/runs/39093552873/job/117575158524), on October 18, checked six routes, including the home page, without a warning against the 90/100 performance threshold.

| Historical CI observation | Home-page Performance |
| --- | ---: |
| Next.js, before migration | 73/100 |
| Astro, final migration run | At least 90/100 |

That establishes a score increase of at least 17 points between those recorded runs. The full CI report artifacts have expired, so the retained logs establish the later lower bound rather than an exact score. Separately, the migration PR records a local single-run result of 99–100 across the six routes, with 100 in accessibility, best practices and SEO, and zero CLS. Those local figures are a separate observation.

Both CI configurations ran Lighthouse once per URL against a locally served production build. The migration expanded coverage from two routes to six, added an explicit emulated user agent and blocked the external counter service as well as the Vercel analytics endpoints already excluded before. Together with changes to layout, fonts and images, that makes this a historical comparison of the delivered change, rather than an experiment isolating Astro. A score increase also does not mean the page loaded 17% faster, or establish a production p95.

## Use the content model as the starting point

Posts and projects were already Markdown. I kept that authoring format and moved the entries into Astro collections, with schemas for titles, descriptions, dates and tags. Posts can also carry a project slug.

That relationship drives the related-notes list at the end of each project. The author declares the relationship once in frontmatter, and the layout finds the matching posts. The migration needed to preserve that behavior along with the content itself.

The main pages now render through Astro components and a shared layout. Posts, projects and their metadata are prepared during the build. The content pages remain prerendered, matching the public editorial surface they serve.

A static page can still need a live service. View counters and telemetry have their own behavior, so I kept the distinction between delivering the article and updating information around it. The current site has a view-count API while the content pages remain prerendered. That API evolved after the migration.

## Preserve the ways a reader reaches the content

A migration can render the visible article correctly and still break its other entry points. I carried over canonical metadata, Open Graph and Twitter images, structured data, the sitemap and Markdown exports.

For a post, that means the HTML page and its `/index.md` representation need to identify the same canonical URL. Social image routes also need to keep returning an actual image with the expected content type. These are public contracts even though they are less visible than the page layout.

I used the existing route shapes rather than introducing a new URL structure with the framework change. Site identity and URL helpers supply the metadata, so a page title or canonical address does not need an independent interpretation in each route.

The [migration revision](https://github.com/andre-lmarinho/andremarinho.me/commit/1938d1bcbdf1700c7090099d954c16c9adabe2e1) includes the static page routes and metadata exports. The full-content RSS feed arrived in a later change.

## Keep the browser behavior that earns its cost

I retained client navigation through Astro's `ClientRouter`. The browser also runs code for counters and page interactions. Calling the result a zero-JavaScript site would describe a different implementation.

Client navigation changes how scripts need to behave. Loading another document can replace part of the page without restarting the browser environment. An interaction attached to an old element needs cleanup, and the new page needs initialization. Returning through the browser's back-forward cache adds another restoration path.

The browser script handles navigation and restoration explicitly. That gives page effects a lifecycle instead of assuming they run exactly once after a full document load. It also preserves reduced-motion behavior where an effect depends on pointer movement.

These details are easy to miss when reviewing only the first page load. I needed the site to work after a visitor opened a project, followed a related post, returned through history and continued reading.

## Move images and fonts with their layout constraints

The migration moved local images into the asset pipeline and used Astro's image components to prepare variants during the build. It also preserved image dimensions and placeholders, local fonts and fallback metrics.

Those choices affect the space content occupies while resources arrive. An image that eventually looks correct can still move the surrounding text during loading. A font fallback that differs from the final font can change line breaks in a heading. The framework conversion needed to retain those constraints instead of treating asset paths as the whole image migration.

The implementation continued to evolve afterward. A later image change adopted Astro's responsive layout behavior, and later work consolidated shared interactions and styles. I would not attribute the current site's behavior to the migration commit alone.

## Match verification to the contract

The repository checks now use Astro's checker alongside lint, tests and the production build. Its CI runs Lighthouse for pull requests. The migration also includes tests for content exports, project links, metadata and browser initialization.

Each check has a narrower job than proving the whole migration successful. A schema check catches malformed content. A build catches broken imports and prerendering failures. An export test can protect the relationship between a Markdown response and its canonical URL. Navigation and assistive-technology behavior still need their own runtime evidence.

I still write posts and project cases in Markdown. The same content, metadata and export checks now run through the Astro pipeline when I change what the reader receives.
