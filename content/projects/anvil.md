---
title: Anvil
description: A browser IDE that keeps an AI agent, code, a real terminal, live preview, and reversible Git checkpoints in one workspace.
date: 2026-05-22
tags: React, TypeScript, xterm.js, WebSockets, Git
image: /images/projects/anvil.webp
kind: browser IDE
---

## Context

Agentic coding spans a conversation, a filesystem, running processes, and the application those processes produce. The client needed those parts in one browser workspace, where a developer could ask for a change, watch it reach the files, follow the command output, and inspect the result without losing track of what the agent had changed.

The harder frontend problem was coherence. Agent output, tool calls, file events, terminal output, and preview state arrived continuously. A screen that was only slightly behind could make the user trust code that was no longer current.

## My role

I led the technical direction on a three-person team, with the product interface and frontend architecture as my primary area of ownership. My frontend work focused on the three-panel workspace; I also contributed across the backend and infrastructure, set the stack and quality bar, and reviewed the other developers’ pull requests.

## Scope

The team delivered:

- an agent conversation that planned and applied file changes;
- a navigable file tree and syntax-highlighted editor;
- a browser terminal backed by a real PTY;
- streamed agent, file, and process events;
- a Code/Preview workflow with hot reload;
- Git checkpoints for agent steps;
- controls for running and deploying the project.

The sandbox orchestration and persistence model were part of the team’s delivery. They are context for the interface, not a claim that I implemented every infrastructure component alone.

## Evidence

The reconstructed workspace above is the visual I can publish. It shows the agent plan and changed files beside a TypeScript editor, live development-server output, branch state, and Run and Deploy controls.

It documents the interaction model and the frontend surface I worked on. It is not a screenshot of the client’s original interface.

## Decisions

### Keep the development loop in one frame

Conversation, files, code, process output, and preview belonged in the same workspace because each explains the state of the others. Moving them into separate pages would make the user reconstruct that state mentally.

### Treat live output as product state

File events, terminal output, and agent progress were not decorative logs. The interface had to represent them as concurrent state without letting one stale panel contradict another.

### Make reversibility visible

Each agent step became a Git checkpoint. Git was not only an implementation detail; it was the safety model that let the interface show that generated work could be inspected and recovered.

## Outcome

The team delivered a browser workspace that joined agent interaction, code editing, terminal execution, live preview, and version history into one workflow. Autonomous changes became observable and recoverable instead of disappearing behind a chat response.

## Disclosure

This was client work completed by a three-person team. The client asked not to be named. “Anvil,” its identity, sample project, data, and interface were created or altered for this portfolio reconstruction.

The capabilities and my role describe the delivered engagement; the published visual does not reproduce the client’s original product. No client repository or production metric is public.
