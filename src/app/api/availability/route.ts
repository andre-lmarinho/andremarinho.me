export const runtime = 'edge';

import { getStudioAvailability } from '@/app/studio/getStudioAvailability';

export async function GET() {
  const slots = await getStudioAvailability();

  return Response.json(
    { slots },
    {
      headers: { 'cache-control': 's-maxage=60, stale-while-revalidate=300' },
    }
  );
}
