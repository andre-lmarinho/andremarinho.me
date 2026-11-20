---
title: "Moving dashboard revenue aggregation from Node.js to PostgreSQL"
description: How a CRM dashboard reduced database-to-Node payload by aggregating accepted proposal revenue in PostgreSQL, with time zone, JSONB, and authorization tradeoffs.
date: 2026-11-12
tags: PostgreSQL, SQL, Performance, Dashboards
project: lawflow
---

A CRM dashboard needed revenue totals from accepted proposals. The handler fetched proposal values and acceptance JSON into Node.js, filtered the rows, and calculated its reporting periods in JavaScript. As the proposal history grew, the dashboard transferred and processed records it did not need to display.

I moved the revenue aggregation into PostgreSQL and extracted the acceptance timestamp into a typed column. In an isolated comparison with roughly 1,000 seeded accepted proposals, database-to-Node payload fell from approximately 1–3 MB to under 1 KB, while the `dashboard.get` measurement went from roughly 600–1,500 ms to 50–80 ms. With about 50 proposals, the difference was negligible.

For this workload, the change avoided transferring proposal documents to Node and aggregating them there when the request needed summary values.

## What the dashboard was doing

The old path selected each accepted proposal's `value` and `acceptance_data` JSONB. The application extracted the acceptance time, filtered proposals, and iterated across the history to build a six-month series. The timestamp inside JSONB also made extraction through PostgREST sensitive to version-specific behavior.

The size of each JSON document matters even if the final UI only needs a few numbers. A single request may be adequate with a small history and become expensive as accepted proposals accumulate. A cache could hide repeated work, but it would retain the underlying fetch and introduce an invalidation problem whenever a proposal was accepted or changed.

## Extract the timestamp without pretending migration is instantaneous

I added `accepted_at` as a typed timestamp and backfilled existing data. The revenue function used that column as the primary acceptance instant, with a guarded fallback to the timestamp inside `acceptance_data` for rows where the column was still null.

That fallback matters during a transition: adding a column and updating a write path do not guarantee that every old or concurrently written record has the new field populated. The guard checked for a timestamp-shaped prefix before casting the JSON value. A prefix check is not a complete proof that every possible string is a valid timestamp, so malformed data still deserves explicit testing.

The function converted the acceptance instant to `America/Sao_Paulo` for calendar-period aggregation. That choice changes which month an event near midnight belongs to. A timestamp's storage format and the business time zone used for a monthly report are separate decisions.

## Return aggregates instead of proposal documents

The historical SQL function returned the current year's and month's revenue using filtered sums. The central part has this shape:

```sql
coalesce(sum(value) filter (
  where date_part('year', accepted_local) = report_year
), 0) as revenue_year,
coalesce(sum(value) filter (
  where date_part('year', accepted_local) = report_year
    and date_part('month', accepted_local) = report_month
), 0) as revenue_month
```

This is an illustration of the aggregation rather than a copy-paste version of the application function; the real function computes `accepted_local` and its reporting time in SQL. `coalesce` gives empty results a numeric zero. The database still reads the matching proposal data. The saving comes from returning aggregates instead of transferring all the selected proposal payloads to Node.

The migration was more than a query replacement. A repository called the function, a service orchestrated the dashboard result, and date-range calculations moved into a pure library with tests. The handler fell from 212 lines to 10 in the diff. Line count alone is not a performance metric, but separating the calculation from transport made its behavior easier to test.

## Tenant authorization stays part of the query contract

The historical function took a workspace ID, filtered proposals by that ID and used `security definer`. Its execution grant was restricted to `service_role`. That is not equivalent to an ordinary user-scoped query automatically protected by the caller's row-level security: the server must establish that the authenticated caller may access the workspace before using privileged access.

The aggregation being fast says nothing by itself about that authorization path. When moving a query behind a privileged function, I would test unauthorized workspace IDs as well as correct totals, and make sure a client-supplied ID cannot become the sole authorization check.

## Measure at the boundary you changed

The isolated test used approximately 1,000 seeded accepted proposals. It measured the two versions' payload between the database and Node and the `dashboard.get` operation. It did not establish production LCP or an improvement experienced by every user. At about 50 proposals, the recorded difference was negligible, so the added database function would have less immediate performance value for that workload.

The calculation is now coupled to PostgreSQL and versioned through migrations. Other fields remain in `acceptance_data`, so extracting `accepted_at` did not eliminate JSONB from the model. For this dashboard, those costs were worth avoiding repeated transfer of historical proposal documents merely to produce a summary.
