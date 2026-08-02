// View transition groups are positioned relative to the viewport, so the scroll
// has to settle before the browser takes its snapshots. Left alone, arriving at
// a page shorter than the current offset makes the browser clamp the scroll
// mid-animation, and that displacement rides on top of every title's own
// movement.
export function settleScrollForTransition(): boolean {
  if (typeof window === "undefined" || window.scrollY === 0) return false;

  // Smooth would defeat the point: the animation would start before the scroll
  // finished, which is the drag this exists to remove.
  window.scrollTo({ top: 0, behavior: "instant" });
  return true;
}
