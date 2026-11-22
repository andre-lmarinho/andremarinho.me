---
title: Engineering Skills
description: Three open-source agent skills for technical SEO, search content, and web accessibility, built around evidence and repeatable checks.
date: 2026-10-16
tags: AI agents, Developer tooling, Python, GitHub Actions, Accessibility, SEO
link: https://github.com/andre-lmarinho/skills
images:
  01-cover.webp:
    alt: Terminal card with the installation command and names of the three current skills
---

## Context

I built this collection around a simple rule: each review should use evidence that fits the question. A technical SEO audit must distinguish a page that can be fetched from one that is indexed. A content review checks whether claims are useful and supported. An accessibility review tests the interaction, not just its markup.

The repository now contains three independent skills: `technical-seo`, `search-content-review`, and `web-accessibility`. Each can be installed on its own through the Skills CLI, or used through the collection plugin.

## My role

I created and maintain the collection. I defined each skill's scope, wrote its workflows and reference files, checked the supporting sources, and implemented the Python validation and packaging scripts. I also set up plugin manifests, installation documentation and GitHub Actions for checks and releases.

## Scope

The skills turn those principles into distinct workflows:

- `technical-seo` follows public pages from source to HTTP response and rendered output, including crawling controls, metadata, social images and optional Markdown discovery.
- `search-content-review` checks whether a passage contributes useful information, supports its claims and remains accurate when read outside its surrounding page.
- `web-accessibility` reviews complete interactions using applicable WCAG criteria, browser behavior and assistive technology when available.

Each skill includes references for the parts of a review that need more detail. The current branch removed `engineering-docs` on November 22, 2026. The earlier [v0.1.0 release ZIP](https://github.com/andre-lmarinho/skills/releases/tag/v0.1.0) predates that change and contains the previous four-skill collection.

## Decisions

### Keep the workflow small and load detail by task

The main `SKILL.md` contains the decisions that apply throughout a review. Conditional details live beside it. For example, technical SEO has separate references for media and agent discovery; accessibility has checks grouped by the affected interface.

This lets each skill work alone, without making a review depend on the other skills or copying every supporting checklist into the main workflow. The [repository conventions](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/AGENTS.md) define that boundary.

### Preserve the authority and scope of each source

The source files distinguish standards, informative guidance, provider behavior and local review judgments. A technique demonstrated by one website does not become a requirement for every website.

The [technical SEO reference](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/skills/technical-seo/AGENT-DISCOVERY.md) treats `llms-full.txt` as a choice for a bounded reading task. The [accessibility checks](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/skills/web-accessibility/CHECKS.md) require checking a criterion's applicability and exceptions before reporting a failure.

### Test distribution separately from review quality

The validation workflow checks skill metadata and plugin manifests. Three [Python tests](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/scripts/test_package.py) check archive contents, synchronized versions and rejection of mismatched manifests or symlinks. These checks can catch a broken package; they cannot establish that an agent will make the right recommendation.

For changes to a skill's decisions, the contribution instructions require an independent agent to exercise a realistic task in a temporary workspace. Those evaluations are a review procedure; the repository does not contain a repeatable behavioral test suite.

### Automate releases from one source tree

The release workflow validates the repository, synchronizes the portable and Claude-compatible manifest versions, builds the ZIP, and pushes the release commit and tag atomically. It checks whether `main` changed during preparation and stops if the release would use an outdated base.

The [workflow](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/.github/workflows/release.yml) publishes GitHub releases. Official directory submissions still depend on their separate account and review processes. I kept those boundaries explicit in the [release documentation](https://github.com/andre-lmarinho/skills/blob/f8239030fb7e24444e42b53a08ce0aaeb06c2bd2/docs/releasing.md).

The implementation and its limits are covered in [the technical note on skill design and validation](/posts/engineering-skills-evidence-and-checks).
