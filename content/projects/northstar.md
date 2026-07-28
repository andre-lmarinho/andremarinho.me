---
title: Northstar
description: Product telemetry that ties each behavior to a business outcome, measuring incremental lift against a holdout instead of reporting raw event counts.
date: 2026-07-22
tags: TypeScript, ClickHouse, PostgreSQL, Kafka, Redis, dbt, Next.js, Analytics
image: /images/projects/northstar.webp
---

Northstar is a product telemetry platform built around one refusal: it will not show you a number without telling you what that number is worth.

Most analytics tools are very good at counting things. You learn that 4,000 people clicked something, and you are no closer to knowing whether it mattered. Northstar makes the link explicit, so a behavior carries the revenue, conversions or activation it actually influenced.

*Delivered for a client who asked not to be named. The name and interface shown here were rebuilt so the work can be shown without identifying them.*

## The model

Three objects, and the whole product falls out of them.

An **event** is a raw immutable fact. A **signal** is a behavior worth naming, like inviting a teammate. An **outcome** is a business result with a value attached, like revenue or activation.

Instrumentation ties a signal to an outcome in one call:

```js
ns.signal('invited_teammate', {
  userId, outcome: 'revenue', value: 39.10
})
```

Everything on the dashboard, the guiding metric, the outcome cards, the signals table showing what each behavior is worth, is a view over that relationship.

## Correlation is not the answer

Reporting that users who invite a teammate convert more is easy and nearly useless, because the kind of user who invites teammates was more likely to convert anyway.

Northstar measures against a holdout, so the number it reports is lift: what the behavior added, not what it happened alongside. That distinction is the reason the product exists, and it is what makes the signals table something you can plan a roadmap against.

## The pipeline

Ingestion accepts high-volume batched events, deduplicates by event key, validates against a schema registry, and pushes failures to a dead-letter queue instead of dropping them. Identity resolution stitches anonymous activity to the account once someone logs in.

Storage is split by what each side is good at. Events live in ClickHouse, a columnar store that answers analytical queries over hundreds of millions of rows, with materialized rollups keeping the dashboard cards fast. Definitions, experiments and workspace metadata live in Postgres, where transactions and constraints matter more than scan speed. Raw events also land in object storage, so attribution models can be rebuilt from scratch when a definition changes.

## Stack

A Node ingestion service in front of Kafka, ClickHouse for the analytical store, Postgres for metadata and definitions, Redis for live counters and rate limiting, dbt for attribution and funnel transformations, object storage as the raw archive. The dashboard is Next.js and React 19 with charts drawn as bespoke SVG rather than a charting library. API keys are scoped to write or read, PII fields are marked and maskable, and deletion requests propagate to the columnar store and the archive.
