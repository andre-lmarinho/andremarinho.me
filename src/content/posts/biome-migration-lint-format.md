---
title: "Migrating from ESLint and Prettier to Biome: what the benchmark missed"
description: A Next.js migration to Biome cut local lint and format time, but also changed CI coverage, formatting, and accessibility tests. Here's what I'd check before switching.
date: 2026-11-10
tags: Biome, ESLint, Prettier, CI, Developer Tooling
project: turistar
---

When I replaced ESLint and Prettier with Biome in [Turistar](/projects/turistar), the local checks became much faster. In a later comparison, lint went from 2.21 seconds to 0.19 seconds and the combined quality gate went from 6.50 seconds to 0.99 seconds.

The [actual pull request](https://github.com/andre-lmarinho/turistar/pull/368) changed more than the tool running the checks. It changed which files CI inspected, introduced different formatting choices, and removed `jest-axe` tests along with the old dependencies. A follow-up had to clean up hundreds of diagnostics before the new checks could be applied across the project.

Before comparing speed, establish what the existing checks protect. A faster gate can also be a weaker one.

## The old and new gates did different work

Turistar is a Next.js application using TypeScript and React. Before the migration, ESLint used the Next.js recommended and Core Web Vitals rules, a TypeScript parser, and React and React Hooks plugins. Prettier handled formatting, including a Tailwind plugin configured for `cva` calls.

The migration introduced Biome 2.3.10 and changed the package scripts to:

```json
{
  "format": "biome format --write .",
  "lint": "biome check .",
  "typecheck": "tsc --noEmit"
}
```

The [new configuration](https://github.com/andre-lmarinho/turistar/blob/6e023dddd0d0b175dd8136ad4609e52451738102/biome.json) enabled recommended rules and the React and Next domains. TypeScript checking remained a separate command. Combining lint and formatting under Biome did not turn `biome check` into a replacement for `tsc`.

The pre-commit setup also changed. Previously, `lint-staged` ran Prettier and ESLint fixes on staged JavaScript and TypeScript files. Afterward, it ran `biome check --write` on those files and formatted staged JSON. The Biome command treated warnings as errors unless `SKIP_WARNINGS` was enabled. Those are enforcement choices, separate from the rules themselves.

### Preserve architecture rules explicitly

The Biome configuration added restricted-import patterns for module boundaries. For example, code under `src/shared` could not import from `@/features/**` or `@/app/**`; code under `src/features` could not import from `@/app/**`.

This is the kind of rule I would check independently during any linter migration. A linter can report unused variables and still allow dependencies to cross a boundary the architecture relies on. The useful question is not whether both tools have a rule called `noRestrictedImports`; it is whether the configured patterns, file scopes, and severity enforce the intended boundary.

Biome's [migration documentation](https://biomejs.dev/installation/migrate-from-other-tools/) notes that translated or inspired rules may not behave exactly like their ESLint counterparts. For a rule that matters, I would test a deliberately invalid import in the affected directory as well as an allowed import outside it. I did not preserve such a side-by-side rule parity test for this migration.

## Formatting changes are part of the diff

The previous Prettier configuration specified single quotes, a print width of 100, and the Tailwind plugin. The new Biome configuration specified double quotes, a line width of 110, and no equivalent Tailwind plugin in that setup. The PR also enabled parsing for Tailwind directives and CSS modules.

Those differences matter in review. A formatter change can produce a large diff even when application behavior stays the same. A removed plugin can also stop performing a transformation the team expects. I would separate the mechanical formatting commit from changes to application logic and inspect representative output, including Tailwind class handling, rather than assuming migrated settings produce identical files.

The migration tools in Biome's documentation can translate configuration, but their output still needs review. They were not evidence that this historical PR preserved every Prettier or ESLint behavior.

## Changed-files linting left a gap

Before the switch, CI ran the project's lint script over the repository. The migration changed the CI step to obtain changed paths from Git and run Biome against those paths:

```sh
git diff --name-only --diff-filter=ACMRT -z "$base" "$head" |
  xargs -0 -r npx biome check
```

The workflow selected base and head SHAs from the pull request or push event, and fell back to `biome check .` if either was missing. The command used NUL-delimited paths, so spaces in file names would not split arguments. It excluded deleted files from the check, which is sensible when the tool needs files that still exist.

The tradeoff was scope: a green changed-files run did not establish that the rest of the repository passed the new rules. The follow-up [cleanup PR](https://github.com/andre-lmarinho/turistar/pull/377) addressed 578 errors and 65 warnings. In hindsight, I would run the full new gate before relying on it to block merges, fix the baseline, and then decide whether changed-file checks offer enough benefit to justify maintaining two scopes.

Changed-file checks can be useful for incremental adoption, but they need an explicit end state. Otherwise, old violations remain outside the gate until a later change happens to touch those files.

## The accessibility tests were a separate loss

The migration also removed `jest-axe`, its matcher setup, and several accessibility test files. Those tests were not ESLint or Prettier. Removing them was a loss of automated accessibility assertions, not a necessary consequence of choosing Biome.

This is why I would inventory checks by _purpose_ before removing packages: lint rules, formatting, typechecking, unit and integration tests, accessibility assertions, and build checks. A new linter may cover some static accessibility rules; that does not establish equivalence with tests that run assertions against rendered components. Conversely, keeping `jest-axe` would not prove the interface accessible to keyboard or screen-reader users. Each check has its own scope.

For this migration, the dependency cleanup and test removal were in the same PR as the tooling change. Reviewing those as separate decisions would have made the lost coverage harder to miss.

## What the timing comparison says

The comparison was run on August 11, 2026, using worktrees from before and after the migration against the same code. I ran five iterations with cache cleared between rounds and recorded the best time for each operation.

| Check         | Before |  After |        Ratio |
| ------------- | -----: | -----: | -----------: |
| Lint          | 2.21 s | 0.19 s | 11.4× faster |
| Format check  | 4.28 s | 0.16 s | 27.0× faster |
| Combined gate | 6.50 s | 0.99 s |  6.6× faster |

The file scopes were close but not identical: ESLint checked 416 files, Prettier 425, and Biome 421, in a project with roughly 421 TypeScript and TSX files. The best of five runs is not a median, and the different rule sets mean these are timings for the configured commands, not an equal-work benchmark. The combined gate is its own measurement; it should not be reconstructed by adding the two rows above it.

A separate CI change recorded a reduction from 104 to 79 seconds by parallelizing jobs. I would not attribute that result to the linter switch. Nor do the local timings measure editor responsiveness or saved developer time across a team.

## How I would approach the switch now

For a project considering ESLint and Prettier versus Biome, I'd compare the contracts in this order:

1. **List the current checks and their scope.** Include plugin behavior, warning policies, generated or ignored files, tests, and editor integration. A dependency list alone does not tell you which guarantees are in use.
2. **Run the candidate against the whole repository.** Record diagnostics before making it a merge gate. Decide which rules to keep, change, or replace, and test important architectural boundaries with examples.
3. **Review formatting separately.** Compare output for real files, including conventions supplied by plugins. Isolate the mechanical diff so it does not hide behavior changes.
4. **Preserve checks outside the linter.** Keep accessibility tests and typechecking unless there's a separate decision to replace them. Verify the replacement before removing the old check.
5. **Measure the actual workflow.** Compare matched file scopes and report the rule differences, cache conditions, and statistic. Local lint time and total CI time answer different questions.

Biome made this project's local checks faster and reduced the tooling involved. The migration also showed that a successful command and a green CI run do not tell you, on their own, whether the new pipeline checks the same things as the old one.
