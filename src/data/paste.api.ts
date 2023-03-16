import axios, { AxiosResponse } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.API_URL || 'https://api.pastebin.fi',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface NewPasteBody {
  title: string;
  content: string;
  language: string;
  private: boolean;
}

export interface NewPasteResponse {
  id: string;
  delete?: string; // I have no idea what this is
}

export const createPaste = async (paste: NewPasteBody) => {
  return await apiClient.post<NewPasteResponse>('/pastes', {
    title: paste.title,
    language: paste.language,
    paste: paste.content,
    private: paste.private,
  });
};

export interface PasteMeta {
  views: number;
  size: number;
}

export interface GetPasteResponse {
  id: string;
  title: string;
  content: string;
  programmingLanguage: string;
  hidden: boolean;
  date: string;
  allowedReads: number;
  meta: PasteMeta;
}

export interface Paste {
  id: string;
  title: string;
  content: string;
  language: string;
  private: boolean;
  date: Date;
  allowedReads: number;
  meta: PasteMeta;
}

export const getPaste = async (
  id: string
): Promise<AxiosResponse<Paste, any>> => {
  return await apiClient.get<GetPasteResponse>(`/pastes/${id}`).then((res) => ({
    ...res,
    data: {
      id: res.data.id,
      title: res.data.title,
      content: res.data.content,
      language: res.data.programmingLanguage,
      private: res.data.hidden,
      date: new Date(res.data.date),
      allowedReads: res.data.allowedReads,
      meta: res.data.meta,
    },
  }));
};

export const searchPastes = async (
  query: string
): Promise<AxiosResponse<Paste[], any>> => {
  return await apiClient
    .get<GetPasteResponse[]>(`/pastes/?q=${query}`)
    .then((res) => ({
      ...res,
      data: res.data.map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        language: p.programmingLanguage,
        private: p.hidden,
        date: new Date(p.date),
        allowedReads: p.allowedReads,
        meta: p.meta,
      })),
    }));
};
