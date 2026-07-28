---
title: Anvil
description: A browser IDE where an AI agent plans, writes and runs code in an isolated sandbox, with every step committed to Git so any change can be walked back.
date: 2026-05-22
tags: React, TypeScript, Node, Firecracker, WebSockets, Git, PostgreSQL, Redis
image: /images/projects/anvil.webp
---

Anvil is a code editor and AI agent that runs in the browser. You describe what you want built, and the agent plans it, writes the files, runs the commands and shows you the app running, with the editor, terminal and live preview side by side.

It takes the loop that agentic CLIs made popular and gives it the thing a terminal cannot: you watch the diff land in the editor and the result render next to it, in the same second.

*Delivered for a client who asked not to be named. The name and interface shown here were rebuilt so the work can be shown without identifying them.*

## What it does

- **Agent chat that edits code**, planning the files first and then applying diffs that stream into the editor as they are written.
- **A real terminal.** A PTY inside the sandbox bridged to the browser, carrying the dev server output as it happens rather than a captured log.
- **Code and preview toggle**, with the running app served on a per-session subdomain with hot reload.
- **One-click deploy** to the edge once it works.

## The sandbox is the product

Every project gets its own isolated, disposable environment: a real filesystem, a real process tree, CPU and memory bounds, and a network egress policy. Isolation is a microVM or a container under gVisor, one per session, so an agent running arbitrary generated code cannot reach the host or another tenant.

The environments snapshot and resume, which is what makes the thing usable. Coming back to a project restores it in seconds instead of reinstalling dependencies, because the filesystem is content-addressed and the environment state is restored rather than rebuilt.

## Undo is the safety net

Every step the agent takes becomes a Git commit on a session branch. Not a periodic autosave, not a diff buffer: an actual commit with a message, which means any state in a session is recoverable and any agent decision can be walked back without unwinding the ones after it.

Git is the source of truth for code. Postgres holds the metadata around it, including sessions, messages, tool calls, checkpoints and deployments, so the conversation and the repository stay in step. Destructive commands stop and ask before running.

## Stack

An orchestrator provisioning sandboxes and multiplexing WebSockets for the terminal, file events and agent token stream. Firecracker or gVisor for isolation, Git through a library rather than a shell, Postgres for metadata, Redis for the build queue and the warm sandbox pool, and object storage for content-addressed blobs and snapshots. React 19, TypeScript and Tailwind CSS 4 on the front, with the agent loop running on Claude through a tool-use interface over the filesystem.
