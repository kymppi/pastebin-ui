import type { APIRoute } from 'astro';
import z from 'zod';
import { API_URL } from '../config';

const newPasteSchema = z.object({
  name: z.string(),
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

  try {
    const newPaste = newPasteSchema.parse(payload);

    //TODO: send POST request to API
    //TODO: https://github.com/pastebin-fi/PowerPaste/blob/master/APISPEC.md#post--create-a-new-paste
    try {
      const paste = {
        title: newPaste.name,
        language: newPaste.language,
        paste: newPaste.content,
        private: newPaste.private,
      };

      const res = await fetch(`${API_URL}/pastes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(paste),
      });

      const data = await res.json();
      console.log(data);

      return redirect(`/p/${data.id}`, 301);
    } catch (error) {
      console.error(error);
    }

    return {
      body: JSON.stringify({ data: newPaste }),
    };
  } catch (error: any) {
    return {
      body: JSON.stringify({ error: error.message }),
    };
  }
};
