---
title: Keeping drag-and-drop stable during realtime updates
description: How Turistar separated drag previews from persistence, what a seven-to-one write simulation measured, and why later commits carry a move intention instead of a whole draft.
date: 2026-10-04
tags: React, Realtime, Event Sourcing, Drag and Drop
project: turistar
---

A card moving under the pointer can change position many times before someone drops it. In [Turistar](/projects/turistar), those intermediate positions need to look immediate without becoming a sequence of persisted itinerary changes. Remote updates make the problem harder: another screen can change the same plan while the gesture is active.

The January implementation kept a local draft for the drag and saved the final result once on drop. In an August simulation using that revision's drag code, a path across a full column and into the next on a four-day board with four activities per day produced seven effective reorder steps. Publishing every step would mean seven writes; committing the result meant one.

That design also exposed a stale-draft problem. In September I changed the commit boundary again, from submitting the whole itinerary draft to submitting the moved activity's ID and intended destination.

## The original drag draft belonged to the board

In the [January board component](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/activityBoard/components/ActivityBoard.tsx), `draftDays` supplied the rendered columns. The drag hook received `setDraftDays` for preview changes and a separate callback for the final commit.

`handleDragOver` updated only the draft. Its `requestAnimationFrame` scheduling retained the latest hovered target while allowing at most one pending frame callback. That reduced redundant local work without sending an update to the persistence layer on each pointer event.

The [drop handler](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/activityBoard/hooks/useDragHandlers.ts) resolved the final target, applied any remaining local move, and called `onDaysCommit` if a local reorder had occurred. Cancellation cleared the drag state without publishing that draft.

## Freezing the draft kept remote state out of the gesture

The board copied incoming shared state into its draft only when no activity was being dragged:

```tsx
useEffect(() => {
  if (!activeId) setDraftDays(days);
}, [activeId, days]);
```

Remote events could update the shared `days` while the visible draft stayed stable. A remote reorder would therefore not move the dragged card underneath the pointer midway through the gesture. Once the drag ended, the board could synchronize with shared state again.

A debounce on persistence alone would not provide that behavior. It could delay writes while still letting remote state replace the array that the active gesture was rendering. The draft gave the board a separate state boundary for the duration of the interaction.

## The measured path had seven steps, not every drag

The simulation used the real [`applyDragMove` function](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/activityBoard/lib/dragUtils.ts) and counted the steps that returned a changed order. The scenario was four days with four activities per day, moving across a full column and into the next.

Seven changed intermediate orders could have triggered seven persistence calls if every preview had used the shared-state setter. The local-draft path published one final result. A short drag has fewer intermediate changes, and an unchanged or cancelled drag may publish none. Seven-to-one describes this modeled path.

This was a code-level simulation, without captured user traffic or a latency measurement.

## A whole draft can accidentally describe a deletion

The January revision eventually committed the final `DayPlan[]`. The [collaboration layer compared that array against its current shared state](https://github.com/andre-lmarinho/turistar/blob/acec418455c17b70977bbc64a58e165ab703964f/src/features/events/hooks/usePlanCollaboration.ts) to produce events.

Suppose a second screen added an activity while the first screen was dragging. The shared state could receive the addition, while the frozen draft never contained it. On drop, comparing the current shared state with that old draft could interpret the missing activity as an intentional deletion. A concurrent edit to an existing card could similarly be overwritten by the draft's older fields.

The gesture remained visually stable while the eventual commit could still misrepresent what the person intended. Versioning the resulting events did not recover the intent lost in that whole-array comparison.

That conflict required edits to the same itinerary during the active drag and its commit. I did not measure the race window or its frequency. This limitation belongs to the linked historical revision; the later move contract avoids submitting that whole draft.

## The later commit describes a move

The [September change](https://github.com/andre-lmarinho/turistar/commit/151498387e729ca5759137a7de6a37686452a817) removed that whole-draft commit path. The hook retains the active activity and destination, using `moveActivityOperation` to project a preview over the latest `days`. On drop it calls the move callback with an activity ID and an ID-based destination:

```ts
onActivityMove(activityId, {
  toDayId,
  beforeActivityId,
});
```

This shows the callback contract; the [implementation](https://github.com/andre-lmarinho/turistar/blob/151498387e729ca5759137a7de6a37686452a817/src/modules/planner/hooks/useDragHandlers.ts) resolves those values from the hovered destination. The operation asks to move one activity before another, or to the end of a day. It does not ask to replace every activity with a local copy.

A [regression test](https://github.com/andre-lmarinho/turistar/blob/151498387e729ca5759137a7de6a37686452a817/src/modules/planner/hooks/useDragHandlers.test.ts) starts a drag, supplies updated remote days, and checks that a remote title survives in the preview. It also checks that drop publishes the activity ID and destination, and that cancellation publishes no mutation. The [operation helper](https://github.com/andre-lmarinho/turistar/blob/151498387e729ca5759137a7de6a37686452a817/src/features/events/lib/planOperations.ts) returns no move for a missing activity or destination.

The new boundary avoids expressing unrelated remote additions as deletions merely because a drag preview omitted them. Concurrent moves of the same activity still require an ordering policy, and this event-sourced design does not promise CRDT conflict resolution.
