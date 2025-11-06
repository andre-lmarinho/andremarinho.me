export const toSlots = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
  if (typeof value === 'string') return toSlots(Number.parseInt(value, 10));
  return 0;
};
