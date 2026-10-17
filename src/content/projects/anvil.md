---
title: Anvil
description: A browser IDE for working with an AI agent, inspecting its changes, and running the result in the same workspace.
date: 2026-05-22
tags: TypeScript, WebSockets, Git, xterm.js
image: /images/projects/anvil.webp
kind: browser IDE
---

## Context

The client needed a browser workspace where a developer could ask an agent for a change, inspect the files it edited, and run the result. The editor, terminal, and preview had to stay in sync as the agent worked; a stale panel could show code that was no longer running.

## My role

I led technical delivery on a three-person team, defined the architecture and stack, and reviewed the other developers' pull requests. I built the three-panel workspace and worked with the team on the backend and infrastructure that connected the agent, project files, and running processes.

## Scope

The team delivered:

- an agent conversation that planned and applied file changes;
- a navigable file tree and syntax-highlighted editor;
- a browser terminal backed by a real PTY;
- streamed agent, file, and process events;
- a Code/Preview workflow with hot reload;
- Git checkpoints for agent steps;
- controls for running and deploying the project.

Each project ran in an isolated, temporary environment. Project data, sessions, tool calls, and checkpoints were persisted, while WebSockets carried terminal output, file events, and agent updates.

## Decisions

### Keep the development loop in one frame

Conversation, files, code, process output, and preview belonged in the same workspace because each explains the state of the others. Moving them into separate pages would make the user reconstruct that state mentally.

### Treat live output as product state

The interface had to keep file events, terminal output, and agent progress in sync so that a stale panel would not contradict another.

### Make reversibility visible

Each agent step became a Git checkpoint that the developer could inspect or return to from the interface.

## Disclosure

The client asked not to be named. "Anvil," its identity, sample project, data, and interface were created or altered for this portfolio reconstruction. The image shows an agent plan and changed files beside a TypeScript editor, development-server output, branch state, and Run and Deploy controls.

The capabilities and my role describe the delivered engagement; the published visual does not reproduce the client's original product. No client repository or production metric is public.
