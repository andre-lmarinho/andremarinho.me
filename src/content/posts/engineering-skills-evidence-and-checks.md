---
title: Designing agent skills around evidence and checks
description: How I split engineering reviews into four agent skills, kept source authority explicit, and separated packaging tests from checks of agent behavior.
date: 2026-10-16
tags: AI agents, Developer tooling, Python, GitHub Actions, Testing
project: skills
---

A skill can contain correct advice and still produce an unhelpful review. The agent can apply a rule to the wrong surface, mistake a checklist for a standard, or report a passing result after inspecting only the source.

I built [Engineering Skills](/projects/skills) around those failure modes. The collection covers documentation, technical SEO, search-facing content and web accessibility. The design problem was deciding which evidence each task needs and when the agent has enough of it to make a finding.

## Split the work where the evidence changes

Technical SEO and content review share a goal, but their checks differ. A clear, well-supported article can send a `noindex` header. A correctly indexed page can contain an unsupported claim. Fixing either problem requires inspecting a different part of the system.

I separated these into `technical-seo` and `search-content-review`. The first follows a page from source through its response and rendered output. The second examines what the text asserts, the evidence supporting it, and the qualifications that must survive an excerpt. Neither skill claims to predict a search engine's private ranking system.

Documentation and accessibility get their own workflows for the same reason. Documentation needs comparison with the implementation: an omitted value and an explicit zero can have different behavior. Accessibility needs interaction evidence: a control with the expected name can still be impossible to operate by keyboard.

Each skill can be installed independently. Its main instructions and references stay inside its directory, so using the documentation skill does not depend on another skill being present.

## Put decisions in the entry point

The technical SEO skill has this structure:

```text
technical-seo/
  SKILL.md
  AGENT-DISCOVERY.md
  MEDIA.md
  SOURCES.md
  agents/openai.yaml
```

`SKILL.md` establishes the review scope, the evidence to collect and the required verification. Media checks and agent discovery have their own references. A whole-site audit must read both; a scoped fix reads the affected surface. That condition is explicit in the instructions.

