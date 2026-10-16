---
title: Engineering Skills
description: Four open-source agent skills for engineering documentation, technical SEO, content review and web accessibility, with scoped sources and automated plugin releases.
date: 2026-10-16
tags: AI agents, Developer tooling, Python, GitHub Actions, Accessibility, SEO
image: /images/projects/skills.webp
kind: open source
link: https://github.com/andre-lmarinho/skills
---

## Context

An agent reviewing documentation needs to check commands against the implementation. An accessibility review needs to exercise the interaction. A search audit needs to distinguish a page that can be fetched from one that has actually been indexed. These tasks need different evidence, even when they happen in the same repository.

I built Engineering Skills to make those review decisions reusable across projects. The collection has four independently installable skills: `engineering-docs`, `technical-seo`, `search-content-review` and `web-accessibility`.

## My role

I created and maintain the collection. I defined each skill's scope, wrote its workflows and reference files, checked the supporting sources, and implemented the Python validation and packaging scripts. I also set up plugin manifests, installation documentation and GitHub Actions for checks and releases.

## Scope

The skills cover different engineering tasks:

- `engineering-docs` checks what an engineer needs to do or understand, preserving contracts such as defaults, precedence and failure behavior while shortening the prose.
- `technical-seo` follows public pages from source to HTTP response and rendered output, including crawling controls, metadata, social images and optional Markdown discovery.
- `search-content-review` checks whether a passage contributes useful information, supports its claims and remains accurate when read outside its surrounding page.
- `web-accessibility` reviews complete interactions using applicable WCAG criteria, browser behavior and assistive technology when available.

Each skill includes its own references. Users can install one through the Skills CLI or install the collection as a plugin. The public repository also provides a [versioned release ZIP](https://github.com/andre-lmarinho/skills/releases/tag/v0.1.0). That October 15 release predates the October 16 revisions linked in this case.

## Decisions

### Keep the workflow small and load detail by task

The main `SKILL.md` contains the decisions that apply throughout a review. Conditional details live beside it. For example, technical SEO has separate references for media and agent discovery; accessibility has checks grouped by the affected interface.

This lets each skill work alone. A documentation review does not require installing the search or accessibility skills, and the main workflow does not reproduce every supporting checklist. The [repository conventions](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/AGENTS.md) define that boundary.

### Preserve the authority and scope of each source

The source files distinguish standards, informative guidance, provider behavior and local review judgments. A technique demonstrated by one website does not become a requirement for every website.

The [technical SEO reference](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/skills/technical-seo/AGENT-DISCOVERY.md) treats `llms-full.txt` as a choice for a bounded reading task. The [accessibility checks](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/skills/web-accessibility/CHECKS.md) require checking a criterion's applicability and exceptions before reporting a failure.

### Test distribution separately from review quality

The validation workflow checks skill metadata and plugin manifests. Three [Python tests](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/scripts/test_package.py) check archive contents, synchronized versions and rejection of mismatched manifests or symlinks. These checks can catch a broken package; they cannot establish that an agent will make the right recommendation.

For changes to a skill's decisions, the contribution instructions require an independent agent to exercise a realistic task in a temporary workspace. Those evaluations are a review procedure; the repository does not contain a repeatable behavioral test suite.

### Automate releases from one source tree

The release workflow validates the repository, synchronizes the portable and Claude-compatible manifest versions, builds the ZIP, and pushes the release commit and tag atomically. It checks whether `main` changed during preparation and stops if the release would use an outdated base.

The [workflow](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/.github/workflows/release.yml) publishes GitHub releases. Official directory submissions still depend on their separate account and review processes. I kept those boundaries explicit in the [release documentation](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/docs/releasing.md).

The implementation and its limits are covered in [the technical note on skill design and validation](/posts/engineering-skills-evidence-and-checks).
