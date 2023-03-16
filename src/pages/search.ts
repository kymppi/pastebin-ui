import type { APIRoute } from 'astro';
import { searchPastes } from '../data/paste.api';

export const get: APIRoute = async ({ request }) => {
  const query = new URL(request.url).searchParams.get('q');
  const results = await searchPastes(query || '');

  return new Response(
    JSON.stringify({
      data: results.data,
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    }
  );
};
