import { get } from '@vercel/edge-config';

type StudioConfig = {
  availability?: unknown;
};

const toSlots = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
  if (typeof value === 'string') return toSlots(Number.parseInt(value, 10));
  return 0;
};

const isStudioConfig = (value: unknown): value is StudioConfig =>
  typeof value === 'object' && value !== null && 'availability' in value;

export const getStudioAvailability = async (): Promise<number> => {
  const edgeConfig = await get('studio');
  const availability = isStudioConfig(edgeConfig) ? edgeConfig.availability : undefined;

  return toSlots(availability);
};
