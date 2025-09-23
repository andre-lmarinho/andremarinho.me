# Knowledge Base - Product & Domain-Specific Information

## Repo note for andremarinho.me

This repository hosts a single Next.js 15 App Router portfolio deployed to Vercel.

Linting and Formatting

- Run `npm run format:check` before committing documentation or code.
- Run `npm run lint:ci` to enforce lint rules with zero warnings.
- Use the Prettier Tailwind plugin defaults; do not hand-sort class names.

Development

- Install dependencies with `npm install`.
- Start the development server with `npm run dev` (http://localhost:3000).
- Use `npm run warmup` to prefetch `/`, `/about`, and `/studio` routes when simulating
  cached builds.

Database Setup

- No database is used. All copy, links, and metadata live in static TypeScript modules
  under `src/`.

PR Requirements

- Follow Conventional Commit prefixes (e.g., `feat:`, `fix:`, `docs:`).
- Always run `npm run verify` locally before requesting review.
- Attach screenshots for visual tweaks, covering both light and dark themes if the
  change affects theming.

Logging

- The site only reports anonymous analytics through Vercel integrations. Avoid adding
  noisy `console.log` statements or bundling logging utilities.

## When addressing issues in the andremarinho.me repository

Work from compiler output first. Run `npm run typecheck` to surface structural issues,
resolve them, then follow with `npm run lint:ci` and `npm run test:ci` to confirm the UI
behaves as expected. Because content is static, most regressions stem from incorrect
imports or broken props—trace these through the `@/` alias rather than rewriting
components.

## When creating pull requests

Keep changes scoped to a single feature or page. Document user-facing effects in the PR
body and mention any skipped checks. Include a brief summary of configuration updates
(such as edits to `src/config/seo.ts`) so reviewers understand site-wide impact.

## When developing Playwright tests in the andremarinho.me repository

Playwright is not part of this project. Coordinate with the maintainer before adding
end-to-end tooling and prefer expanding the Jest test suite under `__tests__/`.

## When fixing failing tests in the andremarinho.me repository

Use incremental fixes. Start by running `npm run test -- --watch` against the affected
file, update local fixtures or mocks, and keep assertions focused on rendered output.
Avoid snapshot churn—update snapshots only when UI changes are intentional and already
covered by screenshots.

## When implementing mock services in the andremarinho.me test files

Keep mocks colocated with their tests. Use `jest.mock` to stub configuration modules or
utility helpers and export lightweight fakes rather than deep mocks. If you need shared
fixtures (for example, social links), define them inside the test file to avoid leaking
non-production code into `src/`.

## When implementing mocks for andremarinho.me app-store integrations

There is no app store layer. If you must mock third-party APIs (such as external icon
providers), create TypeScript interfaces in the test and implement minimal objects that
satisfy the contract instead of importing unused packages.

## When implementing workflow triggers in the andremarinho.me repository

No workflow engine exists. Gate conditional rendering through simple booleans or config
flags inside the relevant component. Document any new toggle in `src/config/` and ensure
static generation still succeeds via `npm run build`.

## When making changes to Prisma schema in andremarinho.me

Prisma is not used. Store structured content as typed objects (for example, arrays of
projects or experience entries) under `src/config/`. Keep these serializable so static
builds remain deterministic.

## When reviewing PRs in the andremarinho.me repository

Focus on what the change delivers: summarize the affected routes, configuration files,
and tests. Flag missing screenshots or unchecked commands. Avoid re-litigating lint or
type failures if the `npm run verify` pipeline already reports them.

## When running Playwright tests in the andremarinho.me repository

Playwright runs do not apply. Stick to Jest commands. If you absolutely need browser
automation, discuss the scope first and extend `.agents/commands.md` accordingly.

## When running tests in the andremarinho.me repository

Run `npm run test` for the full suite or target a single file with `npm run test --
__tests__/headers.test.ts`. Use `npm run test:ci` before merging to replicate CI
settings. Tests run in a jsdom environment; if you need DOM APIs, rely on Testing
Library utilities instead of manually touching `document`.

## When working on calendar cache features in the andremarinho.me codebase

There are no calendar cache features. Do not introduce scheduling or persistence logic
without explicit direction. Keep the portfolio focused on static content and simple
animations.

## When working on PRs in the andremarinho.me repository

Push incremental commits to keep history readable. If a change grows beyond ~300 lines,
split it into follow-up tasks (for example, first adjust config, then add UI, then write
tests).

## When working on type issues in the andremarinho.me repository

Avoid `any`. Extend or create types under `src/types/` when data structures evolve, and
export them via named exports. Use TypeScript utility types like `Pick` or `Readonly` to
shape component props instead of duplicating definitions.

## When working on UI layout changes in the andremarinho.me web application

Navigation, footer, and theming live in `src/components/layout/`. Update both desktop and
mobile states when editing menu components. Page sections under `src/app/home/components`
and `src/app/about/components` share typography tokens—verify spacing across breakpoints
with the Tailwind responsive utilities. Always confirm light and dark themes via the
`ThemeSelector` component.

## When working on workflow triggers or similar enum-based features in the andremarinho.me codebase

The site does not expose workflow enums. If you need conditional sections, add explicit
boolean flags in the relevant config object and document their effect. Keep enums limited
to clearly defined UI variants.

## When working with app-store integrations in andremarinho.me

No integrations exist. External links (e.g., GitHub, LinkedIn) are defined in `src/app`
components—ensure they remain valid and open in new tabs with `rel="noopener
noreferrer"` safeguards.

## When working with branches in the andremarinho.me repository

Work directly on `main` in this environment unless instructed otherwise. If you create a
feature branch, rebase onto `main` before opening a PR to avoid noisy merge commits.

## When working with calendar events in the andremarinho.me codebase

Calendar logic is out of scope. Embed availability links via configuration rather than
building scheduling features.

## When working with CI/CD in the andremarinho.me repository

Local `npm run verify` mirrors the CI pipeline (`format:check`, `lint:ci`, `typecheck`,
`test:ci`, and `build:prod`). Vercel deployments run `npm run vercel:build`—if your
change needs additional build steps, add them to `package.json` scripts and document the
update in `.agents/commands.md`.

## When working with database models in andremarinho.me

There are no database models. Represent structured data with TypeScript types and export
readonly arrays or objects from `src/config/`.

## When working with generated files in the andremarinho.me repository

`next-sitemap` emits files under `public/` during `npm run postbuild`. Only commit
sitemap outputs when intentionally updating published metadata. Never commit `.next/`
artifacts.

## When working with git and CI systems

Commit locally, run the full `npm run verify` pipeline, then push before checking CI
status. CI only reports on pushed commits, so waiting without pushing wastes time.

## When working with imports/exports in the andremarinho.me codebase

Use the `@/` alias defined in `tsconfig.json` to avoid deep relative paths. Export values
explicitly from their source files and avoid default exports for shared components.

## When working with tRPC components in the andremarinho.me repository

tRPC is not part of this project. Server logic should remain inside Next.js server
components or future API routes. Discuss architectural shifts before introducing RPC
layers.

## When working with workflows or webhooks in the andremarinho.me repository

No workflows or webhooks are implemented. Keep forms static or rely on third-party tools
embedded via simple links.

## When adding new feature flags to the andremarinho.me repository

Feature flags are not in use. If you need conditional rollout, add typed config toggles
and remove them once the feature is stable.

## When adding new UI elements or text strings to andremarinho.me

Keep copy in English and update shared metadata in `src/config/seo.ts` when text changes
affect multiple pages. Component-level strings should live alongside the component to
simplify localization later.

## When creating a pull request

### Title

Use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`). Be descriptive:
`feat: add studio page projects carousel` is better than `feat: update home`.

### Size Limits

Avoid large PRs (>500 lines or touching more than ~10 files). If a change grows too
large, split it into sequential PRs (config → UI → tests) so reviewers can focus on one
concern at a time.

## When handling errors

### Descriptive Errors

```typescript
// ✅ Good - Provide context for failure
throw new Error(`Failed to load project card: missing slug for ${projectTitle}`);

// ❌ Bad - Generic message with no action
throw new Error('Render failed');
```

### Error Types

```typescript
// ✅ Good - Extend built-in errors for clarity
class MissingSocialLinkError extends Error {
  constructor(platform: string) {
    super(`Social link for ${platform} is not configured`);
  }
}

// ❌ Bad - Swallow the error or cast to any
const err = new Error('Unknown');
(err as any).code = 'IGNORE';
```

## Basic Performance Guidelines

- Prefer static generation and avoid marking components as client unless interaction is
  required.
- Use `next/image` for local assets and provide explicit `width` and `height` values.
- Keep bundle size small by avoiding heavy dependencies; rely on Tailwind utilities and
  `classix` helpers already in use.

## When querying database

There is no database layer. Fetch data from configuration files during build time or via
static imports only.

## Avoid barrel imports

Do not create `index.ts` barrels that re-export entire directories. Import components
from their concrete paths (e.g., `@/components/layout/Footer`). This keeps tree-shaking
reliable and makes future refactors easier.

## File Naming Conventions

### Repository Files

- Components use PascalCase (e.g., `HeroSection.tsx`).
- Tests mirror the component with `.test.tsx` or `.test.ts` suffixes.

### Service Files

- Utility helpers use kebab-case (e.g., `format-date.ts`).
- Scripts under `scripts/` stay in kebab-case Bash files.

### General Files

- Types live in `src/types/` and use PascalCase filenames ending with `.types.ts` when
  exporting multiple related interfaces.
- Keep CSS modules or global styles in `.css` files colocated with the owning route.

## When using Day.js

Day.js is not installed. Prefer native `Date` APIs combined with `Intl.DateTimeFormat` or
lightweight helpers if formatting becomes complex.

## Next.js App Directory: Authorisation Checks in Pages

### TL;DR:

- Perform permission checks inside the relevant `page.tsx` or server component.
- Redirect unauthenticated visitors before rendering sensitive sections.
- Layouts should only contain shared chrome, not authorization logic.

### Why Not to Use Layouts for Permission Checks

Layouts wrap multiple routes. Authorization inside a layout risks leaking protected data
while the component tree renders. Keeping checks at the page level ensures you guard each
entry point explicitly.

### ✅ How To Secure Routes (The Right Way)

1. Fetch the session or authorization context inside `page.tsx`.
2. Validate access before performing data fetching or rendering protected content.
3. Use `redirect('/')` or return a safe fallback when access fails.

### 🛠️ Example: Page-Level Permission Check

```tsx
// app/admin/page.tsx

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/auth';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return <div>Welcome, Admin!</div>;
}
```

### 🧠 Key Reminders

- Put guards directly inside each restricted `page.tsx`.
- Validate the user before running expensive logic.
- Never assume shared layouts prevent unauthorized rendering.

## Avoid using Dayjs if you don’t need to be strictly tz aware.

Rely on the platform `Date` object and `Intl` utilities for most formatting. If you need
start/end-of-day calculations, compose helper functions or adopt lightweight libraries
such as `date-fns`. Avoid bundling Day.js unless strict timezone manipulation becomes a
hard requirement.
