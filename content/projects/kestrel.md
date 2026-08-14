---
title: Kestrel
description: An Outlook email and calendar agent whose per-tool permissions, human approvals, and audit trail make every external action visible.
date: 2026-01-22
tags: Next.js, React, TypeScript, SSE, MCP, Microsoft Graph
image: /images/projects/kestrel.webp
kind: AI agent
---

## Context

Connecting an agent to email and calendars creates a useful shortcut and a dangerous one. Reading a message, drafting a reply, sending it, and deleting an event cannot all carry the same level of authority.

The client product brought work and personal Outlook accounts into one conversation. The frontend had to make two things clear at all times: what the agent was trying to do, and whether it was allowed to do it without asking.

## My role

I led the technical direction on a three-person team, with the product interface and frontend architecture as my primary area of ownership. My frontend work covered the agent conversation, tool-call cards, connected-account setup, permission matrix, approval states, and activity timeline.

I also contributed across the backend and infrastructure, set the stack and quality bar, and reviewed the other developers’ pull requests.

## Scope

The team delivered:

- natural-language email and calendar workflows across several Outlook accounts;
- visible tool calls for searches, drafts, free-time checks, sends, and calendar changes;
- per-tool policies of Auto, Ask, or Off;
- mandatory approval for sensitive external actions;
- connected-account and MCP-server management;
- an audit timeline for agent activity;
- streamed agent output and tool state over SSE.

Microsoft Graph sat behind MCP services, while the web product received capabilities rather than exposing account credentials to the agent interface.

## Evidence

The reconstructed agent view above documents the publishable interaction: an email search rendered as a tool-call card beside calendar and inbox context.

The broader interface also covered permissions, connections, and activity history. All account names, messages, dates, and activity in the reconstruction are synthetic. The visual documents the interaction design and state model; it is not customer data or a screenshot of the original client interface.

## Decisions

### Turn permissions into interface state

Policy could not live only in a backend rule. Each tool exposed its current level—Auto, Ask, or Off—and sensitive actions remained visibly distinct before the user reached an approval prompt.

### Render tool calls as first-class objects

A prose response is not enough when an agent can affect another system. Arguments, results, status, account, and approval state were represented explicitly so the user could audit the path from request to side effect.

### Use MCP as the capability boundary

The product gave the agent a defined set of tools instead of a Microsoft Graph token. That kept account access and scopes behind a boundary the permission interface could describe.

## Outcome

The team delivered one workflow for email and calendar across multiple Outlook accounts, with permissions, approvals, and activity history embedded in the product surface. The agent interface exposed its actions instead of asking the user to trust an invisible automation layer.

## Disclosure

This was client work completed by a three-person team. The client asked not to be named. “Kestrel,” its identity, accounts, messages, data, and interface were created or altered for this portfolio reconstruction.

The product capabilities and my responsibilities describe the original engagement. The published visual does not expose the client, its users, or its production environment. No client repository or production metric is public.
