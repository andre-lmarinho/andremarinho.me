# Working in this repository

André Marinho's personal site, blog and portfolio, built with Astro,
TypeScript and Tailwind CSS, deployed on Vercel. Keep content pages
prerendered unless the approved task requires server execution.

## Scope and authorization

- For investigation, review or planning requests, inspect the project and
  present findings or a proposed plan. Wait for explicit approval before
  implementing the proposed changes.
- Answers to planning questions settle requirements; they do not authorize
  execution of the entire plan. A direct request to implement, fix or write
  something authorizes that specific work.
- Complete authorized work without asking again for routine implementation
  choices. Bring material changes to the agreed scope back to the user.
- Preserve existing work, including implementations awaiting review. Treat
  uncommitted changes as pending work, not as approved architectural decisions.

## Project context

Read the domain documentation described under **Agent skills** before
exploring the codebase. Use `README.md` for onboarding and content conventions.
Check the files that own the behavior before relying on descriptive docs:

- `package.json`: available commands and package manager version.
- `.github/workflows/ci.yml`: CI checks and Node.js version.
- `astro.config.mjs` and `vercel.json`: build and deployment behavior.
- `src/content.config.ts`: post and project frontmatter schemas.
- `tsconfig.json` and `biome.json`: TypeScript, imports and formatting rules.

Keep this file focused on durable instructions. Record feature decisions
and operational procedures in their own documents rather than accumulating
task history here.

## Implementation

- Before changing shared styles, UI composition or interactions, read
  `src/styles/README.md` for the styling conventions.
- Follow the existing Astro component structure, content helpers and style
  tokens. Reuse the project's components before adding alternatives.
- Use TypeScript with the existing strict configuration and `@/` import alias.
  Let Biome enforce formatting and import order.
- Keep browser code in `src/scripts/` and server credentials in server code.
  Account for initialization and cleanup across Astro client navigation.
- When changing content or slugs, check publication rules, linked projects,
  canonical URLs and Markdown routes. Preserve keyboard access and reduced
  motion behavior when changing interactions.
- Prefer a focused change using existing dependencies. Explain the need for
  a new dependency or runtime requirement as part of its review.

## Validation

Use pnpm from the repository root. Consult `package.json` for script details.

- Run `pnpm lint` and `pnpm typecheck` for code changes.
- Run `pnpm test` for behavior changes; add or update tests that verify the
  behavior at risk. Documentation-only edits need link and diff checks.
- Run `pnpm build` when changing routes, Astro components, configuration or
  dependencies. Run `pnpm lighthouse` after building when the change affects
  page loading, layout or accessibility.
- Verify the affected flow in the browser when behavior depends on navigation,
  visibility or environment. A successful build alone does not verify it.
- Distinguish mocks, local checks and real service checks in the report. State
  what remains unverified and report failures rather than weakening checks.

## Credentials and external data

- Keep secrets out of tracked files, browser bundles, logs and reports. Inspect
  configuration names without printing credential values.
- Use read-only credentials for inspection when available. Use mocks or isolated
  test data to verify writes; production visits, counters and analytics must
  not receive synthetic test traffic.
- Obtain explicit authorization before modifying production data, deleting
  external resources, deploying or publishing. Access to credentials alone
  does not authorize these actions.

## Reviews and Git

- Keep unrelated concerns in separate reviews. Make dependencies and shared
  files explicit; do not describe patches as independent without checking.
- Preserve the user's staging arrangement. Stage, unstage, commit or publish
  only when requested, and restrict the operation to the requested scope.
- Before handing off, inspect the final diff for unrelated changes and check
  for whitespace errors. Summarize the resulting behavior, checks performed
  and remaining limitations.

## Agent skills

### Issue tracker

Use GitHub Issues in `andre-lmarinho/me`.
Read `docs/agents/issue-tracker.md` before issue operations.

### Triage labels

Read `docs/agents/triage-labels.md` before triaging issues.

### Domain docs

Single-context layout. Before exploring the codebase,
read `docs/agents/domain.md`.
