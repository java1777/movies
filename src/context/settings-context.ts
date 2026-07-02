import { createContext } from "react";
import type { Lang, TranslationKey } from "../i18n/translations";

export type Theme = "dark" | "light";

export interface SettingsContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: TranslationKey) => string;
  tmdbLang: string;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
