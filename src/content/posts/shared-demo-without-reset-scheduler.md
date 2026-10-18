---
title: A shared demo account without a reset scheduler
description: How Turistar lets visitors use the real product through a shared account, restores its examples on dashboard entry, and keeps reset rules in PostgreSQL.
date: 2026-10-15
tags: PostgreSQL, Supabase, Authentication, Product Engineering
project: turistar
---

The demo in [Turistar](/projects/turistar) signs visitors into a real, shared account. They can move activities, edit a budget, and delete a trip through the same authenticated screens and operations I use for my own travel planning.

The next visitor needs useful examples even if an earlier visitor deleted them. I keep a saved baseline and request a restore when the demo account enters its dashboard, provided at least an hour has passed since the previous reset. There is no background scheduler.

You can [open the login page and use its demo button](https://turistar.me/login). The account is shared, so changes are visible to other visitors and are temporary.

## One account uses the normal product

The login and signup screens already have a demo entry point. Their sign-in helper authenticates the shared account through the application's auth flow. After login, the dashboard recognizes that account and calls `resetDemoIfStale` before fetching its data.

The [demo feature documentation](https://github.com/andre-lmarinho/turistar/blob/d442fc13e62347d8e49a59e1173f6c8b7298288f/src/features/demo/README.md) describes that path. A visitor uses the existing permissions, itinerary editor, and budget operations. I don't have a second implementation of those features to keep in step with the product.

The tradeoff is shared state. Two visitors can change the same itinerary or see each other's edits. Serializing the resets prevents two restore operations from competing; it does not give each visitor a private sandbox.

## Entry requests a check; PostgreSQL decides whether to restore

The server helper makes one repository call, which invokes `maybe_reset_demo`. Calling the function on entry does not mean restoring the data on every entry. The database owns the interval check and records the last successful reset.

These statements from the [restoration function](https://github.com/andre-lmarinho/turistar/blob/d442fc13e62347d8e49a59e1173f6c8b7298288f/supabase/migrations/20261014095433_restore_demo_examples.sql) show the synchronization point and the time rule:

```sql
select r.last_reset_at into last_reset
from public.demo_reset_state r where r.id = true for update;

if last_reset > now() - interval '1 hour' then
  return false;
end if;
```

The row lock holds competing resets behind the same bookkeeping row. Once the first restore completes, the next caller sees its updated timestamp and returns without repeating the work. The function also locks existing example snapshots in the same order as the itinerary writer, before restoring the plans.

For example, if the last reset ran at 10:00, an entry at 10:30 leaves the baseline untouched and an entry at 11:05 can restore it. With no later dashboard entry, no restore runs. The hour is a minimum interval since the last reset.

There is no dirty-check. After the interval expires, the function can restore the baseline even if no visitor changed it. Eligibility depends on the timestamp, without comparing the current data to the baseline.

## Restore the relationships that make an example usable

Restoring just the itinerary JSON would leave several ways to break the demo. A deleted plan needs its original ID and public slug back so an existing URL works again. Its metadata, owner membership, expenses, and snapshot must agree with the restored trip.

The baseline therefore includes plan metadata, the itinerary snapshot, and budget entries. The reset recreates deleted examples, replaces edited example data, restores membership, clears their old event history, and removes extra plans created under the demo account. It also restores the demo profile. A baseline plan that now belongs to a different account causes the function to fail rather than take ownership of that plan.

Dates need maintenance too. Rome starts yesterday and Boipeba starts in 30 days, relative to `America/Bahia`. The restore shifts both plan dates and itinerary day labels while preserving activity IDs and content. A prepared trip stays useful for exploring ongoing and upcoming travel without someone periodically editing its calendar.

## Protect the baseline from the account it repairs

The demo account can edit product data, but it cannot edit the saved baseline or reset bookkeeping. Those tables have Row-Level Security enabled, and direct privileges are revoked from visitor roles.

The restore is a `security definer` function with an empty `search_path` and qualified table names. It checks the caller inside the function: the demo identity can restore itself, and the defined database maintenance roles can run it during setup. Another authenticated account cannot trigger a demo reset merely by calling the RPC.

A visitor with write access to maintenance data could replace the examples or move the timestamp that decides when they return.

## The dashboard stays available when reset fails

The [server helper catches reset failures](https://github.com/andre-lmarinho/turistar/blob/d442fc13e62347d8e49a59e1173f6c8b7298288f/src/features/demo/lib/resetDemoIfStale.ts), allowing the dashboard to continue loading. Restoration is best-effort. An already-open tab is not refreshed automatically, and a failed reset can leave the examples altered until a later entry succeeds.

The [integration tests](https://github.com/andre-lmarinho/turistar/blob/d442fc13e62347d8e49a59e1173f6c8b7298288f/src/features/demo/repositories/DemoRepository.integration-test.ts) exercise restoration against a local database, including deleted examples and their URLs, date shifting, access boundaries, and repeated or concurrent reset calls.
