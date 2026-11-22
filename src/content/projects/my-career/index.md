---
title: my-career
description: A career workflow built on reusable agent skills, evidence-backed records, job-fit scoring, and application tracking.
date: 2026-07-22
tags: AI agents, Markdown, Python, Typst, Documentation
images:
  01-cover.webp:
    alt: Terminal card summarizing application records, job-fit scoring, source documents, and the separation between agent workflows and private career records
---

## Context

A job search spreads career facts, résumés, job postings, and outcomes across different files and services. An agent needs both reliable records and clear rules for how to use them.

I built the workflow in `agent-infra`, a codebase of reusable professional skills and support tools. It uses my separate, private `my-context` repository for career facts, derived documents, and application records. This keeps personal data outside the reusable infrastructure while letting an agent work with it through chat.

## My role

I created and maintain `agent-infra` for my own career workflow. I defined shared rules for evidence, privacy, and writing; built skills for professional context, branding, content, and applications; and implemented the job-fit and vacancy-record scripts.

## Scope

The workflow spans the infrastructure and its configured data repository:

- **Context documents** — a hierarchy in `my-context` that distinguishes factual sources (experiences, projects, events) from summaries and derived pieces such as résumés, letters, and LinkedIn material;
- **Opportunity assessment** — the `job-fit-v3` protocol classifies each requirement and produces an adherence score, a coverage figure and unmet required gaps, with results stored in the application record;
- **Application records** — one folder per application with the posting, the assessment and the outcome; records are located by path and frontmatter, not by conversation memory;
- **Derived materials** — résumé bases for four tracks in Portuguese and English as source files compiled to PDF with Typst, platform form snippets, letters, and a self-contained portable profile document readable outside the repository;
- **Reusable agent skills** — `professional-context`, `personal-brand`, `professional-content`, `career-applications`, and `docs-maintenance` in `agent-infra`, with focused references loaded by task;
- **Validation** — tests for job-fit calculations and vacancy records, checks for shared writing rules, and a script for plain-English guidance.

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

### Keep reusable workflows apart from personal records

`agent-infra` holds the methods; `my-context` holds the evidence and application history. The configuration connects them without copying personal records into the reusable workflow repository.

The boundary lets the skills work with configured sources while keeping private facts and submitted materials in their existing location.

### Validate the structure; test the workflow by use

Lint, security checks and unit tests verify skill metadata, dangerous-content handling and scoring arithmetic, and check that résumé sources still compile to the expected PDFs. None of these prove the workflows behave well: a change to a skill's flow requires exercising a realistic task in a temporary workspace, without handing the reviewer the expected answer.

The `my-context` repository contains private career and application records. The case describes `agent-infra` and its configured workflow, not a public copy of those personal records.
