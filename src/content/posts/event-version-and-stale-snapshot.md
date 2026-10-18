---
title: When the event version was current but the snapshot wasn't
description: A Turistar persistence bug let snapshot versions advance while retaining old content. The fix builds snapshot state on the server and sends it with the events.
date: 2026-07-28
tags: PostgreSQL, Event Sourcing, Supabase, Data Integrity
project: turistar
---

While investigating stored itinerary data in [Turistar](/projects/turistar) with SQL, I found that the snapshot content did not match the event history. The snapshot version could advance successfully while its itinerary stayed old or empty.

Appending the events advanced their version. Updating the snapshot content required an optional argument that the caller wasn't sending. The database accepted the append and recorded the new version, leaving readers with a misleading checkpoint.

The investigation led to a server-side snapshot builder, shipped in [the January 2026 change](https://github.com/andre-lmarinho/turistar/commit/7ef57059a9e79eaa7928b2e904016bdedb224ecf). It applies the events before persistence and sends the calculated state in the same database call as the event batch.

## What a snapshot version is supposed to mean

Turistar transports itinerary changes as events such as `activity.created`, `activity.moved`, and `day.reordered`. Each accepted event receives a monotonically increasing version within its plan. Other clients apply those events through the shared reducer.

A snapshot lets a reader start from a materialized itinerary instead of rebuilding the plan from its first event. For that to work, the snapshot's version must describe the events already reflected in its content:

```text
snapshot at version v + events v+1 through n = itinerary at version n
```

If the snapshot claims version `n` but still contains the itinerary from an earlier version, a client requesting only events after `n` cannot recover the missing changes. Comparing version numbers will not expose the missing content because the stored number itself is current.

## The caller omitted the content argument

The [repository before the fix](https://github.com/andre-lmarinho/turistar/blob/d4a77936cf63cca562ef53c1761f47402a8c59fc/src/features/app/planner/server/repositories/PlanEventsRepository.ts) called `append_plan_events` with `plan_id`, `base_version`, and `events`. It did not include `snapshot_state`.

The [SQL function accepted that omission](https://github.com/andre-lmarinho/turistar/blob/0cb77827fe3979d0dcd7adc7dd928b5e4ad1e2d8/supabase/migrations/20250212134000_append_plan_events.sql): `snapshot_state` defaulted to `NULL`. After inserting the events, the update used this expression:

```sql
UPDATE plan_snapshots
SET version = new_version,
    state = COALESCE(snapshot_state, plan_snapshots.state),
    updated_at = NOW()
WHERE plan_snapshots.plan_id = append_plan_events.plan_id;
```

With no new state supplied, `COALESCE` deliberately retained the previous state while the version advanced. When the function had to insert a missing snapshot, the equivalent fallback was `{"days":[]}`.

The event append and snapshot update could run together successfully and still produce an invalid checkpoint. Transactional execution could not compensate for the caller supplying events without their corresponding materialized state.

## Build the next state before appending

The corrected [server append flow](https://github.com/andre-lmarinho/turistar/blob/7ef57059a9e79eaa7928b2e904016bdedb224ecf/src/features/events/services/eventsQueries.ts) fetches the current snapshot, passes it and the incoming events to `buildSnapshotStateForAppend`, then supplies the resulting `snapshot_state` to the repository.

For a snapshot whose version matches `baseVersion`, the builder assigns the incoming events consecutive versions beginning at `baseVersion + 1`. It applies them with the same reducer used to interpret the event history and serializes the resulting days as JSON-safe state.

The database still checks `base_version` under its snapshot row lock. If another append wins between the server's read and its write, the database sees the version mismatch and returns the current version without inserting that batch. Calculating a snapshot on the server does not replace the database's concurrency check.

When the versions match and the server supplies the calculated state, the RPC writes events and their resulting snapshot together. The client does not need to follow a successful append with a separate snapshot update that could fail independently.

## Recover a known empty-snapshot failure

An empty snapshot with a nonzero version is a specific sign that this recovery path can investigate. The server fetches the plan's history from version zero, and the [snapshot builder](https://github.com/andre-lmarinho/turistar/blob/7ef57059a9e79eaa7928b2e904016bdedb224ecf/src/features/snapshots/services/snapshotStateBuilder.ts) checks that the history's highest version equals the requested base version before rebuilding.

It replays that history onto empty days at version zero, then applies the incoming batch. This lets a later append reconstruct an empty materialization from the retained log, rather than treating the empty days as the correct starting point.

There are limits to that recovery. The builder does not inspect every nonempty snapshot for incorrect content, and checking the highest history version is not a proof that every expected event is present. Returning `null` from the builder also does not itself reject an append: the caller can still invoke the RPC without a replacement state. The fix addresses the normal state-building path and the identified empty-snapshot case; it is not a general audit of every stored checkpoint.

## Test state as well as versions

The [builder tests added with the change](https://github.com/andre-lmarinho/turistar/blob/7ef57059a9e79eaa7928b2e904016bdedb224ecf/src/features/snapshots/services/snapshotStateBuilder.test.ts) check version mismatch, empty input, missing recovery history, and the resulting activity content for a valid append. An assertion that the version increased would have missed the original problem.

I have not retained the exact SQL queries used during the investigation or a count of affected people. The repository history preserves the omitted argument, the SQL fallback, and the state-building change.
