import type { APIRoute } from 'astro';
import z from 'zod';

const newPasteSchema = z.object({
  name: z.string(),
  content: z.string(),
  language: z.string(),
  private: z
    .string()
    .default('false')
    .transform((value) => (value === 'true' ? true : false)),
});

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  try {
    const newPaste = newPasteSchema.parse(payload);

    //TODO: send POST request to API
    //TODO: https://github.com/pastebin-fi/PowerPaste/blob/master/APISPEC.md#post--create-a-new-paste

    return {
      body: JSON.stringify({ data: newPaste }),
    };
  } catch (error: any) {
    return {
      body: JSON.stringify({ error: error.message }),
    };
  }
};
