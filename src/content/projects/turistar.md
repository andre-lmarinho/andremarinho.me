---
title: Turistar
description: An open-source planner I built for my own trips, where a group can organize an itinerary, map out stops, and share a budget.
date: 2025-10-20
tags: Next.js, Supabase, Event Sourcing, Leaflet, Playwright
image: /images/projects/turistar.webp
kind: open source
link: https://turistar.me/
featured: true
---

## Context

I kept planning trips in note apps. They were good at collecting places and bad at showing how those places became a trip: what belonged on each day, how far apart the stops were, what the plan would cost, and what had changed since the last edit.

Turistar puts the itinerary, map, and budget in one place. It started as a tool for my own trips and became a production, open-source product where a group can build the same plan together.

## My role

I created and maintain Turistar, from product design and the data model to the deployed application. I also maintain its authentication, collaboration features, tests, and CI.

## Scope

- Create a trip from a destination and date range.
- Build each day on a keyboard-navigable drag-and-drop board with responsive layouts.
- Search cities, addresses, and attractions through Geoapify, with place imagery from Wikidata.
- See every planned stop on an interactive Leaflet map.
- Track a total budget and planned versus actual expenses by category.
- Invite collaborators, assign owner, admin, and member roles, issue revocable share links, and publish plans by slug.
- Manage plans from a user dashboard and aggregate visited countries on an interactive world map.

## Evidence

The [live product](https://turistar.me/) is the version I use, and the complete [source code is public](https://github.com/andre-lmarinho/turistar) under the AGPL-3.0 license. The repository includes the implementation, tests, CI, and architectural history.

The test suite includes Vitest unit and integration checks and Playwright journeys covering authentication, the dashboard, inspirations, the world map, and the planner surfaces: activities, drag-and-drop, map, budget, members, search, and sharing.

I also measured the collaboration payload with the production diff code. For a modeled seven-day itinerary with four enriched activities per day, one edit serialized to 740 bytes as an event instead of resending a 15,940-byte snapshot. That is a code-level payload measurement, not user telemetry.

## Decisions

### Keep the gesture local

The January implementation updated a [local draft in the board component](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/activityBoard/components/ActivityBoard.tsx) so the card followed the pointer without waiting on a network write. The [drag handlers saved the move once on drop](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/activityBoard/hooks/useDragHandlers.ts).

In a simulation using that revision's code, moving a card across a full column and into the next on a four-day board with four activities per day reduced seven potential writes to one. Remote state did not reposition the card underneath the pointer while the gesture was active. Concurrent edits to the same itinerary could still be misread when the whole draft was committed; that race was a known edge case of the linked revision.

The [later implementation commits an activity ID and destination](https://github.com/andre-lmarinho/turistar/blob/151498387e729ca5759137a7de6a37686452a817/src/modules/planner/hooks/useDragHandlers.ts), projecting the preview over current shared state instead of submitting an entire draft. I explain the historical conflict and the change in [Keeping drag-and-drop stable during realtime updates](/posts/drag-and-drop-with-realtime).

### Send each change as an event

Each itinerary-board change becomes an immutable event such as `activity.moved` or `day.reordered`, appended with a monotonic version. The originating client applies the change optimistically; other clients receive the versioned event through Supabase Realtime.

Snapshots keep replay bounded, and a gap in the version sequence triggers a refetch rather than allowing silent divergence. The [collaboration tests cover version gaps and snapshot recovery](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/events/hooks/usePlanCollaboration.test.ts). Fractional positions make concurrent reordering deterministic. This event log uses last-write-wins for concurrent edits to the same field. It does not provide CRDT conflict resolution.

I also corrected a write path that could advance a snapshot's version while retaining old content. [The event-version investigation](/posts/event-version-and-stale-snapshot) follows the missing RPC argument, server-side state construction, and the limits of replay recovery.

### Load the dashboard's summaries

The dashboard uses one PostgreSQL summary query for trip cards and map destinations, counting activities without transferring each itinerary snapshot. A controlled benchmark with 50 plans, 40 activities per plan, and 30 ms added database API latency reduced median data-loading time from 129.10 ms to 39.03 ms. Those are HTTP-to-parsed-JSON timings, not full-page rendering. [The dashboard note](/posts/dashboard-summaries-instead-of-snapshots) explains the query, access rules, and why the 50-card limit must not truncate the map.

### Let visitors use the real product

The [demo button on the login page](https://turistar.me/login) opens a real shared account with prepared trips. On dashboard entry, the database can restore its baseline if at least an hour has passed since the last reset, without a scheduler or a reset on every visit. Visitors can see each other's changes, and already-open tabs need a refresh after restoration. [The demo note](/posts/shared-demo-without-reset-scheduler) covers the restore mechanism and access boundary.

### Enforce access below the interface

Plans have owner, admin, and member roles enforced below the interface. Membership checks and Row-Level Security protect the data boundary, privileged credentials stay server-only, and share links can be revoked without changing the plan itself.

## Outcome

Turistar replaced the collection of notes I used to plan my own trips with one maintained product for itinerary, geography, and cost.
