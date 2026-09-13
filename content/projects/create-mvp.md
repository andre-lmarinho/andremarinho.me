---
title: create-mvp
description: An open-source npm CLI for setting up a SaaS project, built from infrastructure I use in four production products.
date: 2026-07-07
tags: TypeScript, Turborepo, Next.js, tRPC, Prisma, Better Auth, CLI, npm
image: /images/projects/create-mvp.webp
kind: npm CLI
link: https://www.npmjs.com/package/@andre.marinho/create-mvp
featured: true
---

```bash
npx @andre.marinho/create-mvp
```

## Context

By the third time I assembled the same SaaS foundation, I was copying files and revisiting the same questions: where the product and marketing surfaces should split, how types should travel from Postgres to React, where authentication should live, and what belonged in CI before the first feature.

An empty starter leaves that integration work to the next project. A complete template goes too far and starts guessing the product. create-mvp draws the boundary between them: finish the infrastructure that repeats, then stop before the domain begins.

## My role

I created and maintain create-mvp. I extracted the recurring foundation from my product work, chose its boundaries, implemented the CLI and template, connected the stack, wrote its tests and delivery workflows, documented the architectural decisions, and published the package on npm.

The work includes 35 Architecture Decision Records. Each one records the chosen approach, the alternatives that lost, and the reason for the choice.

## Scope

The CLI scaffolds:

- a Turborepo monorepo with separate Next.js apps for the product and marketing site;
- an end-to-end type-safe API with tRPC and Zod;
- Prisma against PostgreSQL as the data layer;
- Better Auth handling identity, sessions, and cookies through the Prisma adapter;
- a shared UI foundation;
- the initial authentication slice and its migrations;
- tests and CI from the first commit;
- a release workflow hardened against common supply-chain risks.

Product-specific models, features, and business integrations are deliberately absent. I leave those decisions to each project.

## Evidence

The package is published on [npm](https://www.npmjs.com/package/@andre.marinho/create-mvp), and the [source is public on GitHub](https://github.com/andre-lmarinho/create-app-mvp). The repository exposes the template, tests, release workflow, and all 35 decision records for inspection.

The same infrastructure is now the starting point for four products running in production.

## Decisions

### Finish the generic layer, leave the domain empty

The stack integration, two-app split, authentication, UI foundation, tests, and CI repeat across products. Domain models and business features do not. The starter includes the shared setup and leaves product-specific code to each project.

### Make types travel through the whole path

Prisma defines the data model, Better Auth uses its adapter, and tRPC with Zod carries validated types into React without a separate client-generation step. The goal is one connected path from database to browser rather than a collection of installed libraries.

### Treat rationale as part of the output

For each ADR, I had to explain why I chose an approach and rejected the alternatives. Writing that down helped me find decisions I could not yet justify, while I could still change them.

## Outcome

create-mvp lets me reuse and version the setup I had been repeating. A new product begins with a working path from database to browser, authentication, tests, and CI already connected, while its domain remains open to change.
