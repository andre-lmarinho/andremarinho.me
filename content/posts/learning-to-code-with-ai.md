---
title: Learning to Code When AI Writes the Code
description: I started writing software in 2025, when AI could already write most of it for me. The habit that mattered was refusing to ship anything I could not explain.
date: 2026-07-27
tags: ai, learning, career
---

It works and I don't know why.

That is the most dangerous sentence I can say about my own code, and it got very easy to say. I started writing software in 2025, the year AI got good enough to write most of it for me. I have never learned to code without it.

I am not interested in whether that makes me a worse developer. The tool is here, I use it every day, and I would be slower and poorer without it. The question I care about is narrower: when the machine hands you working code, what separates learning something from collecting something?

## The failure mode is silent

Broken code fails loudly. You get a stack trace, a red test, a page that will not load. You fix it, and in fixing it you learn where you were wrong.

Working code you do not understand fails quietly, and it fails later. Not on the day it is written. On the day the requirement changes, or the edge case finally shows up in production, or someone asks why it was done this way and the honest answer is that a model suggested it and the tests were green.

The place this scares me most is multi-tenancy. [LawFlow](https://lawflowhub.com) keeps each law firm's data separated by row-level security policies in Postgres. That code is short. It reads as though it were obvious. And if it is subtly wrong, nothing breaks: the app keeps working, the tests keep passing, and one firm sees another firm's clients. There is no stack trace for that. There is only whether I understood the policy I shipped.

## I had seen this before, in marketing

For eight years I ran a digital marketing agency, and the same failure had a different costume.

Someone would find a competitor's funnel and copy it. Same offer structure, same ad angles, same email sequence, same landing page. Sometimes it worked for a while, which was the worst possible outcome, because it confirmed the method.

Then something moved. The traffic source got more expensive, the audience shifted, the competitor dropped their price. And there was nothing to do, because there was no model of why any of it had been built that way in the first place. You cannot adjust a strategy you do not have. You can only go copy a newer one.

A copied strategy is not a strategy. It is a screenshot of someone else's.

AI-generated code is the same object. Often a very good one, drawn from more codebases than I will read in my life. But it is not a decision until I can say why it is this and not the other thing, and until then I am holding a screenshot.

## What I actually do about it

None of this is a workflow I recommend to anyone else. It is what I do because I know exactly which mistake I am prone to.

1. **Ask for the reasoning before the code.** What were the alternatives, and why this one. I read that first. If the answer comes back generic, the code is usually generic too, and that is a signal about the prompt more than the model.

2. **Explain it out loud before merging.** Not to anyone in particular. If I cannot say what a block does and what would break without it, I have not read it, I have skimmed it.

3. **Delete and rewrite the parts I will have to live with.** For the core of a feature, I close the suggestion and write it again from memory. It is slow, so I reserve it for code I know I will come back to. If I cannot reproduce it, I did not learn it. I watched it.

4. **Write down why.** [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp) has 35 architecture decision records in it. The value was never the documentation. It was that "we chose X over Y because Z" is impossible to write when you do not know Z, so the gap has to come out into the open where I can see it.

5. **Break it on purpose.** Change a value, remove a guard, delete a line, and watch what fails. If nothing fails, either the code does nothing or the tests do not cover it, and both of those are worth finding out on a Tuesday instead of in production.

## What it is genuinely good for

The scolding version of this post would stop here, and it would be wrong.

AI is very good at the fifth CRUD form, at wiring I have already wired four times, at the boilerplate that teaches nothing on the sixth repetition. It is better than any tutorial I have found at explaining unfamiliar code, which turns out to be most of the job: reading a library's source and asking why it does something strange is the fastest learning loop I have ever had.

And the speed is real. I shipped a SaaS to production with paying subscribers in my first year of full-time development. That timeline did not exist before.

The goal was never to write code without help. It is to never be in a position where the only reason something works is that a model said so.

I wrote about [how I got here before any of this was my job](/posts/before-i-called-it-code), and about [why this site exists](/posts/hello-world). If you think I have this wrong, I would like to hear it.
