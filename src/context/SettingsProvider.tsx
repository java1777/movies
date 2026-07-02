import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  TMDB_LANG,
  translations,
  type Lang,
  type TranslationKey,
} from "../i18n/translations";
import { SettingsContext, type Theme } from "./settings-context";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>("lang", "uz");
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const t = (key: TranslationKey) => translations[lang][key];
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <SettingsContext.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        t,
        tmdbLang: TMDB_LANG[lang],
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
