---
title: Northstar
description: Product analytics for following user behavior through to revenue, conversion, and experiments, with the context behind each result.
date: 2026-04-12
tags: Next.js, ClickHouse, Data visualization, SVG
image: /images/projects/northstar.webp
kind: product analytics
---

## Context

Event counts alone leave business questions unanswered. A team can know that thousands of people used a feature and still not know whether the behavior changed revenue, conversion, or activation.

Northstar organized the product around three objects: an event is a raw fact, a signal is a behavior worth naming, and an outcome is the business result associated with it. Where an experiment included a holdout, the product compared groups to estimate incremental lift rather than presenting correlation as the answer.

The data model and dashboard had to carry the same definitions, so readers could see how a result was calculated and which comparison supported it.

## My role

On a three-person team, I defined the architecture and stack, led technical delivery, and reviewed pull requests. I designed and built the dashboard and shared backend and telemetry infrastructure work with the other developers.

## Scope

The product covered:

- a north-star metric with its time window, trend, and growth driver;
- revenue, conversion, activation, and time-to-value outcome cards;
- the relationship between signals, users, conversion, influenced value, and lift;
- event and conversion trends, segments, sources, countries, and activation funnels;
- experiment status, significance, and confidence;
- source setup for SDK, server, webhook, and CSV ingestion;
- bespoke SVG charts in Next.js, React, and TypeScript.

The team used ClickHouse for events and analytical queries, and PostgreSQL for workspaces, sources, signals, outcomes, and experiment definitions. SDK events, server events, webhooks, and CSV imports fed the same event model.

## Decisions

### Keep the qualifier beside the number

A lift figure needs its comparison, a conversion rate needs its window, and an experiment needs its confidence and status. Those details were part of the component hierarchy rather than detached notes.

### Carry one model through the whole interface

Event, signal, and outcome remained distinct from instrumentation through reporting. The dashboard could then show both what happened and which business result the product associated with it.

### Draw the charts for the questions being asked

Bespoke SVG charts kept the visual language consistent and gave the interface control over annotations, states, and hierarchy without shipping a general-purpose charting library.

## Disclosure

The client asked not to be named. "Northstar," its identity, company, data, values, integrations, and interface were created or altered for this portfolio reconstruction. The overview shows a guiding metric, a 90-day trend, outcome cards, experiments, and the Signals to Outcomes table.

The product model, delivered capabilities, and my responsibilities describe the engagement. The screenshot uses illustrative users, events, values, lift figures, and confidence levels; it does not show the client's performance or original interface. No client repository or production metric is public.
