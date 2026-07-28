---
title: I Was Building Software Before I Called It Code
description: Before I was a developer I was a finance assistant with a spreadsheet problem. What dashboards, inventory tools and eight years of agency work did and did not teach me.
date: 2026-07-27
tags: career, story, marketing
---

In 2014 I worked in the finance department of a medical device distributor in Salvador. My job was reconciling invoices and putting together the cash flow report, which took most of a day, every month, and which I hated.

So I automated it with Excel and VBA. I did not think of that as programming. I thought of it as getting my afternoon back.

Eleven years later I write software full time, and the thing I keep noticing is how much of what I use now I picked up in rooms where nobody would have called it engineering.

## The dashboard that was secretly a database

The report I automated grew into a panel that pulled the company's finances into one place.

Nobody taught me anything about data modelling, and I could not have used the words. But you cannot build that thing without learning, the hard way, that the numbers lived in five places and disagreed with each other. That a single source of truth is a decision somebody has to make and then defend, not a state the world arrives in. That the person opening the panel does not want everything known about the finances, they want the answer to one question, and if you show them everything you have shown them nothing.

I learned what a database is by needing one and not having one.

## Then they moved me to logistics

In 2015 I became logistics supervisor for the same company: inventory and distribution of medical supplies across several states, plus the buying, including imports.

I built a tool to run stock control and support the purchasing decisions, with tracking dashboards on top of it.

That one taught me modelling, again without the vocabulary. A unit in stock is not one thing. It is committed, or in transit, or sitting in customs, or on a shelf, or about to expire, and treating those as the same number is how you promise a hospital something you do not have. Lead time is not a property of a product, it is state that changes. An import decision made this week is a bet on a number six weeks out.

The tooling was never the hard part. Deciding what was true was the hard part.

## Eight years of deciding what to build

In 2017 I left to start Duonorth Studio, a digital marketing agency, and ran it until 2025.

There was code in it every day: WordPress themes, HTML, CSS, JavaScript, PHP, plus automations in Apps Script and VBA holding the operation together. I directed builds of client sites and products, and led a performance project that took a client site from a Lighthouse score of 37 to 98 and its load time from over four seconds to about one.

But the part that mattered most was not the code. Running the agency is where I learned to tell what a client needs from what a client asked for. How to say no to a feature. That an interface exists to move a number somebody cares about, and if you cannot name the number you are decorating. That most software problems are scoping problems wearing a technical costume.

I sold, priced and scoped software for eight years. I watched other people build it. Then in 2025 I stopped doing that and started building it myself.

## What transferred

More than I expected.

The instinct to ask where the data actually lives before designing anything on top of it. Reading a requirement for the need underneath it. Knowing what the person on the other end will do with the answer, which decides the interface more than any design system does. Scoping. Shipping something imperfect on a date, because a perfect thing in November was worth less than a rough thing in August.

## What did not

Everything about being correct at scale.

Tests, type systems, migrations you cannot undo, concurrency, code review as a discipline rather than a formality, security boundaries, and the whole distance between "it runs on my machine for one user" and "it runs for every tenant, forever, while somebody actively tries to break it." A Power BI dashboard has no adversary. A multi-tenant SaaS with row-level security has nothing but.

So the tidy version of this story would be that I was always a developer and just did not know it, and I do not think that is true. Half of it is. The instincts were real and they saved me a great deal of time. The craft was not there at all, and telling myself otherwise would be the fastest way to never build it.

What the eleven years actually bought me was a shorter list of things I had to learn, and a clear view of which ones they were.

I wrote more about the learning part in [what changes when AI writes most of your code](/posts/learning-to-code-with-ai). The current work is on [GitHub](https://github.com/andre-lmarinho) and in [LawFlow](https://lawflowhub.com).
