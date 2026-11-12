---
title: DevLinger
description: A Linux tray monitor I built in Go to find development servers and Docker containers that are still running after the editor closes.
date: 2026-11-07
tags: Go, Linux, Docker, D-Bus, Performance
link: https://github.com/andre-lmarinho/dev.linger
images:
  01-cover.webp:
    alt: Illustrated DevLinger cover showing local services, ports and Docker containers
---

## Context

Closing an editor does not necessarily stop the server it started. The next time I need the same port, I have to work out what is still running and where it came from.

I built DevLinger to put that information in the Linux system tray. It looks for recognized development servers and running Docker containers, then shows what it finds without changing or stopping them.

## My role

I built the Go application, process and container discovery, tray integration, Linux packaging, tests, and performance benchmarks. The optimizations described below were merged into the main branch in [PR #4](https://github.com/andre-lmarinho/dev.linger/pull/4), and the [v0.3.2 release](https://github.com/andre-lmarinho/dev.linger/releases/tag/v0.3.2) shipped DEB, RPM, and AppImage packages with checksums.

## Scope

For recognized TCP listeners, DevLinger shows the project, port, Git branch, uptime, CPU, and memory when available. Docker containers can be grouped by Compose project. The menu refreshes every ten seconds and is read-only.

Detection uses explicit command signatures. Unknown listeners and sockets shared by multiple processes are omitted, so a missing service does not necessarily mean nothing is listening. Docker access is optional and uses a local Unix socket.

The app includes a desktop launcher and prevents multiple instances through D-Bus. Tray registration responds to watcher availability, with a fallback retry during startup. Packages enable autostart at login.

The cover is an illustration of the information the application presents, not a screenshot.

## Decisions

### Find the listener before doing more work

The monitor reads Linux process and socket information from `/proc`. I index the listener inodes and defer process recognition until a matching descriptor is found. A shared socket still has to be detected even when one of its owners is not a recognized server.

The command catalog also resolves each candidate path once per matching call instead of resolving it again for every signature. That matters for symlinked development tools, but it does not require a cache that survives between scans.

### Measure the whole scan

I compared the revision before both changes with the branch containing them. Across five alternating samples per version, the median scan time fell by **44%**. The benchmark initially observed 145 user processes and eight listeners, with no recognized services. It measured elapsed time for `Scan`, not CPU use or the cost of the real desktop tray.

I added stage and synthetic benchmarks as well as separate process CPU and RSS sampling. Those measurements answer different questions: Go allocations per operation are not the application's resident memory, and a short private-bus run cannot establish long-term desktop resource use.

The comparison covers one host and workload; Docker state and host activity were not controlled.
