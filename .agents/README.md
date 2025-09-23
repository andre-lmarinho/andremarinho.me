# andremarinho.me Development Guide for AI Agents

This directory contains comprehensive documentation for AI agents working on the andremarinho.me codebase.

## Quick Navigation

- **[Commands](commands.md)** - Build, test, and development commands
- **[Knowledge Base](knowledge-base.md)** - Knowledge base & best practices
- **[Architecture Overview](#architecture-overview)** - System structure and patterns

## Getting Started

andremarinho.me is a statically generated Next.js 15 personal site built with React 19, Tailwind CSS, and TypeScript. The project uses npm scripts for all developer workflows.

### Key Directories

- `src/app/` - App Router layouts, routed pages, and global providers
- `src/components/` - Reusable UI components, layouts, and sections
- `src/config/` - Metadata, SEO, and portfolio content configuration
- `src/utils/` - Shared helpers for formatting and rendering
- `__tests__/` - Jest and Testing Library test suites
- `public/` - Static assets and icons served by Next.js
- `scripts/` - Utility scripts (e.g., warmup) used in CI and local tooling

## Architecture Overview

### Database Layer

- There is no runtime database. Content is sourced from static configuration files under `src/config/`.
- Any dynamic data should be modeled as TypeScript objects and loaded at build time.
- Keep content serializable so static generation and Vercel builds remain deterministic.

### API Layer

- No custom API routes are currently defined; all content is rendered through server and client components.
- If you add server actions, colocate them with the relevant route segment and ensure they remain side-effect free during prerendering.
- Avoid introducing persistent stateful services; rely on static data or fetch from trusted public APIs at build time only.

### Frontend

- Uses the Next.js App Router with React Server Components by default.
- Styling is handled with Tailwind CSS and the `prettier-plugin-tailwindcss` ordering.
- Dark/light theming is controlled via `next-themes`; respect the theme provider when adding new components.
- SEO metadata is centrally managed in `src/config/metadata.ts` and consumed by the App Router layout.

## Common Patterns

### Error Handling

- Prefer early returns or fallback UI components for missing data instead of throwing errors in server components.
- Use Next.js `not-found.tsx` and `error.tsx` patterns when adding new routes that need custom error boundaries.
- Guard external links with `rel="noopener noreferrer"` when using `target="_blank"`.

### Performance

- Keep generated bundles small by favoring static generation and avoiding unnecessary client components.
- Use `next/image` for local assets and provide explicit width/height to leverage image optimization.
- Memoize expensive computations with `useMemo` or move them to server components.
- Avoid adding large third-party libraries; prefer lightweight utilities or native browser APIs.

### Security

- Never commit secrets or API keys; environment configuration belongs in local `.env` files ignored by git.
- Sanitize external URLs before rendering them and prefer the `URL` constructor for validation.
- Only expose whitelisted data from configuration files when mapping over collections.
- Ensure any Markdown or HTML content passed to components is sanitized before rendering with `dangerouslySetInnerHTML`.

## Testing Strategy

- **Unit and component tests** run with Jest and React Testing Library. Place shared tests in `__tests__/` or next to the component.
- **Type safety** is enforced via `npm run typecheck`; treat any TypeScript error as a failing build.
- **Linting** uses ESLint with the Next.js plugin and Tailwind rules; run `npm run lint` before committing.
- For UI changes, add or update tests to cover critical rendering logic and accessibility states.

## Pull Request Guidelines

For large PRs (>500 lines or touching multiple feature areas):

- Split changes logically (e.g., configuration updates, component work, styling tweaks, tests) and merge incrementally.
- Keep commits focused and use imperative English commit messages (e.g., `feat: add experience timeline section`).
- Always run `npm run verify` before requesting review to ensure linting, type checks, tests, and builds pass locally.
- Provide screenshots or recordings for significant visual changes, including both light and dark themes when relevant.
