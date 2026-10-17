---
title: The partial unique index that broke my Supabase upsert
description: Batching LawFlow notifications exposed a mismatch between a partial unique index and Supabase's conflict target. Removing a redundant predicate fixed it.
date: 2026-10-01
tags: PostgreSQL, Supabase, TypeScript, concurrency
project: lawflow
---

Opening the notification panel in [LawFlow](/projects/lawflow) recalculated reminders from leads, proposals and activities. The calculations could produce notifications that already existed. My repository tried each insert and swallowed PostgreSQL's `23505` unique-violation error to keep the list deduplicated.

That preserved uniqueness, but an ordinary panel opening could produce dozens of failed inserts. I changed the service to collect candidate rows and write them in one batch. Then the batch failed: PostgreSQL could not find a matching unique constraint for the conflict target.

## What the duplicate meant

Each notification had a deduplication key identifying the reason it existed, such as a particular reminder for a particular activity. Uniqueness applied to the combination of workspace, recipient and deduplication key. The same event could notify several people without colliding across recipients or workspaces.

The existing index had this shape:

```sql
CREATE UNIQUE INDEX idx_notifications_dedupe_per_user
  ON notifications (workspace_id, user_id, dedupe_key)
  WHERE dedupe_key IS NOT NULL;
```

The service's five calculation functions previously wrote rows themselves. I made them synchronous functions that returned candidates, kept the database reads in the orchestration step, and passed the combined rows to one repository method. An empty batch returned immediately.

The write used Supabase's upsert API:

```ts
const { error } = await db.from("notifications").upsert(payload, {
  onConflict: "workspace_id,user_id,dedupe_key",
  ignoreDuplicates: true,
});

if (error) throw new Error(error.message);
```

`ignoreDuplicates: true` matters here. The intended conflict action was `DO NOTHING`. Recomputing an existing notification should preserve its read status and original timestamp. Updating it from the new payload, which contains `read: false`, could make a notification unread again. Supabase's [upsert reference](https://supabase.com/docs/reference/javascript/upsert) describes the conflict columns and the choice controlled by `ignoreDuplicates`.

## Matching columns did not identify the partial index

PostgreSQL infers an arbiter index from the `ON CONFLICT` target. A partial index also needs a compatible predicate in that target. The column list alone did not identify this partial index, even though the attempted row had a non-null deduplication key. PostgreSQL documents this distinction in its [conflict-target rules](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT).

In direct SQL, that target could include `WHERE dedupe_key IS NOT NULL`. The Supabase upsert API I was using exposed the conflict columns, without an option for the index predicate.

The table definition made the correction simpler. `dedupe_key` was already `NOT NULL`. So were `workspace_id` and `user_id`. Every valid row satisfied the index predicate; it selected no smaller subset of the table.

I replaced the partial index with a non-partial unique index on the same columns:

```sql
CREATE UNIQUE INDEX idx_notifications_dedupe_per_user
  ON notifications (workspace_id, user_id, dedupe_key);
```

These snippets show the before and after definitions, not a migration to run together. The replacement retained uniqueness for every valid row and gave the column-only conflict target a matching index.

The `NOT NULL` constraint is important to that reasoning. A normal PostgreSQL unique index permits multiple nulls by default; replacing a partial index does not automatically make nulls equal. That is a separate [unique-index rule](https://www.postgresql.org/docs/current/indexes-unique.html). Here, the schema excluded nulls before either index was considered.

## Why I kept deduplication in the database

Fetching existing keys first would let the service omit known duplicates, but two requests could both read an absent key before either inserted it. An in-memory set would only coordinate one request. Two browser tabs could still generate the same notification concurrently.

The unique index remained the authority. `DO NOTHING` handled an expected collision at the write boundary, and unrelated database errors still propagated. The batch removed the per-candidate network calls without weakening the protection against concurrent requests.

Repository tests checked the batch payload, conflict options, timestamp mapping and empty-input behavior. Service tests checked which candidates the rules generated. Those tests helped keep the refactor faithful to the existing notification behavior; mocked repository tests alone would not have exposed the index-inference failure.

## Fewer statements and a smaller latency improvement

In an isolated workspace seeded for the comparison, a recomputation produced roughly 30 to 60 candidates. The write path went from that many individual insert statements to one batch statement. Candidate reads and the final inbox query still existed, and the database still checked each proposed row for conflicts.

Elapsed time improved by roughly 20% to 40% in that scenario. The old inserts already ran concurrently through `Promise.all`, so replacing them did not save 30 to 60 sequential round trips. The larger reduction was in statement count and expected-error handling. A smaller workspace would generate fewer candidates and show a smaller absolute reduction.

Recomputation also remained on the request path whenever the list included unread notifications. Batching changed how candidates were persisted; it did not turn notification generation into a background process.
