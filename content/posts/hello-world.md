---
title: Hello World
description: Why I built this site from scratch, what I deliberately left out, and the decisions and mistakes I want to write down now that the blog exists.
date: 2026-07-17
tags: meta, nextjs, writing
---

```ts
console.log("Hello, world");
```

The site has been up for a while. The blog has not, mostly because I kept deciding I had nothing finished enough to write about.

This runs on Next.js, TypeScript and Tailwind. Posts are markdown files in a folder, which is enough for this small blog. I would rather add a CMS or database when maintaining the files becomes a problem. Everything renders to static HTML at build time.

I wrote it from scratch instead of starting from a template, which cost me a weekend I could have skipped. Worth it anyway. A portfolio claiming I write software should be software I wrote.

## Some context on who is typing

I ran Duonorth from 2017 to 2025. It began as a business intelligence consultancy, expanded into digital strategy and marketing around 2020, and focused on websites and software from 2023. In July 2025, I moved into independent software product development as my main occupation.

Current projects include [Turistar](https://github.com/andre-lmarinho/travel-planner), an open-source planner for my own trips; [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp), a CLI on npm for the project setup I got tired of assembling by hand; and [client work](/projects) in production.

That is a lot of decisions to keep track of as I build on earlier work with data, automations and websites, and go deeper into TypeScript, databases and automated tests. Some of those decisions are wrong. I would like them written down somewhere they can be argued with.

## What goes here

I want to write about things I built and how they broke, including choices I later undid and the bug that ate an afternoon when it should have taken ten minutes. Some of those will only need a short note.

Two are up already: [what changes when AI writes most of your code](/posts/learning-to-code-with-ai), and [the work that led me here](/posts/before-i-called-it-code).

Code for this site is on [GitHub](https://github.com/andre-lmarinho/me). If I got something wrong, tell me.
