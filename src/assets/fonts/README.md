# Site fonts

The WOFF2 files are exact copies of the font assets served by production commit
`8c14cd6`, without subsetting or conversion. They preserve the existing glyphs,
weights, character coverage, and rasterization. Archivo uses weights 400–600;
JetBrains Mono uses 400–500. Unicode ranges load only the subsets needed by each
page. Fallbacks use Arial/Liberation Sans for Archivo and Courier New/Liberation
Mono for JetBrains Mono, with matching vertical metrics, so text does not move
when the two preloaded Latin fonts arrive.

The three TTF files generate the social cards during the build. The font families
are [Archivo](https://github.com/Omnibus-Type/Archivo) and
[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), distributed under the
SIL Open Font License included here. The site makes no Google Fonts requests.
