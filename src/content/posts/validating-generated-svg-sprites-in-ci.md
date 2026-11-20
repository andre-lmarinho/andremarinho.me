---
title: "A type-safe SVG sprite is only safe if the generated files agree"
description: How to generate SVG symbols and TypeScript icon names from one catalog, validate the input, and catch stale artifacts in CI.
date: 2026-11-16
tags: SVG, TypeScript, Code Generation, CI
project: typed-svg-sprite
---

TypeScript can verify that `<Icon name="calendar" />` uses an allowed name. It cannot, by itself, verify that the SVG sprite served to the browser actually contains a `<symbol id="calendar">`. If the type file and the sprite are generated separately or one is stale, the component can typecheck while rendering no icon.

In [typed-svg-sprite](/projects/typed-svg-sprite), I generate both artifacts from one catalog and check the committed output in CI. The generator validates the input and produces stable output from the same icon set; CI fails if either committed artifact is out of sync.

## One catalog, two consumers

The source is a TypeScript array of Lucide icon IDs. The [generator](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/scripts/build-icons.mjs) reads that file as text rather than compiling or executing it. It removes comments, looks for the expected exported array and accepts string literals in lowercase kebab-case. It rejects empty lists, duplicates and malformed entries.

For every ID, it reads the corresponding SVG from `lucide-static`. It checks for a complete, nonempty outer SVG wrapper and extracts the inner markup. Read and validation failures are collected and reported before the generated files are written. The icons are then sorted by ID so that catalog ordering does not produce unnecessary changes in the output.

The result becomes both:

- `public/icons/sprite.svg`, containing one `<symbol>` per selected ID;
- `src/icon/icon-names.ts`, exporting the corresponding literal names and `IconName` type.

The generated type uses the standard literal-array pattern:

```ts
export const iconNames = ["calendar", "map"] as const;
export type IconName = (typeof iconNames)[number];
```

Those names are illustrative. `IconName` comes from the same generated list used for the sprite, rather than a second handwritten union.

## Determinism makes drift visible

The build runs icon generation before TypeScript and Vite. The [CI workflow](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/.github/workflows/ci.yml) installs dependencies, runs coverage, builds, then checks the generated files:

```sh
git ls-files --error-unmatch public/icons/sprite.svg src/icon/icon-names.ts
git diff --exit-code -- public/icons/sprite.svg src/icon/icon-names.ts
```

The first command matters because `git diff` alone does not report an untracked generated file as a difference. The second compares the regenerated tracked artifacts with the checked-out versions. If someone changes the catalog but forgets to commit the corresponding sprite or type file, the build changes those files and CI fails.

This check depends on stable inputs and output. Sorting the icons removes one source of nondeterministic ordering; the lockfile and clean installation constrain dependency versions for the CI run. A dependency upgrade can legitimately change the generated sprite and should appear in the diff for review.

## What the check does not prove

The workflow runs on pull requests and manual dispatch. It detects drift; it does not update the contributor's branch. It also cannot guarantee that a production server deploys the same artifact or that every browser displays every symbol correctly. Those require checks at different boundaries.

Parsing the catalog as text keeps the generator independent of a TypeScript runtime, but intentionally restricts its input format. A computed array or imported list is not supported by this parser. The generator's tests cover parsing and generation separately from CI's tracked-file check.

The [sprite loading benchmarks](/posts/svg-sprite-bundle-and-loading-benchmarks) address another tradeoff: a consistent sprite is not automatically the smallest or fastest delivery strategy. The generated-file contract makes names and symbols agree; the benchmark helps decide whether the delivery strategy fits a particular workload.
