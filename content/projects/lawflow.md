---
title: LawFlow
description: A production CRM for law firms that I built as the sole developer, from its core interface through tenant isolation, billing, tests, and deployment.
date: 2026-06-15
tags: Next.js, TypeScript, tRPC, Supabase, Postgres/RLS, Asaas, Playwright, Vitest
image: /images/projects/lawflow.webp
kind: CRM
link: https://www.lawflowhub.com/
featured: true
---

## Context

LawFlow is a CRM for law firms built around one operational gap: the space between a first enquiry and an accepted proposal.

When leads live across messages, notes, and individual follow-ups, opportunities disappear without anyone deciding to lose them. LawFlow puts that work in one flow, from intake and qualification to proposal, acceptance, and follow-up.

## My role

I was the sole developer responsible for the implementation now in production. I designed and built its core workflows and interface, then implemented the API, data model, authentication, workspace isolation, subscription billing, automated tests, and deployment required to run the product.

This was frontend-led, end-to-end ownership: start with the interaction people depend on, then carry the supporting system far enough for it to work outside a prototype.

## Scope

- A drag-and-drop commercial pipeline that derives client status from each stage.
- Client records with legal area, lead source, urgency, owner, and interaction history.
- Scheduled activities and in-app reminders.
- Proposals created in the CRM, exported to PDF, and shared through a public page where the client can accept without an account.
- Reusable message templates and a fee simulator based on costs, taxes, billable hours, and target margin.
- Team invitations, owner-only settings, guided onboarding, and subscription management.
- Two Next.js applications in one Turborepo: the authenticated product and its marketing site.

## Evidence

The [product is live](https://www.lawflowhub.com/) with subscription-gated access and the complete journey from lead intake to accepted proposal.

For the pipeline—the most repeated interaction in the product—I moved the card immediately in the local cache, then reconciled with the server and rolled back on failure. In an isolated measurement, visible feedback went from roughly 350–700 milliseconds to one frame, under 16 milliseconds. The server work still happens; it no longer sits between the gesture and the pixel.

I also instrumented the first load before changing it. In a Playwright benchmark against the development server, the critical path until the interface became usable fell from about 1,447 milliseconds to 760 milliseconds. The complete boot fell by 10%, because the larger gain came from moving non-critical work behind the first usable screen rather than pretending that work had disappeared.

The end-to-end suite covers the paths whose failure would affect the operation directly: authentication, pipeline, proposals, the public acceptance page, and subscription billing.

## Decisions

### Make the working surface feel immediate

The pipeline is where the work happens, so moving a card could not feel like submitting a form. Optimistic updates make the common path immediate, while a snapshot, rollback, and refetch keep the server as the source of truth.

### Keep tenant boundaries explicit

Every domain record carries a `workspace_id`. A protected tRPC procedure resolves the caller and workspace, a service owns the business rule, and a repository performs an explicitly scoped query with explicit column selection. Isolation is a system boundary, not a filter left to the interface.

### Put computation where it belongs

The first dashboard implementation transported accepted proposals to Node and aggregated them in JavaScript. I promoted the acceptance date from JSON to a queryable column and moved revenue aggregation into Postgres, so the cost no longer grows by shipping the full proposal history across the network.

Billing follows the same principle: webhook events are authenticated, persisted before processing, and handled idempotently so a gateway retry cannot apply the same transition twice.

## Outcome

LawFlow became a working product in production, with the complete path from lead intake to proposal acceptance, product access gated by subscription billing, and the operation supported by authorization, tests, and deployment.

It is the clearest example of how I work as a Frontend Engineer: begin with the experience, make its state and feedback precise, then cross the stack when that is what makes the interface fast, safe, and dependable.

## Disclosure

LawFlow is a client-owned public product. The production implementation described here—including the frontend, backend, integrations, and deployment—is my work. Subscriber and revenue figures remain private.
