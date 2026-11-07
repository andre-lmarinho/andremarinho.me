---
title: Meu condomínio
description: A client project I am building to manage condominium cash and monthly fees with an auditable financial history.
date: 2026-11-07
tags: Next.js, TypeScript, tRPC, Supabase, PostgreSQL, pgTAP
images:
  01-cover.webp:
    alt: Illustrated financial ledger showing condominium transactions and their history
---

## Context

A condominium needs to know what came in, what went out, and which monthly fees are still outstanding. It also needs to explain a correction later, when the person looking at the balance was not the one who entered it.

Meu condomínio brings cash movements, monthly fees, units, and transaction history into one application. I am building it for a client; the project is still in progress.

## My role

I built the current product foundation, including the financial model, application and public site, authentication, tenant isolation, tests, and deployment pipeline. I also implemented mobile installation support and the navigation improvement described below.

## Scope

The application tracks income, expenses, opening balances, and monthly fees by unit. Users can filter movements, record partial payments where allowed, and review the history of a correction or cancellation. Onboarding covers the initial condominium setup.

The monorepo separates the authenticated Next.js application from the public site. Domain services, a typed tRPC API, shared UI, and Supabase clients live in separate packages. PostgreSQL holds the financial records and Supabase Auth handles sign-in.

## Decisions

### Keep the previous financial fact

A correction or cancellation creates a new movement revision instead of overwriting the previous value. The history retains the earlier record, reason, and time of the change. Financial facts and the cash balance are updated in the same transaction, so the balance can be reconstructed from the records.

### Enforce the condominium boundary in the database

Users only see condominiums where they are members. Row Level Security and composite foreign keys protect tenant boundaries; financial RPCs check membership and serialize writes for the condominium. Database tests run migrations against a clean database and use pgTAP to check permissions and financial invariants.

### Make the next screen ready sooner

I prefetched the main routes, ran their queries in parallel, and removed a repeated membership query from authenticated tRPC calls. I also waited for classifications before displaying the setup checklist, so it did not flash with incomplete data.

In the recorded desktop browser comparison, the settings form became available **94% faster** on a return visit in the same session. The first visit also improved. The measurement checked when fields and the button were enabled; it did not measure the end of background revalidation. The browser's HTTP cache was not cleared.

## Current status

This is a client project in progress. The application supports installation on mobile browsers, but installation and layout still need validation on physical devices; there is no offline support. Before real operation, recovery objectives, restore drills, and billing contention need further work. The cover is an illustration of the financial model, not a screenshot or real condominium data.
