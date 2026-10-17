---
title: Fetching dashboard summaries instead of full snapshots
description: Turistar's dashboard moved from loading itinerary snapshots per destination to one PostgreSQL summary query, while keeping all map destinations and the card limit.
date: 2026-09-26
tags: PostgreSQL, Supabase, Performance, Read Models
project: turistar
---

The [Turistar](/projects/turistar) dashboard shows trip cards and a map of destinations. It needs dates, coordinates, a cover image, and an activity count. It was also fetching the itinerary snapshot for each destination so the application could count those activities.

I replaced that path with one database call returning dashboard summaries. In a controlled benchmark with 50 plans containing 40 activities each and 30 ms of added database API latency, median data-loading time fell from 129.10 ms to 39.03 ms, a reduction of 69.77%. Those timings measure HTTP request to parsed JSON, not full-page rendering.

The change shipped in [PR #518](https://github.com/andre-lmarinho/turistar/pull/518). The dashboard receives the values it displays, while PostgreSQL reads the snapshots needed to calculate them.

## One screen was loading through several paths

Before the change, the page loaded plans and destinations through separate paths, including a snapshot read per destination. An itinerary snapshot contains the days and activity records used by the planner. Most of those fields have no use in a dashboard summary.

The application still had to receive and parse that content to derive a count. The [per-destination snapshot reads already ran through `Promise.all`](https://github.com/andre-lmarinho/turistar/blob/151498387e729ca5759137a7de6a37686452a817/src/features/plan/repositories/PlanRepository.ts). They were parallel, but each still crossed the database API boundary and transferred the snapshot content.

I introduced `get_user_plan_summaries`, a query dedicated to this screen, and changed the page to call `PlanService.getUserDashboard()`. The service receives summary rows once and derives both the trip cards and map destinations from them.

## Count inside the query, return the summary

The [SQL function](https://github.com/andre-lmarinho/turistar/blob/6c045f98bcd3ecc685358bc52b13ba22c47f93c3/supabase/migrations/20260912015840_dashboard_read_model.sql) first collects the plan IDs the caller owns or belongs to. It uses `UNION`, so a plan present through both relationships appears once. It joins those plans to their stored snapshots and calculates the count in SQL.

This is the activity-count expression from the function:

```sql
coalesce((
  select sum(case when jsonb_typeof(day->'activities') = 'array'
    then jsonb_array_length(day->'activities') else 0 end)
  from jsonb_array_elements(case when jsonb_typeof(ps.state->'days') = 'array'
    then ps.state->'days' else '[]'::jsonb end) as day
), 0)::bigint
```

The JSON type checks give missing or non-array day and activity collections a defined count behavior. A missing snapshot is still allowed by the left join and yields a zero count. The application receives `activity_count` alongside the plan's display fields; it no longer needs `state` to reproduce the traversal.

This is a query over the existing data, without a separate summary table or background synchronization job. PostgreSQL still traverses the relevant JSON to count activities. One RPC reduces request overhead and transferred content; it does not make query work independent of the amount of itinerary data.

## Keep authorization and display limits explicit

The RPC is `security invoker`, so it executes under the caller's database permissions and Row-Level Security policies. Execution is granted to authenticated accounts and revoked from anonymous access. The summary query keeps authorization at the data boundary while selecting owned and shared plans.

Cards and the map have different limits. At this revision, the dashboard displayed the latest 50 plan cards, but the map needed the complete destination history. Putting `LIMIT 50` in the shared query would quietly remove destinations from the map.

The [service therefore limits only the cards](https://github.com/andre-lmarinho/turistar/blob/6c045f98bcd3ecc685358bc52b13ba22c47f93c3/src/features/plan/services/PlanService.ts). It maps all summary rows with a destination into map entries. A plan without a destination can still have a card without producing a blank map location. The previous RPC remained available during rollout so older application instances could continue using it.

## What the timing establishes

The controlled comparison uses the same 50-plan, 40-activity workload and 30 ms added API latency for both paths. Reducing median time from 129.10 ms to 39.03 ms gives:

```text
(129.10 - 39.03) / 129.10 = 69.77%
```

I also observed a reduction of about 70% in dashboard data loading in production. I have not retained the absolute production timings, traces, or sampling protocol, so the two precise millisecond values above belong only to the controlled benchmark. Neither observation establishes an equivalent improvement in LCP, login time, or complete page rendering.

The benchmark includes database API latency, which makes avoiding per-destination calls relevant to this workload. A smaller plan history or a different network environment can produce a different reduction.

## Check that less data still produces the same screen

The [repository tests](https://github.com/andre-lmarinho/turistar/blob/6c045f98bcd3ecc685358bc52b13ba22c47f93c3/src/features/plan/repositories/PlanRepository.test.ts) check the summary RPC call and error handling. The [service tests](https://github.com/andre-lmarinho/turistar/blob/6c045f98bcd3ecc685358bc52b13ba22c47f93c3/src/features/plan/services/PlanService.test.ts) use 55 rows to assert that only 50 become cards while all 55 remain available to the map. They also cover empty data, destination-less plans, zero coordinates, dates, authentication, and propagation of failures.

Those checks constrain the optimization to the dashboard's existing contract. A response can become smaller and faster while accidentally losing a shared plan or truncating the travel history; the read model needs to preserve those behaviors as explicitly as it removes the full snapshots.
