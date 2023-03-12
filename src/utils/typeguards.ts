import { BUNDLED_LANGUAGES, Lang } from "shiki";

export const isShikiLanguage = (language: string): language is Lang => {
  return BUNDLED_LANGUAGES.find((lang) => lang.id === language) !== undefined;
};
