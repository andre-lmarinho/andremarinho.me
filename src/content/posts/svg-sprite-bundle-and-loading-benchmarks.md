---
title: Measuring SVG sprites beyond the JavaScript bundle
description: Two reproducible benchmarks of typed SVG sprites and extracted Cal.diy components show how less JavaScript can coexist with more traffic and later icon readiness.
date: 2026-10-27
tags: SVG, React, Performance, Playwright, Benchmarking
project: typed-svg-sprite
---

A shared SVG sprite reduced gzip JavaScript by 6.45% in my two-page simulation. The first page still downloaded 1.73% more bytes, and the icons resolved later. Looking only at the JavaScript bundle would have given me an incomplete answer.

I built [typed-svg-sprite](/projects/typed-svg-sprite) to generate an SVG sprite and typed icon names from one validated list. That gives me a concrete consistency check between the asset and its callers. Whether the same delivery strategy makes a page faster needed a separate experiment.

I ran two benchmarks: a synthetic comparison built around the reference project, then an isolated extraction of the actual icon components from Cal.diy, which inspired the approach. Together they produced 375 measured navigations. They answer different questions, so I kept their inputs and results separate.

## Start with the bytes the browser actually needs

The first experiment compares generated inline React glyphs with external SVG sprites, using the same Lucide artwork and production Vite builds. The inline baseline imports only the icons a page needs and shares overlapping modules between pages. It is not the exact `lucide-react` implementation.

Alongside the small demo, I created a synthetic dashboard with a catalog of 500 icons. Each of two pages renders 400 instances from 40 distinct icons. Twenty names overlap, so the two pages together need 60 drawings. Rendering an icon repeatedly does not require repeatedly shipping its definition.

I compared inline components, a manually scoped 60-icon sprite, and the entire 500-icon catalog. The project does not automatically split sprites by route; the 60-icon union is an input to this experiment.

Total gzip response bodies, in bytes, for the first page and both pages combined:

| Strategy | First | Both |
| --- | ---: | ---: |
| Inline | 51,586 | 54,696 |
| Sprite (60) | 52,481 | 53,674 |
| Sprite (500) | 73,589 | 74,783 |

First-page gzip JavaScript was 50,079 bytes inline and 46,849 bytes with either sprite.

Total counts compressed HTML, CSS, JavaScript and the sprite when requested. Each response is compressed separately. The 60-icon sprite moved 3,230 bytes out of JavaScript, but added 895 bytes to the initial download. The full catalog increased that initial total by 42.65%.

The second distinct page reused the scoped sprite. Across the two-page journey, total bytes fell by 1.87%. Repeating the first page alone did not create the same advantage: the inline version also reused its cached assets. The cache policy applied equally to JavaScript and SVG.

## Earlier text can hide later icons

I measured 15 samples per condition, covering a first visit, a repeat visit and, for the dashboard, navigation to the second page. These were document navigations with retained HTTP cache, rather than SPA route changes.

For the first dashboard page, median LCP went from 796 ms inline to 768 ms with the 60-icon sprite. A separate icon-geometry measurement went from 791 ms to 872 ms. The LCP element was text. It could paint while the icons still waited for their external resource.

The custom geometry measurement polls `getBBox()` after React commits, waits until every rendered icon has a nonempty box, and records the following animation frame. It measures resolved geometry, including icons below the fold. It does not identify the exact moment pixels become visible, and its polling can itself trigger layout.

I checked screenshots after measurement. The variants had identical pixels at the recorded viewport, which supports eventual visual equivalence, without establishing when each icon first appeared.

## Check what the source repository actually ships

