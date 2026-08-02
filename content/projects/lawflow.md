---
title: LawFlow
description: A client-intake and sales-pipeline SaaS for law firms, built end to end and running in production with subscription billing and per-firm data isolation.
date: 2026-06-15
tags: Next.js, TypeScript, tRPC, Supabase, Postgres/RLS, Asaas, Playwright, Vitest
image: /images/projects/lawflow.webp
kind: CRM
link: https://lawflowhub.com
featured: true
---

LawFlow is a CRM for law firms, built around one job: getting a case from first contact to a signed proposal. I designed and built it end to end for a client, and it runs in production today with paying subscribers.

Small firms lose work in the gap between someone calling and someone following up. The product exists to close that gap, so the pipeline is the main screen rather than a report you visit once a month.

## What it does

- **Commercial pipeline.** A drag-and-drop Kanban from first contact through qualification to closed or lost, where moving a card also derives the client's status.
- **Client base.** Full records with legal area, lead origin, urgency, preferred channel and an interaction timeline per client.
- **Proposals.** Drafted in the app, shared as a public page the client opens and accepts without an account, exported to PDF, with the acceptance recorded against whoever accepted it.
- **Fee simulator.** Works back from fixed costs, team costs, tax rate, billable hours and target margin to an hourly rate and a service price.
- **Scheduled activities** that raise in-app notifications, reusable message templates, and a guided onboarding tour.
- **Team and billing.** Invites and roles, plus subscription management restricted to the workspace owner.

## How it is put together

Every firm is a workspace, and every domain row carries its `workspace_id`. That column is the tenant boundary, enforced in Postgres and again in the query layer, because a leak here means one firm reading another firm's clients.

Requests move through thin layers: a tRPC procedure handles transport and authorization, a service holds the business rule, and a repository talks to Supabase with explicit column selection so sensitive fields never leave the database by accident. Authorization is checked in the page, never in a layout, and procedures escalate from authenticated, to workspace member, to billing owner.

Billing runs on Asaas. The webhook validates its secret with a constant-time comparison, persists the event before acting on it so retries are idempotent, and processes asynchronously after the HTTP response. Access to the product is gated on an entitlement derived from that subscription state.

The Playwright suite covers the paths that would cost real money if they broke: auth, pipeline, proposals, the public proposal page, and billing against a mocked gateway.

## Stack

Next.js 16 and React 19 in a Turborepo monorepo with two apps, one for the product and one for marketing. TypeScript in strict mode, tRPC with Zod for the API, Supabase for Postgres and auth, Tailwind CSS 4, TanStack Query on the client, Asaas for billing, Resend for transactional mail. Vitest and Playwright for tests, Biome for lint, GitHub Actions for CI, Vercel for hosting.
