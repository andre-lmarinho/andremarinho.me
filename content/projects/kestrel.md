---
title: Kestrel
description: An Outlook email and calendar agent whose per-tool permissions, human approvals, and audit trail make every external action visible.
date: 2026-01-22
tags: TypeScript, Next.js, Node.js, PostgreSQL, MCP, Microsoft Graph, React, SSE
image: /images/projects/kestrel.webp
kind: AI agent
---

## Context

An agent connected to email and calendars needs different permissions for reading a message, drafting a reply, sending it, and deleting an event.

The client product brought work and personal Outlook accounts into one conversation. The frontend had to make two things clear at all times: what the agent was trying to do, and whether it was allowed to do it without asking.

## My role

I led technical delivery on a three-person team, defined the architecture and stack, and reviewed the other developers' pull requests. I worked across the frontend, backend, and infrastructure.

I built the agent conversation, tool-call cards, connected-account setup, permission matrix, approval states, and activity timeline, and shared implementation of the backend and infrastructure with the team.

## Scope

The team delivered:

- natural-language email and calendar workflows across several Outlook accounts;
- visible tool calls for searches, drafts, free-time checks, sends, and calendar changes;
- per-tool policies of Auto, Ask, or Off;
- mandatory approval for sensitive external actions;
- connected-account and MCP-server management;
- an audit timeline for agent activity;
- streamed agent output and tool state over SSE.

The web application used Next.js and a tRPC API, with PostgreSQL and Drizzle for persistence. Separate Node.js MCP services integrated Microsoft Graph through OAuth2 with PKCE, incremental synchronization, and webhooks. Account credentials stayed behind those services; the agent received scoped tools.

## Evidence

The reconstructed agent view above shows an email search rendered as a tool-call card beside calendar and inbox context.

The broader interface also covered permissions, connections, and activity history. All account names, messages, dates, and activity in the reconstruction are synthetic. The visual documents the interaction design and state model; it is not customer data or a screenshot of the original client interface.

## Decisions

### Turn permissions into interface state

Policy could not live only in a backend rule. Each tool exposed its current level—Auto, Ask, or Off—and sensitive actions remained visibly distinct before the user reached an approval prompt.

### Render tool calls as first-class objects

A prose response is not enough when an agent can affect another system. Arguments, results, status, account, and approval state were represented explicitly so the user could audit the path from request to side effect.

### Use MCP as the capability boundary

The product gave the agent a defined set of tools instead of a Microsoft Graph token. That kept account access and scopes behind a boundary the permission interface could describe.

## Outcome

The team delivered one workflow for email and calendar across multiple Outlook accounts, where users could set permissions, approve sensitive actions, and review what the agent had done.

## Disclosure

This was client work completed by a three-person team. The client asked not to be named. "Kestrel," its identity, accounts, messages, data, and interface were created or altered for this portfolio reconstruction.

The product capabilities and my responsibilities describe the original engagement. The published visual does not expose the client, its users, or its production environment. No client repository or production metric is public.
