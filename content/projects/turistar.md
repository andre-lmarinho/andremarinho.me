---
title: Turistar
description: An open-source travel planner with real-time collaborative editing on an event-sourced model, so every change to an itinerary is recorded and replayable.
date: 2025-10-20
tags: Next.js, TypeScript, Supabase, Event Sourcing, Realtime, Leaflet, Playwright
image: /images/projects/turistar.webp
featured: true
link: https://travel-planner-orpin.vercel.app/
---

Turistar is an open-source travel planner where several people can edit the same itinerary at once. I built it because I kept planning trips in note apps and losing track of what changed, and I still use it to plan my own.

It is also where I get to make architectural decisions nobody is paying for, which is why the collaboration model underneath it is more interesting than the feature list on top.

## What it does

- **Drag-and-drop planner.** Move activities between days or add blank cards to build the schedule.
- **Place search.** Autocomplete for cities, addresses and attractions through Geoapify, with images pulled from Wikidata.
- **Map view.** Every planned stop on an interactive map, so a day that looks fine as a list stops looking fine as a route.
- **Budget.** Expenses by category with planned against actual, where activity costs roll up automatically.
- **Sharing and permissions.** Email invites and revocable share links at owner, admin and member levels, plus public plans by slug.
- **Visited countries.** A world map built from the countries across all your plans.

## The interesting part

Nothing in the planner writes state directly. Every change is an immutable event (`activity.moved`, `day.reordered`, and so on) appended to a log, and the current itinerary is a replay of that log.

That choice pays for itself in three places. Real-time collaboration becomes a subscription to an event stream rather than a merge problem. Ordering conflicts between two people dragging cards into the same day resolve deterministically through gap ordering instead of last-write-wins. And the full history of an itinerary is free, because it was never thrown away.

The cost is that replaying from zero gets slower as a plan grows, so the app writes periodic snapshots of the reconstructed state and replays only the events after the latest one. A monotonic version counter detects when a client has fallen behind and triggers a refetch instead of silently diverging.

## Testing and access control

79 unit and integration test files with Vitest, 12 Playwright specs covering auth, the dashboard, and each planner surface including drag-and-drop, budget, members and sharing. Coverage runs in CI.

Access is enforced by Row Level Security in Postgres, not only in the UI, with the service-role key kept server-only. The middleware injects a nonce and applies a Content Security Policy along with HSTS and the usual hardening headers.

## Open source

The code is on [GitHub](https://github.com/andre-lmarinho/travel-planner) under the GNU AGPL-3.0 license, and the [live version](https://travel-planner-orpin.vercel.app/) is the one I actually use.
