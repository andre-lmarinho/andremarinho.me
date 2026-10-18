---
title: typed-svg-sprite
description: A React SVG sprite reference implementation that generates icon names and symbols from one validated list, with a Node.js build step and a typed component API.
date: 2026-08-18
tags: TypeScript, React, SVG, Code generation, Vite
kind: developer tooling
link: https://github.com/andre-lmarinho/typed-svg-sprite
---

## Context

An SVG sprite needs an agreement between the IDs in the asset and the names accepted by the component. Maintaining those lists separately leaves room for a valid TypeScript call to reference a symbol that does not exist.

I built typed-svg-sprite as an open-source reference implementation of that agreement, with a React and Vite showcase. The repository can be copied and adapted; it is not a published npm package. The approach was inspired by [calcom/cal.diy](https://github.com/calcom/cal.diy), and I wrote this implementation independently.

## My role

I implemented the Node.js generator, React component, showcase, and tests, along with the GitHub Pages deployment and CI checks for the generated artifacts.

## Scope

- Select Lucide icon IDs in a TypeScript source file.
- Generate an SVG sprite and an `IconName` union from the validated selection.
- Export `Icon`, `iconNames`, and `IconName` through one component entry point.
- Support decorative icons and named images, SVG properties, inherited color, and configurable size.
- Run the same showcase under the repository's GitHub Pages subdirectory.

The [live showcase](https://andre-lmarinho.github.io/typed-svg-sprite/) renders the selected icons and a usage example.

## Decisions

### Validate inputs before replacing generated files

The [generator](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/scripts/build-icons.mjs) reads `icon-list.ts` as text. It accepts a deliberately limited array of string literals, strips comments, and rejects malformed IDs, duplicates, and an empty selection. It does not execute the file or support arbitrary TypeScript expressions.

The next step reads every selected SVG from `lucide-static` and checks for a complete `<svg>` wrapper with a nonempty body. This is a check of the expected package input, not a general SVG parser or sanitizer. Only after all inputs pass does the generator write `sprite.svg` and `icon-names.ts`. A missing icon therefore leaves the previous artifacts intact. The two writes are not a filesystem transaction: an I/O failure during output can still leave an incomplete pair.

Sorting the validated icons before rendering gives both outputs the same order. Reordering the input list does not create an unrelated generated diff.

### Derive runtime names and types from the same output

The generator emits an `iconNames` array with `as const` and derives its type directly:

```ts
export type IconName = (typeof iconNames)[number];
```

The same validated icon records supply the sprite's symbol IDs. The component accepts `name: IconName`, so TypeScript checks a caller against the names generated for that asset. Untyped input still needs validation by its caller.

The [generator tests](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/scripts/build-icons.test.mjs) compare the checked-in symbol IDs and generated names with the source list, test failed generation without overwriting previous output, and compare fresh generation with the committed artifacts. The [CI workflow](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/.github/workflows/ci.yml) also rebuilds and checks for changes in those files.

### Keep SVG generation in the build

At runtime, [the component](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/src/icon/Icon.tsx) renders an `<svg>` containing a `<use>` reference. `lucide-static` supplies artwork during generation; React remains a runtime dependency.

The sprite is a separate cacheable asset. Its transfer cost depends on the selected icons, hosting headers, and the browser's cache. A large sprite also makes the browser fetch selected symbols the current page may never display. I have not benchmarked this implementation against other icon setups.

The asset URL uses Vite's `BASE_URL`. That matters on GitHub Pages: `/icons/sprite.svg` would address the domain root, while this app is served below `/typed-svg-sprite/`.

### Make the icon's purpose explicit

An unlabeled icon defaults to `aria-hidden`, `focusable="false"`, and a presentation role. Providing `aria-label` or `aria-labelledby` exposes it as an image. For an icon inside a button, the button still needs its own understandable action name.

The [component tests](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/src/icon/Icon.test.tsx) cover those semantics, explicit overrides, and the generated asset path. They do not establish behavior across screen readers.

## Evidence and licensing

The [public source](https://github.com/andre-lmarinho/typed-svg-sprite) includes the generator, component, showcase, and tests. The links above identify the revision described here.

My code is MIT licensed. Lucide artwork retains its ISC and applicable Feather MIT notices in the [distributed third-party notice](https://github.com/andre-lmarinho/typed-svg-sprite/blob/88dab66d56c6b59de2f39753bc0316f39b596b50/public/THIRD_PARTY_NOTICES.txt).
