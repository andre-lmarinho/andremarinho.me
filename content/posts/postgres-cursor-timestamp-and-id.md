---
title: Why my Postgres pagination cursor needs a timestamp and an ID
description: LawFlow's notification history uses a composite cursor to keep timestamp ties stable, avoid deep offsets and detect the next page without a total count.
date: 2026-07-23
tags: PostgreSQL, Supabase, pagination, performance
project: lawflow
---

The read-notification history in [LawFlow](/projects/lawflow) used offset pagination. The interface only needed to load older notifications, but the query described its position as a number of rows to skip. Each deeper request asked PostgreSQL to compute and discard a larger prefix of the result.

I replaced the offset with a cursor containing `sent_at` and `id`. The timestamp located the boundary in the history; the ID made that boundary unambiguous when several notifications shared a timestamp.

## A timestamp does not completely order the inbox

Notifications can share `sent_at`, including several generated in the same batch. Ordering only by that field leaves their relative order unspecified.

Suppose a page ends partway through a group with the same timestamp. A next-page predicate of `sent_at < lastTimestamp` skips the rest of that group. Changing it to `<=` can return rows already displayed. Increasing the timestamp's precision would still leave correctness dependent on timestamps being unique.

The query therefore orders by both fields:

```sql
ORDER BY sent_at DESC, id DESC
```

The primary-key ID supplies a unique tie-breaker. It does not need to encode creation time because `sent_at` provides the chronological order. The same two fields must appear in the cursor and in the continuation condition.

## Continue strictly after the last returned row

A shortened SQL equivalent of the paginated query is:

```sql
SELECT id, sent_at, title
FROM notifications
WHERE workspace_id = $1
  AND user_id = $2
  AND read = true
  AND (
    sent_at < $3
    OR (sent_at = $3 AND id < $4)
  )
ORDER BY sent_at DESC, id DESC
LIMIT $5;
```

Here `$3` and `$4` are the last displayed row's timestamp and ID; `$5` is the requested page size plus one. The first page omits the cursor predicate. Workspace, recipient and read-status filters remain on every request. A cursor identifies a position within that authorized query; it grants no access by itself.

Because the order is descending, older timestamps come after the boundary. At the same timestamp, smaller IDs come after it. Using `<` on both branches keeps the boundary exclusive. Changing the sort direction would require changing these comparisons too.

The Supabase repository expresses the same condition through `.or()`:

```ts
query.or(
  `sent_at.lt.${cursor.sentAt},and(sent_at.eq.${cursor.sentAt},id.lt.${cursor.id})`,
);
```

The API validates the cursor as a timestamp and UUID before it reaches that filter. The client takes the next cursor from the last row actually displayed, preserving the timestamp value returned by the server.

## One extra row answers the UI's question

For a requested page size of 20, the repository asks for at most 21 rows. It returns the first 20 and sets `hasMore` when the result contained the extra row. The client continues from row 20. Using row 21 as the cursor would skip a notification that had never been displayed.

An empty result ends the traversal. A result with exactly 20 rows and no extra row also has `hasMore: false`. This answers whether another page existed when the query ran, without requesting an exact total just to draw a Load more control.

The interface gives up direct jumps to an arbitrary page number. That fits an inbox where the action is to read further back. A numbered reporting table could require a different tradeoff.

## The indexes still determine how much work remains

PostgreSQL's [LIMIT and OFFSET documentation](https://www.postgresql.org/docs/current/queries-limit.html) explains both requirements behind the change: pagination needs a predictable order, and skipped offset rows still require work on the server. Adding an index to an offset query does not remove that skipped prefix.

The cursor migration added a B-tree index on `(sent_at DESC, id DESC)`. The schema already had another index on `(workspace_id, user_id, sent_at DESC)`. Those are different access paths. The first matches the complete ordering but does not begin with the tenant and recipient filters. The second begins with those filters but does not contain the ID tie-breaker or the read-status filter.

Neither index covers all the filters and the complete ordering. PostgreSQL still chooses a plan and may filter rows or sort. The [index-ordering rules](https://www.postgresql.org/docs/current/indexes-ordering.html) explain when a B-tree can supply ordered results directly. Tenant distribution, read-status selectivity and timestamp ties still matter.

I compared the offset and cursor versions with `EXPLAIN ANALYZE`, checking the first and fiftieth pages against a seeded history of roughly 50,000 notifications. This was preventive work: the product's actual volume did not show a noticeable user-facing difference. The comparison supported removing offset-driven degradation in that scenario; it did not establish constant latency for every dataset.

## Stable boundaries do not freeze the history

Newer notifications can arrive above the current boundary without shifting the cursor's position as they would shift an offset. That does not give the traversal a database snapshot across requests. Deletions, notifications moving between read and unread, or changes to ordering fields can still change what later pages contain.

The client refreshes read history from the first page when it needs a fresh view and merges loaded notifications by ID. The composite cursor solves the ordering and continuation problem for that flow. It does not promise a permanent, unchanged enumeration of a live inbox.
