export const runtime = 'edge';

import { getStudioSlots } from '@/app/studio/components/configs/availability';

export async function GET() {
  const slots = await getStudioSlots();

  return Response.json(
    { slots },
    {
      headers: { 'cache-control': 's-maxage=60, stale-while-revalidate=300' },
    }
  );
}
