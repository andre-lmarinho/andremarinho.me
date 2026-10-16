# Site fonts

These are the Latin WOFF2 files previously served by `next/font/google`, with
unused weight ranges removed using FontTools 4.67.0. They retain the existing
Latin character coverage and default shaping features. Both families cover
weights 400–600, including bold Markdown text. The SIL Open Font Licenses are
included alongside the files.

| Font | Version | Original Latin WOFF2 | Shipped WOFF2 |
| --- | --- | ---: | ---: |
| Archivo | 2.001 | 34,940 bytes | 22,704 bytes |
| JetBrains Mono | 2.211 | 31,340 bytes | 28,368 bytes |

Source families: [Archivo](https://github.com/Omnibus-Type/Archivo) and
[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono).

FontTools processing: `instantiateVariableFont(font, {"wght": (400, 600)})`,
then the default `subset.Subsetter`, populated with every Unicode code point in
the original font's best cmap. Export as WOFF2. Keep the licenses when updating.
These files are committed assets; the application build needs no font tooling
or Google Fonts requests.
