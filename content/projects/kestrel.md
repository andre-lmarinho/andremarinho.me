---
title: Kestrel
description: An AI agent for Outlook mail and calendar over MCP, where the user permissions every tool it can call and every action it takes lands in an audit trail.
date: 2026-01-22
tags: Next.js, TypeScript, tRPC, MCP, Microsoft Graph, PostgreSQL, Redis, Drizzle
image: /images/projects/kestrel.webp
---

Kestrel connects your Outlook accounts, work and personal, to an AI agent through MCP servers. In one conversation you read and draft mail, find a free hour across both calendars and send the invite, without picking which mailbox you meant.

The premise is that an agent with access to your inbox is only useful if you trust it, and trust here is not a promise in the marketing copy. It is a permission model.

*Delivered for a client who asked not to be named. The name and interface shown here were rebuilt so the work can be shown without identifying them.*

## What it does

- **One agent across mail and calendar**, in the same thread, across several connected accounts at once.
- **Drafts before sends.** It prepares the reply and waits. Nothing leaves without an explicit approval.
- **Free-time search across calendars**, then creates the event and invites the participants.
- **Full control of the setup.** Turn MCP servers on and off, inspect their config, swap the model.

## Least privilege, made concrete

Every tool the agent can call has a policy the user sets: auto, ask, or off. Anything that mutates the outside world, sending mail, creating an event, deleting one, is marked sensitive and cannot run on auto. It stops, asks, and records who approved it and when.

On top of that sit global guardrails checked before any side effect, covering things like confirming before deletion and respecting working hours. Every tool call, approved or not, is appended to an audit log. If you cannot answer "what did it do last Tuesday", the product has failed at its actual job.

## Why MCP is the boundary, not a buzzword

The app never talks to Microsoft Graph. It talks to MCP servers, and those talk to Graph.

That indirection is what keeps credentials and scopes out of the product surface. The agent gets a set of tools, not a token. Swapping a provider or adding one becomes a server change rather than a rewrite, and the blast radius of a bug in the agent loop stops at the tools it was granted.

Accounts connect over OAuth2 with PKCE and minimum scopes. Sync is incremental through delta queries, with Graph change notifications for near real time. Email bodies are fetched on demand and never replicated into the database, which keeps the local store to metadata and keeps the sensitive part where it already lives. Refresh tokens are encrypted at rest.

## Stack

Next.js and React 19 with tRPC and Zod for the product API, MCP servers as separate Node services scaled independently, Postgres with Drizzle for tenant, connection and governance data, Redis with BullMQ for delta sync, subscription renewal and webhook reprocessing. Webhook ingestion is idempotent, validated with a constant-time comparison, and persisted before it is processed.
