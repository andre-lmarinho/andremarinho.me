# Knowledge Base - Product & Domain-Specific Information

## Repository overview for andremarinho.me

- Personal portfolio built with Next.js 15 App Router, React 19, Tailwind CSS 4, and TypeScript.
- All data is static and sourced from TypeScript configuration files under `src/config/`; there is no runtime database or API layer.
- Deployments target Vercel using the same build commands defined in `package.json`.

## Tooling & workflow essentials

### Linting & formatting
- Run `npm run lint:ci` to enforce zero-warning lint checks across `src/` and shared setup files.
- Verify formatting with `npm run format:check` before committing.
- Keep documentation, comments, and commit messages in English.

### Development environment
- Install dependencies with `npm install` and start local development via `npm run dev`.
- Use Node.js 20.x LTS to mirror CI and Vercel.
- `.env.local` is optional; the project does not require secrets for local development.

### Content sources
- Portfolio copy, metadata, and experience timelines live in `src/config/`.
- Shared UI building blocks are in `src/components/`; favor composition over duplicating markup.
- Utility helpers belong in `src/utils/`; add tests alongside new helpers when logic is non-trivial.

### Deployment
- `npm run vercel:build` replicates the production build used by Vercel.
- `npm run postbuild` generates sitemap assets; commit outputs only when the project intentionally tracks them.
- Run `npm run lhci` to audit performance when introducing new dependencies or significant UI changes.

## Working on issues
- Resolve type errors first with `npm run typecheck`, then address lint issues via `npm run lint`.
- Once the codebase is clean, run `npm run test` and finish with `npm run vercel:build` to confirm end-to-end stability.

## Pull requests
- Summarize user-facing impact, link related issues, and include light/dark screenshots for visual changes.
- Execute `npm run verify` before requesting review; mention any steps you intentionally skipped.
- Keep PRs focused and under ~300 changed lines where possible to simplify review.

## Testing practices

### Running tests
- Use `npm run test` for the full Jest suite; target a specific file with `npm run test -- path/to/file.test.tsx`.
- Run `npm run test:ci` prior to merging substantial changes to mimic the CI environment.

### Fixing failing tests
- Iterate with watch mode using `npm run test -- --watch`.
- Treat snapshot updates cautiously—review diffs and update via `npm run test -- --updateSnapshot` only when the UI change is intentional.

### Mocking strategies
- Mock modules or data with lightweight fixtures using `jest.mock` and inline helpers.
- Keep mocks colocated with their tests to maintain clarity and avoid leaking test-only utilities into production code.

## Type safety
- Treat TypeScript errors as blockers. Avoid `any`; prefer discriminated unions or tagged types for variant-heavy components.
- Extend shared type definitions in `src/types/` (create new files as needed) when configuration schemas evolve.

## UI & content guidelines
- Leverage Tailwind utility classes for spacing, typography, and responsive behavior.
- Validate new components in light and dark themes across mobile, tablet, and desktop breakpoints.
- Use `next/image` for local media and provide explicit width/height for optimal performance.
- Write copy in English and keep tone consistent with the existing portfolio. Update `src/config/metadata.ts` or related config when text changes globally.

## Code conventions

### Imports & module structure
- Prefer the `@/` path alias defined in `tsconfig.json` over deep relative imports.
- Avoid barrel files that obscure concrete module paths:

```typescript
// ❌ Bad - Avoid central index barrels that hide concrete module paths
import { Header, Footer } from '@/components';

// ✅ Good - Import components directly
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
```

### File naming
- Components: PascalCase (e.g., `HeroSection.tsx`).
- Utilities: kebab-case (e.g., `format-date.ts`).
- Types: PascalCase with a `.types.ts` suffix when exporting multiple related types (e.g., `Project.types.ts`).
- Tests: mirror the source filename with `.test.tsx` or `.test.ts`.
- Scripts in `scripts/` use kebab-case (e.g., `warmup.sh`)—document their usage when adding new ones.

### Error handling
- Prefer descriptive error messages that clarify the failing action and expected state.
- Use fallback UI or early returns instead of throwing errors in server components for recoverable scenarios.
- Guard external links with `rel="noopener noreferrer"` when `target="_blank"` is used.

### Performance
- Favor static generation and `generateMetadata` for SEO data where possible.
- Avoid unnecessary client components; add `"use client"` only when interactivity is required.
- Run Lighthouse audits (`npm run lhci`) after introducing heavy assets or dependencies.

## Git & branching
- Work directly on `main` in this environment unless instructed otherwise.
- Keep commits imperative (e.g., `feat: add speaking engagements section`) and check `git status` before finishing a task.
- Do not commit local environment or build artifacts.

## Generated artifacts
- Exclude `.next/` from version control.
- Sitemap files generated under `public/` should only be committed when explicitly required by the project.

## Authorization & access control
- The site currently serves only public pages. If you introduce restricted sections, perform authorization checks inside the relevant `page.tsx` or server component rather than in shared layouts.
- Fetch the current session inside the route handler, redirect unauthorized users with `redirect('/')`, and avoid preloading sensitive data before validating access.

## Out-of-scope features
- No databases, Prisma schemas, or ORM layers are part of this project—persist data via typed configuration files instead.
- No Playwright or other end-to-end suites are configured; align new testing tools with the existing npm script structure before adoption.
- No app-store integrations, webhooks, or workflow automation exist today. Discuss with maintainers before introducing external services and document new commands in `.agents/commands.md`.
- No feature flag infrastructure is provided; use simple configuration toggles when conditional rendering is required.
- Day.js is not included. Use native `Date` APIs or lightweight utilities such as `Intl.DateTimeFormat` to keep bundles lean.
