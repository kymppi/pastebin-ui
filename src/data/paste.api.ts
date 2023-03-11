import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.API_URL || 'https://api.pastebin.fi',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PasteBody {
  title: string;
  content: string;
  language: string;
  private: boolean;
}

export interface NewPasteResponse {
  id: string;
  delete?: string; // I have no idea what this is
}

export const createPaste = async (paste: PasteBody) => {
  return await apiClient.post<NewPasteResponse>('/pastes', {
    title: paste.title,
    language: paste.language,
    paste: paste.content,
    private: paste.private,
  });
};