The second experiment uses Cal.diy at [commit `56da01b`](https://github.com/calcom/cal.diy/tree/56da01b4b1664894b784aca636eccab0c56cc141). I copied its `Icon`, `IconSprites`, `classNames`, `IconGrid` and checked-in sprite into temporary Vite fixtures, with the relevant runtime dependencies pinned to the source lockfile. I left the Cal.diy checkout untouched.

My reference project points `<use>` directly at an external `sprite.svg#name`. Cal.diy's component points at `#name`; `react-inlinesvg` first fetches the sprite and injects its symbols into the document. That loader contributes to the runtime path being compared.

The source sprite contains 156 symbols and compresses to 7,925 bytes with gzip. The extracted showcase renders every name in regular and filled grids, giving 312 icon instances. It also reproduces the two sprite mounts present in the root layout and icon page.

For the first visit, gzip response bodies were:

| Strategy | JS (B) | Total (B) |
| --- | ---: | ---: |
| Injection | 60,994 | 69,712 |
| Inline | 61,848 | 62,639 |
| External | 53,682 | 62,406 |

Median timings are in milliseconds from navigation start. External means the experimental native file reference; injection is the original implementation.

| Strategy | LCP (ms) | Geometry (ms) |
| --- | ---: | ---: |
| Injection | 792 | 1,120 |
| Inline | 844 | 836 |
| External | 772 | 913 |

The original implementation shipped 1.38% less JavaScript than inline, while transferring 11.29% more total bytes. Text painted earlier, but icon geometry resolved later. With warm cache, geometry still took 412 ms for injection against 315 ms inline.

The native external variant removed 7,312 gzip bytes from the original JavaScript path, a reduction of 11.99%. That difference includes the omitted loader path and bundling effects; it is not an isolated package-size measurement. This variant changes a copied component for the experiment. I did not deploy a change to Cal.diy.

The original library fetched the sprite once, while the two mounts injected 312 symbol elements, two copies of the catalog. Request caching avoided a second download, but did not remove the second injected tree. Those DOM counts do not establish a memory saving for another strategy.

## Scope the source inventory

I also used a TypeScript AST inventory to find direct `Icon` calls in Cal.diy. It found 81 callsites in 43 files, including 22 distinct literal names. Dynamic values and wrapper props such as `StartIcon` and `EndIcon` were outside that inventory's resolution.

I used those 22 names as a diagnostic workload. Original injection transferred 11.03% more JavaScript and 25.26% more total bytes than inline, because the sprite strategies still fetched all 156 symbols. Those 22 icons are neither Cal.diy's complete usage nor a measured application route. The result shows how catalog scope can change the comparison; it does not describe a customer's page load.

## Conditions and reproduction

Both experiments ran in local headless Chromium with Playwright, HTTP/1.1 gzip responses, a 200,000-byte/s download limit, 150 ms configured latency and 4× CPU slowdown. They used 15 samples per condition, reversing fixture order on alternate rounds. The first experiment accounts for 195 navigations; the second accounts for 180. Brotli sizes were calculated over artifacts, while browser timings used gzip.

The runners check resource lists, response sizes, cache reuse, runtime errors and icon geometry. The source extraction also checks dependency versions, source hashes and the unchanged source checkout. I retained raw samples and reproduction instructions in the benchmark revision:

- [Synthetic report and commands](https://github.com/andre-lmarinho/typed-svg-sprite/blob/5d5079105dd92afeda024af1911ca7a4ca72aa13/docs/performance-analysis.md).
- [Cal.diy extraction report and commands](https://github.com/andre-lmarinho/typed-svg-sprite/blob/5d5079105dd92afeda024af1911ca7a4ca72aa13/docs/cal-diy-performance-analysis.md).
- [Recorded samples for both experiments](https://github.com/andre-lmarinho/typed-svg-sprite/tree/5d5079105dd92afeda024af1911ca7a4ca72aa13/docs/performance-results).

These are descriptive measurements without a statistical significance test. They do not measure a complete Next.js build, SSR, hydration, RSC payloads, CDN delivery or physical mobile hardware. The two experiments use different artwork and runtime inputs; their absolute totals are not one combined A/B comparison.

For an enterprise adoption decision, I would next use the application's compiled routes and actual navigation journeys, preserving its current tree shaking, chunking and cache policy. The measured benefit so far is conditional: a scoped sprite can reduce JavaScript and amortize its download across pages. The first visit can still transfer more bytes, and the icons can become ready later.
