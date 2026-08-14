---
title: Turistar
description: An open-source travel planner I designed and shipped for my own trips, with a drag-and-drop day board, maps, budgets, and event-sourced collaboration.
date: 2025-10-20
tags: Next.js, TypeScript, Supabase, Event Sourcing, Realtime, Leaflet, Playwright
image: /images/projects/turistar.webp
kind: open source
link: https://turistar.me/
featured: true
---

## Context

I kept planning trips in note apps. They were good at collecting places and bad at showing how those places became a trip: what belonged on each day, how far apart the stops were, what the plan would cost, and what had changed since the last edit.

Turistar puts the itinerary, map, and budget in one place. It started as a tool for my own trips and became a production, open-source product where a group can build the same plan together.

## My role

I created and maintain Turistar. I own the product and interaction design, the frontend architecture and implementation, and the work required to keep it running: authentication, realtime synchronization, PostgreSQL policies, testing, CI, and deployment.

It is a frontend-led project with end-to-end responsibility and a public codebase.

## Scope

- Create a trip from a destination and date range.
- Build each day on a keyboard-navigable drag-and-drop board.
- Search cities, addresses, and attractions through Geoapify, with place imagery from Wikidata.
- See every planned stop on an interactive Leaflet map.
- Track a total budget and planned versus actual expenses by category.
- Invite collaborators, assign owner, admin, and member roles, issue revocable share links, and publish plans by slug.
- Manage plans from a user dashboard and aggregate visited countries on an interactive world map.

## Evidence

The [live product](https://turistar.me/) is the version I use, and the complete [source code is public](https://github.com/andre-lmarinho/turistar) under the AGPL-3.0 license. The repository exposes the implementation, tests, CI, and architectural history rather than asking a viewer to judge the work from screenshots.

The documented test surface includes 79 Vitest files for unit and integration behavior and 12 Playwright specs covering authentication, the dashboard, inspirations, the world map, and the planner surfaces: activities, drag-and-drop, map, budget, members, search, and sharing.

I also measured the collaboration payload with the production diff code. For a modeled seven-day itinerary with four enriched activities per day, one edit serialized to 740 bytes as an event instead of resending a 15,940-byte snapshot. That is a code-level payload measurement, not user telemetry.

## Decisions

### Keep the gesture local

Dragging is continuous input; persistence is not. During a drag, Turistar changes a local draft and performs no network write. It commits the final intent once on drop.

On a measured four-day board with four activities per day, moving a card across a full column and into the next reduced seven potential writes to one. Remote state does not reposition the card underneath the pointer while the gesture is active. A remote edit to that same card during the drag can still be misread when the final state is committed; that race remains a known edge case.

### Persist changes, not whole itineraries

Each itinerary-board change becomes an immutable event such as `activity.moved` or `day.reordered`, appended with a monotonic version. Other clients receive the event through Supabase Realtime and apply it optimistically.

Snapshots keep replay bounded, and a gap in the version sequence triggers a refetch rather than allowing silent divergence. Fractional positions make concurrent reordering deterministic. Concurrent edits to the same field remain last-write-wins; this is an event log, not a CRDT.

### Enforce access below the interface

Plans have owner, admin, and member roles, but hiding a control is not authorization. Membership checks and Row-Level Security protect the data boundary, privileged credentials stay server-only, and share links can be revoked without changing the plan itself.

## Outcome

Turistar replaced the collection of notes I used to plan my own trips with one maintained product for itinerary, geography, and cost.

It is also public evidence of the frontend work I care about: interaction shaped by concurrent state, recovery from version gaps, keyboard access, responsive layouts, and a codebase structured to keep evolving after the first version ships.
