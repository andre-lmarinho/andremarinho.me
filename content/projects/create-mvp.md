---
title: create-mvp
description: An open-source npm CLI for setting up a SaaS project, built from infrastructure I use in four production products.
date: 2026-07-07
tags: TypeScript, Turborepo, Next.js, tRPC, Prisma, Better Auth
image: /images/projects/create-mvp.webp
kind: npm CLI
link: https://www.npmjs.com/package/@andre.marinho/create-mvp
featured: true
---

```bash
npx @andre.marinho/create-mvp
```

## Context

By the third time I assembled the same SaaS foundation, I was copying files and revisiting the same questions: where the product and marketing surfaces should split, how types should travel from database to browser, where authentication should live, and what belonged in CI before the first feature.

create-mvp packages that recurring setup so I can start a new project without assembling it again.

## My role

I created and maintain create-mvp. I extracted the recurring foundation from my product work, chose its boundaries, implemented the CLI and template, connected the stack, wrote its tests and delivery workflows, documented the architectural decisions, and published the package on npm.

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

## Decisions

### Make types travel through the whole path

Prisma defines the data model, Better Auth uses its adapter, and tRPC with Zod carries validated types into React without a separate client-generation step. The goal is one connected path from database to browser rather than a collection of installed libraries.

### Treat rationale as part of the output

Each Architecture Decision Record explains the chosen approach, the alternatives, and the reason for the choice. Writing them helped me find decisions I could not yet justify, while I could still change them.

## Outcome

The same foundation now supports four products running in production. I can version and reuse the setup as it evolves.
