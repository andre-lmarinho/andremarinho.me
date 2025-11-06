import { get } from '@vercel/edge-config';

import { toSlots } from '@/utils/availability';

type StudioConfig = {
  availability?: unknown;
};

const hasAvailability = (config: unknown): config is StudioConfig =>
  Boolean(config) && typeof config === 'object' && 'availability' in config;

const readStudioConfig = get as (key: string) => Promise<unknown>;

export const getStudioSlots = async () => {
  const edgeConfig: unknown = await readStudioConfig('studio');

  if (hasAvailability(edgeConfig)) return toSlots(edgeConfig.availability);

  return 0;
};
