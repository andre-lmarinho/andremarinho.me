---
title: Learning to Code When AI Writes the Code
description: I moved into full-time software development in 2025, when AI could already write most of the code. Skipping the learning is a real option now.
date: 2026-06-21
tags: ai, learning, career
---

It works and I don't know why.

That is the most dangerous sentence I can say about my own code, and it got very easy to say. I moved into full-time software development in 2025, the year AI got good enough to write most of it for me. I have never learned to code without it.

Most of what I read about this is written by people who learned first and got the tool second. For them AI removed a toll booth: they already knew the roads, and now they pay less to drive them. I never paid the toll. I arrived after it was gone.

That is a different situation, and it comes with a different temptation. If you started when the machine could already write the thing, skipping the part where you understand it is not a slippery slope you have to be talked into. It is the default. It is faster, it works, and nobody can tell from the outside of the software side.

So the question I care about is not whether AI makes me a worse programmer. The tool is here, I use it every day, and I would be slower and poorer without it. The question is narrower: when the machine hands you working code, what separates learning something from collecting something?

## The failure that teaches, and the one that doesn't

Broken code fails loudly. You get a stack trace, a red test, a page that will not load. You fix it, and in fixing it you learn where you were wrong. That was the old deal: the bug was the tuition.

The deal is still on offer, but the window is much shorter. Paste the error back, the fix comes down, the page loads, and you can be past it in forty seconds without ever having formed a theory of what went wrong. The failure still happens. Whether it teaches anything now depends entirely on whether you stopped to look, and there is a great deal of pressure not to stop.

I have come to think that is the actual skill this era asks for. Not writing code from scratch. Choosing, over and over, to spend time on a failure you could have skipped.

Because the other kind of failure gives you no such choice. Working code you do not understand fails quietly, and it fails later. Not on the day it is written. On the day the requirement changes, or the edge case finally shows up in production, or someone asks why it was done this way and the honest answer is that a model suggested it and the tests were green.

The place this scares me most is multi-tenancy. In [the SaaS I run](/projects/lawflow), each firm's data is separated by row-level security policies in Postgres. That code is short. It reads as though it were obvious. And if it is subtly wrong, nothing breaks: the app keeps working, the tests keep passing, and one firm sees another firm's clients. There is no stack trace for that. There is only whether I understood the policy I shipped.

## I had seen this before, in marketing

For eight years I ran a digital marketing agency, and the same failure had a different costume.

Someone would find a competitor's funnel and copy it. Same offer structure, same ad angles, same email sequence, same landing page. Sometimes it worked for a while, which was the worst possible outcome, because it confirmed the method.

Then something moved. The traffic source got more expensive, the audience shifted, the competitor dropped their price. And there was nothing to do, because there was no model of why any of it had been built that way in the first place. You cannot adjust a strategy you do not have. You can only go copy a newer one.

A copied strategy is not a strategy. It is a screenshot of someone else's.

AI-generated code is the same object. Often a very good one, drawn from more codebases than I will read in my life. But it is not a decision until I can say why it is this and not the other thing, and until then I am holding a screenshot. The screenshot works right up until something moves.

## What understanding buys you, concretely

The reason to do the slow thing is not virtue. It is that the understanding comes back as leverage, and it comes back fast.

Every problem I actually sat with turns into a better instruction the next time. The first version of a feature gets described as what I want. The second version gets described as what I want, minus the four things I now know go wrong. That second description is worth more than the code that came out of the first one, and it is not something a model can hand me. It is the residue of having watched something break and bothered to find out why.

This is the compounding loop, and it runs on understanding specifically. Not on having typed the code myself. A model can only be as precise as the person steering it, and precision is made of things you learned the hard way.

There is a second thing, harder to justify on a timesheet. When the mechanical part is handled, there is room to be curious about the domain instead of the syntax. I have read more about how Postgres actually evaluates a policy, or what a queue guarantees and does not, than I would have if I had been heads-down fighting the language. The headroom is real. It just has to be spent on something, and it will go to whatever you point it at, including nothing.

## What I actually do about it

None of this is a workflow I recommend to anyone else. It is what I do because I know exactly which mistake I am prone to.

1. **Ask for the reasoning before the code.** What were the alternatives, and why this one. I read that first. If the answer comes back generic, the code is usually generic too, and that is a signal about the prompt more than the model.

2. **Explain it out loud before merging.** Not to anyone in particular. If I cannot say what a block does and what would break without it, I have not read it, I have skimmed it.

3. **Delete and rewrite the parts I will have to live with.** For the core of a feature, I close the suggestion and write it again from memory. It is slow, so I reserve it for code I know I will come back to. If I cannot reproduce it, I did not learn it. I watched it.

4. **Write down why.** [create-mvp](https://www.npmjs.com/package/@andre.marinho/create-mvp) has 35 architecture decision records in it. The value was never the documentation. It was that "we chose X over Y because Z" is impossible to write when you do not know Z, so the gap has to come out into the open where I can see it.

5. **Break it on purpose.** Change a value, remove a guard, delete a line, and watch what fails. If nothing fails, either the code does nothing or the tests do not cover it, and both of those are worth finding out on a Tuesday instead of in production.

## The honest uncertainty

I do not know yet whether this holds up.

The concern I cannot dismiss is that iterating faster means encountering more problems per hour and understanding each one less. Broad and shallow instead of narrow and deep. I have opinions about a lot of things I have only met once, through a failure that got fixed quickly, and I genuinely cannot tell from the inside which of those I know and which I merely recognize.

What I can say is that the gap shows up eventually, and it shows up as a specific kind of silence: a question I cannot answer about code that is already running. I have collected a few of those. They are the most useful thing I have, because they are the only reliable signal of where the screenshot ends.

AI is very good at the fifth CRUD form, at wiring I have already wired four times, at the boilerplate that teaches nothing on the sixth repetition. It is better than any tutorial I have found at explaining unfamiliar code, which turns out to be most of the job. And the speed is real: I shipped a SaaS to production with paying subscribers in my first year of full-time development, on a timeline that did not exist before.

The goal was never to write code without help. It is to never be in a position where the only reason something works is that a model said so. Starting in this era means nobody makes me pay that price up front. I have to keep choosing to.

I wrote about [how I got here before any of this was my job](/posts/before-i-called-it-code), and about [why this site exists](/posts/hello-world). If you think I have this wrong, I would like to hear it.
