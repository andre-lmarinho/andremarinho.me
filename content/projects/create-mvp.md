---
title: create-mvp
description: A published npm CLI that scaffolds a production-ready Turborepo with Next.js, tRPC, Prisma and Better Auth wired end to end, and 35 decisions on the record.
date: 2026-07-07
tags: TypeScript, Turborepo, Next.js, tRPC, Prisma, Better Auth, CLI, npm
image: /images/projects/create-mvp.webp
link: https://www.npmjs.com/package/@andre.marinho/create-mvp
---

```bash
npx @andre.marinho/create-mvp
```

create-mvp scaffolds the starting point I got tired of rebuilding: a Turborepo with two Next.js apps, a type-safe tRPC API, Prisma against Postgres, and Better Auth, already connected to each other and already under CI.

I wrote it after starting the same project structure for the third time and making slightly different decisions each time. The value was never the file copying. It was settling the arguments once.

## The line it draws

Most starters fail in one of two directions. They ship empty, so you spend the first week wiring libraries together, or they ship a whole opinionated product you then have to dismantle.

This one is deliberate about the seam. Everything generic is done: the stack combination, the two-app split, the UI kit, the CI, the auth slice with its migrations. Everything product-specific is left empty on purpose, because a bootstrap that guesses your domain model is a bootstrap you will fight.

## What you get

- **A wired path from database to browser.** Prisma schema as the source of truth, Better Auth handling sessions and cookies through the Prisma adapter, tRPC exposing typed procedures with Zod validation, and those types flowing to React without a generation step.
- **Two apps, not one.** A product app and a marketing site, separated from the first commit, because merging them later is worse than splitting them now.
- **Tests and CI from the start**, with the release pipeline hardened against supply-chain attacks.
- **35 architecture decision records**, one per real choice, each with the alternatives that lost and why.

## Why the decision records matter

They are the part I would keep if I had to throw the rest away.

Writing "we chose X over Y because Z" is impossible when you do not know Z, so the format forces the gap into the open while you can still do something about it. Six months later they answer the question that actually gets asked, which is never "what does this do" but "why is it like this, and can I change it".

## Links

Published on [npm](https://www.npmjs.com/package/@andre.marinho/create-mvp), source on [GitHub](https://github.com/andre-lmarinho/create-app-mvp).
