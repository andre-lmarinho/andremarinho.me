export const runtime = 'edge';
import { get } from '@vercel/edge-config';

type StudioConfig = {
  availability?: number | string | null;
};

export async function GET() {
  const edgeConfig = (await get<StudioConfig>('studio')) ?? {};
  const slots = Number(edgeConfig.availability ?? 0);

  return Response.json(
    { slots },
    {
      headers: { 'cache-control': 's-maxage=60, stale-while-revalidate=300' },
    }
  );
}
