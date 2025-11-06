import { get } from '@vercel/edge-config';

import { toSlots } from '@/utils/availability';

type StudioConfig = {
  availability?: unknown;
};

const hasAvailability = (config: unknown): config is StudioConfig =>
  typeof config === 'object' && config !== null && 'availability' in config;

export const getStudioSlots = async () => {
  try {
    const edgeConfig = await get<StudioConfig | null>('studio');

    if (hasAvailability(edgeConfig)) return toSlots(edgeConfig.availability);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to read studio availability from Edge Config.', error);
    }
  }

  return 0;
};
