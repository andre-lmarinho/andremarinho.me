---
title: my-career
description: Career context in Markdown operated through agents — evidence-backed source documents, deterministic job-fit scoring, per-application records and a fork triaged against its upstream, being prepared for an open release.
date: 2026-07-22
tags: AI agents, Markdown, Python, Typst, Documentation
images:
  01-cover.webp:
    alt: Terminal card listing retrieval, scoring, portability and fork provenance highlights of the career context repository
---

## Context

A job search produces documents everywhere: résumés in PDF, cover letters in a text editor, job postings in ten different portals, application outcomes in an inbox, career history in the head of the person who lived it. When an agent writes a letter or evaluates a posting, it needs to know which documents support the claims it makes.

I built my career context as a single Markdown repository that an agent can operate through chat. It separates what happened from what is claimed about it, scores opportunities with a defined protocol, and keeps every application as a record instead of an intention. Skills route each task, scripts handle the arithmetic, and the person remains the source of authority for facts.

## My role

I created and maintain the repository for my own search. I adapted the original fork of [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) into my own workflows, wrote the job-application skill and its reference set, defined the scoring protocol, and implemented the supporting scripts.

## Scope

The repository covers a full search workflow:

- **Context documents** — a hierarchy that distinguishes factual sources (experiences, projects, events) from consolidated summaries and derived pieces such as résumés, letters and LinkedIn material, with selective retrieval procedures that let an agent locate the section answering a question instead of reading the whole repository;
- **Opportunity assessment** — the `job-fit-v3` protocol classifies each requirement and produces an adherence score, a coverage figure and unmet required gaps, with results stored in the application record;
- **Application records** — one folder per application with the posting, the assessment and the outcome; records are located by path and frontmatter, not by conversation memory;
- **Derived materials** — résumé bases for four tracks in Portuguese and English as source files compiled to PDF with Typst, platform form snippets, letters, and a self-contained portable profile document readable outside the repository;
- **Two agent skills** — the `job-application-assistant` skill with fifteen reference documents, scripts and tests, plus a LinkedIn content skill bundle reused for publishing;
- **Maintenance tooling** — skill linting, security checks, unit tests for the scoring and validation scripts, and provenance tracking for fork contents.

The repository has operated my own search since July 2026.

## Decisions

### Correct the facts first, then their consumers

The hierarchy places experiences, projects and events above summaries, and summaries above derived pieces. A confirmed fact is updated in its source first; a search by term then finds the summaries and pieces affected by a rename or correction. Historical snapshots of sent material stay untouched — they prove what was sent, not what is true today.

These procedures help an agent find the affected documents without relying on conversation memory.

### Let the agent classify and the script compute

The scoring script never classifies requirements, inspects résumés or decides outcomes; it only evaluates rows the skill has already classified, applying fixed weights and factors. Missing evidence is `unknown`, never an implicit gap — unknown requirements leave the score but keep lowering coverage, and coverage below a threshold marks the assessment as provisional. Required gaps are highlighted regardless of the final score.

The split keeps arithmetic deterministic and reviewable while the judgment stays where the evidence is.

### Register applications as records, not intentions

Each application lives in its own folder with a posting, an assessment and an outcome. Frontmatter fields such as source and description are mandatory, and a sent application is only marked as applied when I confirm the submission — résumés prepared without confirmation do not become applications. The pattern preserves PDFs and snapshots so each record can reconstruct what actually happened.

### Audit the fork, file by file

The starting point was an open-source job-search skill collection, but the workflows, language and domain diverged early. An upstream registry pins the incorporated commit and records, for each original file, whether it was kept, adapted, replaced or excluded, with a reason. Scripts compare the mapped paths against the upstream tree so new, renamed and removed files must appear in the triage.

This is what makes an eventual open release tractable: what came from upstream, what is mine, and what must not ship are three answers the repository can show.

### Validate the structure; test the workflow by use

Lint, security checks and unit tests verify skill metadata, dangerous-content handling and scoring arithmetic, and check that résumé sources still compile to the expected PDFs. None of these prove the workflows behave well: a change to a skill's flow requires exercising a realistic task in a temporary workspace, without handing the reviewer the expected answer.

The repository is private and carries my application history. A planned public release keeps the skeleton — skills, scripts, templates and documentation — and removes the personal records, so contributors can reuse the infrastructure for their own searches.
