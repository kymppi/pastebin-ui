import type { APIRoute } from 'astro';
import z from 'zod';
import { createPaste } from '../data/paste.api';

const newPasteSchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.string(),
  private: z
    .string()
    .default('false')
    .transform((value) => (value === 'true' ? true : false)),
});

export const post: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const newPaste = newPasteSchema.safeParse(payload);

  if (!newPaste.success) return { body: JSON.stringify(newPaste.error) };

  return await createPaste(newPaste.data)
    .then((res) => {
      //TODO: switch to 201 when fixed in api
      if (res.status === 200) return redirect(`/p/${res.data.id}`, 301);

      return {
        body: JSON.stringify({ error: 'Something went wrong', ...res }),
      };
    })
    .catch((error) => {
      return {
        body: JSON.stringify({
          error: error.message,
          error1: error.toJSON(),
        }),
      };
    });
};
