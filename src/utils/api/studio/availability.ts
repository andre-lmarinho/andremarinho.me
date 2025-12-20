import { getStudioSlots } from '@/app/studio/components/configs/availability';

export type AvailabilityResponse = {
  slots: number;
};

const availabilityHeaders = {
  'cache-control': 's-maxage=60, stale-while-revalidate=300',
};

export const buildAvailabilityResponse = async () =>
  Response.json(
    {
      slots: await getStudioSlots(),
    } satisfies AvailabilityResponse,
    { headers: availabilityHeaders }
  );
