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

This runs on Next.js, TypeScript and Tailwind. Posts are markdown files in a folder. No CMS, no database, no admin panel: a blog with one post in it needs none of that, and I would rather add each piece the day it actually hurts to be missing. Everything renders to static HTML at build time.

I wrote it from scratch instead of starting from a template, which cost me a weekend I could have skipped. Worth it anyway. A portfolio claiming I write software should be software I wrote.

## Some context on who is typing

For eight years I ran a digital marketing agency, where my work moved from strategy into websites, automations and software. In 2025, development became my full-time focus.

Since then: [Turistar](https://github.com/andre-lmarinho/travel-planner), open source, which plans my own trips. [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp), a CLI on npm that scaffolds the project setup I got tired of assembling by hand. And [client work](/projects) in production with paying subscribers.

That is a lot of decisions made fast, after years of solving problems with code but far less time owning the engineering end to end. Some of those decisions are wrong. I would like them written down somewhere they can be argued with.

## What goes here

Things I built and how they broke. Choices I made and later undid. The bug that ate an afternoon and should have taken ten minutes. Short notes when a note is enough.

Two are up already: [what changes when AI writes most of your code](/posts/learning-to-code-with-ai), and [the eleven years before any of this was my job](/posts/before-i-called-it-code).

Code for this site is on [GitHub](https://github.com/andre-lmarinho/me). If I got something wrong, tell me.
