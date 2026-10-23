# Styling conventions

Use this guide when composing UI, changing shared styles or adding interactions.
[global.css](./global.css) owns the tokens, declarations and responsive values;
this document explains how to choose and combine the patterns.

## Utilities and shared patterns

Use Tailwind utilities for local spacing, sizing and positioning. Extract a
shared CSS class when repeated markup represents the same responsibility;
inspect every matching use before choosing its scope. Compose independent
responsibilities rather than creating a class for each combination.

Name shared classes by UI role (`page-heading`, `section-heading`, `text-link`).
Use element selectors inside `.prose` for editorial HTML structure.

Keep reusable patterns in the components layer and preserve the existing layer
placement of interaction rules: moving a rule between layers changes its
priority relative to utilities.

## Links

| Pattern | Use |
| --- | --- |
| `.action-link` | Layout of standalone actions: inline flex, minimum height and vertical alignment. Navigation and social links also use it. |
| `.text-link` | Accent color, underline and hover treatment. Works on inline text and standalone actions. |
| `.prose a` | The same editorial appearance, applied contextually inside prose. |

```astro
<a href="/projects/turistar" class="text-link">my own product</a>
<a href="/projects" class="action-link text-link text-xs">All projects</a>
<a href="/about" class="action-link text-muted transition-colors hover:text-accent">
  About
</a>
```

Keep font size, gaps, wrapping and placement local. Icon-only footer links keep
their square target layout; sharing a visual role does not require identical
geometry. Links inside sentences remain inline so text wraps naturally.

## Pages and editorial content

- `.page-container` supplies the shared inner-page width, gutters and vertical
  spacing. Choose `article` or `section` from the content's semantics.
- `.page-heading` supplies the inner-page title typography; the home hero and
  404 display retain their distinct hierarchy.
- `.page-description` supplies the introductory text style for home, post and
  project detail pages. About's portrait introduction has its own typography.
- `.prose` supplies editorial rhythm and descendant styles for Markdown and
  narrative sections in About. It also adds section spacing and text color;
  use `.text-link` when only a link's appearance is needed.
- `.section-heading` shares section-title typography across home, related
  content and About's experience list. Section spacing stays local; `.prose`
  supplies its own contextual heading margins.

## Cards and motion

Each `.content-list` is an independent hover group. Hovering a `.content-row`
highlights that card and smoothly dims its peers. This treatment belongs to
cards, not buttons or text links. Keep the keyboard-focused card fully visible
and its focus indicator immediate, including while another card is hovered.

Gate hover effects to hover-capable, precise pointers and preserve the global
reduced-motion policy when adding transitions. Keep action feedback separate
from the card group's opacity behavior.

When changing a shared pattern, inspect all callers and verify inline links,
standalone actions, card groups and keyboard focus at mobile and desktop widths.
Update this guide when their responsibilities change; keep numeric values in CSS.
