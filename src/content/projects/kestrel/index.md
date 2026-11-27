---
title: Kestrel
description: An agent for Outlook email, calendars, files, notes, and messages, with visible permissions and approval for sensitive actions.
date: 2026-01-22
tags: TypeScript, Node.js, MCP, Microsoft Graph, SSE
alt: Kestrel anonymised application and reconstructed homepage
---

## Context

An agent connected to Microsoft accounts needs different permissions to search a message, draft a reply, send it, or change a calendar. The same boundary matters when it can reach files and notes.

The client product brought work and personal Microsoft accounts into one conversation across Outlook, Calendar, OneDrive, OneNote, and Teams. The interface had to make two things clear: what the agent was trying to do, and whether it could act without asking.

## My role

I led technical delivery for the three-person team, chose the architecture and stack, and reviewed pull requests. I built the conversation and account-management interface, including tool-call cards, permissions, approvals, and the activity timeline. Backend and infrastructure implementation was shared with the team.

## Scope

The team delivered:

- natural-language search and communication workflows across Outlook, Calendar, OneDrive, OneNote, and Teams;
- visible tool calls for searches, drafts, free-time checks, sends, and calendar changes;
- per-tool policies of Auto, Ask, or Off;
- recorded human approval for sensitive external actions, including sends, scheduling, and deletions;
- connected-account and MCP-server management;
- an audit timeline for agent activity;
- streamed agent output and tool state over SSE.

The Next.js application called a tRPC API. Separate Node.js MCP services connected to Microsoft Graph through OAuth2 with PKCE, incremental synchronization, and webhooks. The agent received defined tools rather than a Microsoft Graph token; refresh tokens were encrypted, and access scopes were limited by account.

## Decisions

### Turn permissions into interface state

Each tool displayed its policy, Auto, Ask, or Off, so users could see what was allowed before an action. Sends, scheduling, and deletions needed approval, with the decision recorded in the activity history.

### Render tool calls as first-class objects

A prose response is not enough when an agent can affect another system. Arguments, results, status, account, and approval state were represented explicitly so the user could audit the path from request to side effect.

### Use MCP as the capability boundary

The product gave the agent a defined set of tools instead of a Microsoft Graph token. That kept account access and scopes behind a boundary the permission interface could describe.

## Disclosure

The client asked not to be named. "Kestrel," its identity, accounts, messages, dates, activity, and interface were created or altered for this portfolio reconstruction. The image shows an email search as a tool-call card beside calendar and inbox context.

The capabilities and my responsibilities describe the delivered product. The visual uses synthetic data and does not reproduce the client's original interface. No client repository or production metric is public.
