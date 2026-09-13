---
title: Learning While AI Writes the Code
description: Years of automations and web development do not make every new part of the stack familiar. How I keep learning while working with AI.
date: 2026-06-21
tags: ai, learning, career
---

It works and I don't know why.

That is the most dangerous sentence I can say about my own code, and it got very easy to say. By the time software product development became my main focus in July 2025, I had already spent years building automations and websites. Now I use AI while going deeper into TypeScript, databases, authentication and automated tests.

That earlier work gave me useful experience, but it does not mean I understand every new part of the stack. A tool can generate a working solution before I have worked out why that solution makes sense.

When I encounter something unfamiliar, it is tempting to accept the code and move on. The interface works, the tests pass, and the gap in my understanding stays out of sight.

I use AI every day, and I would be slower and poorer without it. What I want to understand is how much I learn when the machine hands me working code, and how much I simply collect.

## The failure that teaches, and the one that doesn't

Broken code fails loudly. You get a stack trace, a red test, a page that will not load. You fix it, and in fixing it you learn where you were wrong. That was the old deal: the bug was the tuition.

The deal is still on offer, but the window is much shorter. Paste the error back, the fix comes down, the page loads, and you can be past it in forty seconds without ever having formed a theory of what went wrong. The failure still happens. Whether it teaches anything now depends entirely on whether you stopped to look, and there is a great deal of pressure not to stop.

I have to keep choosing to spend time on a failure even when I could get a fix immediately.

Working code I do not understand can leave that gap hidden until a requirement changes or an edge case shows up in production. Sometimes someone asks why I built it that way, and all I can say is that a model suggested it and the tests were green.

The place this scares me most is multi-tenancy. In [LawFlow, the client CRM I built](/projects/lawflow), each firm's data is separated by row-level security policies in Postgres. That code is short. It reads as though it were obvious. And if it is subtly wrong, nothing breaks: the app keeps working, the tests keep passing, and one firm sees another firm's clients. There is no stack trace for that. There is only whether I understood the policy I shipped.

## I had seen this before, in marketing

When Duonorth expanded into marketing around 2020, I saw a similar problem with campaign strategies.

Someone would find a competitor's funnel and copy it. Same offer structure, same ad angles, same email sequence, same landing page. Sometimes it worked for a while, which was the worst possible outcome, because it confirmed the method.

Then something moved. The traffic source got more expensive, the audience shifted, the competitor dropped their price. And there was nothing to do, because there was no model of why any of it had been built that way in the first place. You cannot adjust a strategy you do not have. You can only go copy a newer one.

A copied funnel gives you a screenshot of someone else's strategy, with very little of the reasoning behind it.

AI-generated code can leave me in the same position, even when it draws on more codebases than I will read in my life. I still need to understand why this approach fits before I can adapt it to a change.

## What understanding buys you, concretely

Spending time on a problem helps me give better instructions the next time I encounter it.

Every problem I actually sat with turns into a better instruction the next time. The first version of a feature gets described as what I want. The second version gets described as what I want, minus the four things I now know go wrong. That second description is worth more than the code that came out of the first one, and it is not something a model can hand me. It is the residue of having watched something break and bothered to find out why.

That improvement depends on understanding the code, whoever typed it. When I can describe a failure I have investigated, I can ask the model to account for it.

There is a second thing, harder to justify on a timesheet. When the mechanical part is handled, there is room to be curious about the domain instead of the syntax. I have read more about how Postgres actually evaluates a policy, or what a queue guarantees and does not, than I would have if I had been heads-down fighting the language. The headroom is real. It just has to be spent on something, and it will go to whatever you point it at, including nothing.

## What I actually do about it

These are the habits I use to catch myself accepting code before I understand it.

1. **Ask for the reasoning before the code.** What were the alternatives, and why this one. I read that first. If the answer comes back generic, the code is usually generic too, and that is a signal about the prompt more than the model.

2. **Explain it out loud before merging.** I do this even when I am alone. If I cannot say what a block does and what would break without it, I need to read it more carefully.

3. **Delete and rewrite the parts I will have to live with.** For the core of a feature, I close the suggestion and write it again from memory. It is slow, so I reserve it for code I know I will come back to. If I cannot reproduce it, I need to work through it again.

4. **Write down why.** [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp) has 35 architecture decision records in it. Explaining why I chose one approach over another makes it obvious when I cannot justify a decision yet.

5. **Break it on purpose.** Change a value, remove a guard, delete a line, and watch what fails. If nothing fails, either the code does nothing or the tests do not cover it, and both of those are worth finding out on a Tuesday instead of in production.

## What I still don't know

I do not know yet whether this holds up.

The concern I cannot dismiss is that iterating faster means encountering more problems per hour and understanding each one less. I have opinions about a lot of things I have only met once, through a failure that got fixed quickly, and I cannot always tell which of those I know and which I merely recognize.

What I can say is that the gap shows up eventually, and it shows up as a specific kind of silence: a question I cannot answer about code that is already running. I have collected a few of those. They are the most useful thing I have, because they are the only reliable signal of where the screenshot ends.

AI is very good at the fifth CRUD form, at wiring I have already wired four times, at the boilerplate that teaches nothing on the sixth repetition. It is better than any tutorial I have found at explaining unfamiliar code, which turns out to be most of the job. It helps me move faster, which makes it more important to keep track of the decisions I can explain and the ones I still need to study.

I want to be able to explain why the code works, even when I had help writing it. These tools make it easy to skip the investigation, so I have to keep making time for it.

I wrote about [how my earlier work led me here](/posts/before-i-called-it-code), and about [why this site exists](/posts/hello-world). If you think I have this wrong, I would like to hear it.
