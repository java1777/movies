import { createContext, useContext, useEffect, useState } from "react";
import { TMDB_LANG, translations } from "../i18n/translations";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [lang, setLang] = useState(
    () => window.localStorage.getItem("lang") || "uz",
  );
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Translate a key for the current language (falls back to the key itself)
  const t = (key) => translations[lang]?.[key] ?? key;
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <SettingsContext.Provider
      value={{ lang, setLang, theme, toggleTheme, t, tmdbLang: TMDB_LANG[lang] }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
