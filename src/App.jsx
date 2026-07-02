import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Movies from "./components/Movies";
import MovieModal from "./components/MovieModal";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import { useSavedMovies } from "./hooks/useSavedMovies";
import { useSettings } from "./context/SettingsContext";
import { LANGUAGES } from "./i18n/translations";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const { t, lang, setLang, theme, toggleTheme, tmdbLang } = useSettings();
  const saved = useSavedMovies();

  const CATEGORIES = [
    { value: "top_rated", label: t("topRated") },
    { value: "popular", label: t("popular") },
    { value: "upcoming", label: t("upcoming") },
  ];

  const [category, setCategory] = useState(
    () => window.localStorage.getItem("category") || "top_rated",
  );
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const isSavedView = category === "liked" || category === "watchlist";

  useEffect(() => {
    if (isSavedView) return; // Saved lists come from localStorage, not the API
    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${category}`, {
          params: { api_key: API_KEY, page, language: tmdbLang },
          signal: controller.signal,
        });
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(t("fetchError"));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page, isSavedView, tmdbLang]);

  // Source list: API results, or a saved collection for the saved views
  const sourceMovies = useMemo(() => {
    if (category === "liked") return saved.liked;
    if (category === "watchlist") return saved.watchlist;
    return movies;
  }, [category, movies, saved.liked, saved.watchlist]);

  // Client-side filtering (title + score range)
  const filteredMovies = useMemo(() => {
    return sourceMovies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(title.toLowerCase());
      const matchesMin = minScore ? movie.vote_average >= +minScore : true;
      const matchesMax = maxScore ? movie.vote_average <= +maxScore : true;
      return matchesTitle && matchesMin && matchesMax;
    });
  }, [sourceMovies, title, minScore, maxScore]);

  function handleCategory(next) {
    if (!(next === "liked" || next === "watchlist")) {
      window.localStorage.setItem("category", next);
    }
    setCategory(next);
    setPage(1);
  }

  const emptyMessage =
    category === "liked"
      ? t("noFavorites")
      : category === "watchlist"
        ? t("noWatchlist")
        : t("noMovies");

  return (
    <div>
      <header className="header-inner">
        <div className="container topbar">
          <div className="row2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`btns ${category === cat.value ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => handleCategory("liked")}
              className={`btns ${category === "liked" ? "active" : ""}`}
            >
              ❤️ {t("favorites")} ({saved.liked.length})
            </button>
            <button
              onClick={() => handleCategory("watchlist")}
              className={`btns ${category === "watchlist" ? "active" : ""}`}
            >
              🔖 {t("watchLater")} ({saved.watchlist.length})
            </button>
          </div>

          <div className="settings">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.short}
                </option>
              ))}
            </select>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="container">
          <Search
            title={title}
            setTitle={setTitle}
            minScore={minScore}
            setMinScore={setMinScore}
            maxScore={maxScore}
            setMaxScore={setMaxScore}
          />
        </div>
      </header>

      <main className="container">
        {loading && <p className="status">{t("loading")}</p>}
        {error && <p className="status error">{error}</p>}
        {!loading && !error && filteredMovies.length === 0 && (
          <p className="status">{emptyMessage}</p>
        )}

        <Movies
          movies={filteredMovies}
          onSelect={setSelectedId}
          saved={saved}
        />
        {!isSavedView && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </main>

      {selectedId && (
        <MovieModal
          movieId={selectedId}
          onClose={() => setSelectedId(null)}
          saved={saved}
        />
      )}
    </div>
  );
}

export default App;