This follows the [Agent Skills format](https://agentskills.io/specification), which supports a main instruction file with additional resources loaded when needed. Splitting files alone does not decide when to read them. The entry point still has to say which task triggers which reference.

For example, a social image review needs to fetch and decode the image, check its crop and verify the actual metadata. Adding another generated card is unnecessary when an existing project image already works. The [media reference](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/skills/technical-seo/MEDIA.md) carries those checks without putting them into every SEO task.

## Record what a source can establish

Each skill has a `SOURCES.md` file with primary references, their status and scope, the date checked, and reasons to revisit them.

A W3C Recommendation, an informative tutorial and a community checklist have different authority. A checklist can reveal something worth investigating; the applicable standard and observed behavior determine whether it is a failure. The accessibility skill therefore asks the agent to check applicability and exceptions before attaching a WCAG criterion to a finding.

The distinction is concrete in its navigation checks. More than one way to locate a page can be provided by contextual links, search or a site map. The review has to inspect which paths actually reach the page. It cannot turn one example technique into a required route name. The [accessibility source record](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/skills/web-accessibility/SOURCES.md) also separates normative requirements from tutorials and draft specifications.

Search guidance has a similar boundary. An optional full-context file can help a tool read related material in one fetch. Whether that is useful depends on the task, publication scope and the consumer's limits. Its presence does not establish indexing or future citations. The [agent discovery reference](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/skills/technical-seo/AGENT-DISCOVERY.md) asks for that decision and the conditions behind it.

I kept the source records local to each skill so a separately installed skill retains the references needed to question its advice. When guidance changes, the instruction and affected source record need to change together.

## Separate three kinds of validation

The repository has checks for its format and distribution. Review quality needs a different procedure.

### Skill and manifest validation

[`scripts/check.py`](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/scripts/check.py) validates the portable plugin manifest against its schema, compares shared fields with the Claude-compatible manifest, invokes the Agent Skills reference validator for each skill, and runs Claude's strict plugin validators.

These checks catch malformed metadata, incompatible manifests and names that break the expected format. They do not verify every instruction, the truth of a source summary, or an agent's decision on a real task.

### Packaging tests

[`scripts/test_package.py`](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/scripts/test_package.py) creates disposable copies and checks three paths:

- The archive contains both manifests, the license and the skill files, with bytes matching the source. An unrelated `.env` file stays outside the ZIP.
- A version change updates both manifests. Invalid versions and downgrades leave their contents unchanged.
- Mismatched versions and symlinks are rejected without creating an archive.

The packager selects the two manifests, `LICENSE` and the `skills/` tree. That keeps repository-only material outside the distribution, although files added inside `skills/` still need review. It also writes to a temporary file beside the destination and replaces the final archive after writing it, avoiding a partially written final ZIP.

The build and these tests use Python's standard library. Schema and skill validation use the dependencies declared for that separate check.

### Behavioral review

The [contribution instructions](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/AGENTS.md) require an independent agent to check a realistic task when a skill's decisions or dispatch description change. Evaluation artifacts stay in temporary workspaces. There is currently no committed behavioral suite to rerun across the four skills.

Applying the accessibility skill to this portfolio produced a useful example of why runtime checks matter. My animated headings wrap each word in an `inline-block` span with its own view-transition name. In Orca 46.1 with Chromium 149, line reading announced the title word by word, and a long title repeated part of its second line. A DOM inspection alone had not exposed that reading behavior.

The correction gives the heading one complete accessible label and hides its visual word spans from assistive technology. It keeps their view-transition names. This abbreviated example shows the semantic boundary:

```tsx
import { Fragment } from "react";

<h1 aria-label={title}>
  {title.split(" ").map((word, index) => (
    <Fragment key={`${index}-${word}`}>
      {index > 0 && " "}
      <span
        aria-hidden="true"
        className="inline-block"
        style={{ viewTransitionName: `title-${id}-${index}` }}
      >
        {word}
      </span>
    </Fragment>
  ))}
</h1>
```

The [implemented component](https://github.com/andre-lmarinho/andremarinho.me/blob/4e15b67ac8d21e2a75f88d638cfdc0f858e18c59/src/components/transitions/MorphTitle.tsx) supports multiple heading levels. Its [regression test](https://github.com/andre-lmarinho/andremarinho.me/blob/4e15b67ac8d21e2a75f88d638cfdc0f858e18c59/src/components/transitions/__tests__/MorphTitle.test.tsx) checks the heading and enclosing link's accessible names. That protects the DOM contract; the separate Orca recheck established the announcement behavior for the tested pages.

The [review record](https://github.com/andre-lmarinho/andremarinho.me/pull/36) documents speech-generation logs captured with a Speech Dispatcher dummy output module. I did not assess audible synthesis or test NVDA, JAWS or VoiceOver. This was a fix verified in one browser and screen-reader combination, without establishing WCAG conformance or a general success rate for the skill.

## Keep publishing bounded

The [release workflow](https://github.com/andre-lmarinho/skills/blob/289a6e5a73cede26a6002cdac7d4dd3c7d1c2f84/.github/workflows/release.yml) reuses validation, synchronizes manifest versions, builds the ZIP, and publishes a GitHub release. It rejects an existing tag and checks `main` again before pushing the release commit and tag atomically.

That atomic push keeps the branch and tag update together. Creating the GitHub Release is a later API operation and can fail separately. The release guide explains how to rebuild from the existing tag and finish that step without bumping the version again.

The first [release ZIP](https://github.com/andre-lmarinho/skills/releases/tag/v0.1.0), published on October 15, predates the October 16 revisions described here. Directory submissions remain separate from the GitHub workflow, and a successful release says nothing about an official listing. The remaining maintenance work includes rechecking changed sources and exercising affected decisions when the instructions change.
