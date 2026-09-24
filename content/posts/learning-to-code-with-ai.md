---
title: Learning While AI Writes the Code
description: How I use AI to build software while making time to understand the code, investigate failures, and test my assumptions.
date: 2026-06-21
tags: ai, learning, career
---

It works and I don't know why.

That is the most dangerous sentence I can say about my own code, and it got very easy to say. By the time software product development became my main focus in July 2025, I had already spent years building automations and websites. Now I use AI while going deeper into TypeScript, databases, authentication and automated tests.

When I encounter something unfamiliar, a tool can generate a working solution before I understand why it works. It is tempting to accept the code and move on: the interface works, the tests pass, and the gap stays out of sight.

I use AI every day, and I would be slower and poorer without it. What I want to understand is how much I learn when the machine hands me working code, and how much I simply collect.

## The failure that teaches, and the one that doesn't

Broken code fails loudly. You get a stack trace, a red test, a page that will not load. You fix it, and in fixing it you learn where you were wrong. That was the old deal: the bug was the tuition.

The deal is still on offer, but the window is much shorter. Paste the error back, the fix comes down, the page loads, and you can be past it in forty seconds without ever having formed a theory of what went wrong. The failure still happens. Whether it teaches anything now depends entirely on whether you stopped to look, and there is a great deal of pressure not to stop.

Working code I do not understand can leave that gap hidden until a requirement changes or an edge case shows up in production. Sometimes someone asks why I built it that way, and all I can say is that a model suggested it and the tests were green.

The place this scares me most is multi-tenancy. A mistake in an access policy can expose one account’s data to another while the application appears to work normally. A passing test suite only helps if it checks that boundary. I need to understand what the policy allows and test who can access each record.

## I had seen this before, in marketing

When Duonorth expanded into marketing around 2020, I saw a similar problem with campaign strategies.

Someone would find a competitor's funnel and copy it. Same offer structure, same ad angles, same email sequence, same landing page. Sometimes it worked for a while, which was the worst possible outcome, because it confirmed the method.

Then something moved. The traffic source got more expensive, the audience shifted, the competitor dropped their price. And there was nothing to do, because there was no model of why any of it had been built that way in the first place. You cannot adjust a strategy you do not have. You can only go copy a newer one.

AI-generated code can leave me in the same position, even when it draws on more codebases than I will read in my life. I still need to understand why this approach fits before I can adapt it to a change.

## What understanding buys you, concretely

Every problem I actually sat with turns into a better instruction the next time. The first version of a feature gets described as what I want. The second version gets described as what I want, minus the four things I now know go wrong. That second description is worth more than the code that came out of the first one, and it is not something a model can hand me. It is the residue of having watched something break and bothered to find out why.

There is a second thing, harder to justify on a timesheet. When the mechanical part is handled, there is room to be curious about the domain instead of the syntax. I have read more about how Postgres actually evaluates a policy, or what a queue guarantees and does not, than I would have if I had been heads-down fighting the language. I have to choose to spend that time investigating.

## What I actually do about it

These are the habits I use to catch myself accepting code before I understand it.

1. **Ask for the reasoning before the code.** What were the alternatives, and why this one. I read that first. If the answer comes back generic, the code is usually generic too, and that is a signal about the prompt more than the model.

2. **Explain it out loud before merging.** I do this even when I am alone. If I cannot say what a block does and what would break without it, I need to read it more carefully.

3. **Delete and rewrite the parts I will have to live with.** For the core of a feature, I close the suggestion and write it again from memory. It is slow, so I reserve it for code I know I will come back to. If I cannot reproduce it, I need to work through it again.

4. **Write down why.** [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp) has 35 architecture decision records in it. Explaining why I chose one approach over another makes it obvious when I cannot justify a decision yet.

5. **Break it on purpose.** Change a value, remove a guard, delete a line, and watch what fails. If nothing fails, either the code does nothing or the tests do not cover it, and both of those are worth finding out on a Tuesday instead of in production.

## What I still don't know

The concern I cannot dismiss is that iterating faster means encountering more problems per hour and understanding each one less. I have opinions about a lot of things I have only met once, through a failure that got fixed quickly, and I cannot always tell which of those I know and which I merely recognize.

Questions I cannot answer about code that is already running show me where I need to spend more time. I have collected a few of those.

AI is very good at the fifth CRUD form, at wiring I have already wired four times, at the boilerplate that teaches nothing on the sixth repetition. It is better than any tutorial I have found at explaining unfamiliar code, which turns out to be most of the job. It helps me move faster, which makes it more important to keep track of the decisions I can explain and the ones I still need to study.

I wrote about [how my earlier work led me here](/posts/before-i-called-it-code), and about [why this site exists](/posts/hello-world). If you think I have this wrong, I would like to hear it.
