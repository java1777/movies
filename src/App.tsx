import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Movies from "./components/Movies";
import MovieSkeleton from "./components/MovieSkeleton";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import { useDebounce } from "./hooks/useDebounce";
import { useHideOnScroll } from "./hooks/useHideOnScroll";
import { useMovies } from "./hooks/useMovies";
import { useSavedMovies } from "./hooks/useSavedMovies";
import { useSettings } from "./hooks/useSettings";
import { LANGUAGES, type Lang } from "./i18n/translations";
import type { Category, Movie, View } from "./types/tmdb";

const MovieModal = lazy(() => import("./components/MovieModal"));

const CATEGORY_KEYS = {
  top_rated: "topRated",
  popular: "popular",
  upcoming: "upcoming",
} as const;

function App() {
  const { t, lang, setLang, theme, toggleTheme, tmdbLang } = useSettings();
  const saved = useSavedMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  const headerHidden = useHideOnScroll();

  const view = (searchParams.get("view") as View) || "top_rated";
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("q") ?? "";
  const minScore = searchParams.get("min") ?? "";
  const maxScore = searchParams.get("max") ?? "";
  const selectedId = searchParams.get("movie");

  const isSavedView = view === "liked" || view === "watchlist";

  const [titleInput, setTitleInput] = useState(query);
  const [minInput, setMinInput] = useState(minScore);
  const [maxInput, setMaxInput] = useState(maxScore);
  const debTitle = useDebounce(titleInput);
  const debMin = useDebounce(minInput);
  const debMax = useDebounce(maxInput);

  useEffect(() => {
    const same =
      (searchParams.get("q") ?? "") === debTitle &&
      (searchParams.get("min") ?? "") === debMin &&
      (searchParams.get("max") ?? "") === debMax;
    if (same) return;

    const next = new URLSearchParams(searchParams);
    setParam(next, "q", debTitle);
    setParam(next, "min", debMin);
    setParam(next, "max", debMax);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debTitle, debMin, debMax]);

  const category: Category = isSavedView ? "top_rated" : (view as Category);
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useMovies(
    { category, page, query, minScore, maxScore, language: tmdbLang },
    !isSavedView,
  );

  const savedFiltered = useMemo(() => {
    const list = view === "liked" ? saved.liked : saved.watchlist;
    return list.filter((m) => {
      const okTitle = m.title.toLowerCase().includes(query.toLowerCase());
      const okMin = minScore ? m.vote_average >= +minScore : true;
      const okMax = maxScore ? m.vote_average <= +maxScore : true;
      return okTitle && okMin && okMax;
    });
  }, [view, saved.liked, saved.watchlist, query, minScore, maxScore]);

  const movies: Movie[] = isSavedView
    ? (savedFiltered as Movie[])
    : (data?.results ?? []);
  const totalPages = isSavedView
    ? 1
    : Math.min(data?.total_pages ?? 1, 500);

  function updateParams(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    setSearchParams(next);
  }

  const changeView = (v: View) =>
    updateParams((p) => {
      p.set("view", v);
      p.set("page", "1");
    });
  const changePage = (p: number) =>
    updateParams((sp) => sp.set("page", String(p)));
  const openMovie = (id: number) =>
    updateParams((p) => p.set("movie", String(id)));
  const closeMovie = () => updateParams((p) => p.delete("movie"));

  const emptyMessage =
    view === "liked"
      ? t("noFavorites")
      : view === "watchlist"
        ? t("noWatchlist")
        : t("noMovies");

  return (
    <div>
      <header className={`header-inner ${headerHidden ? "header-hidden" : ""}`}>
        <div className="container topbar">
          <div className="row2">
            {(Object.keys(CATEGORY_KEYS) as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => changeView(c)}
                className={`btns ${view === c ? "active" : ""}`}
              >
                {t(CATEGORY_KEYS[c])}
              </button>
            ))}
            <button
              onClick={() => changeView("liked")}
              className={`btns ${view === "liked" ? "active" : ""}`}
            >
              ❤️ {t("favorites")} ({saved.liked.length})
            </button>
            <button
              onClick={() => changeView("watchlist")}
              className={`btns ${view === "watchlist" ? "active" : ""}`}
            >
              🔖 {t("watchLater")} ({saved.watchlist.length})
            </button>
          </div>

          <div className="settings">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
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
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="container">
          <Search
            title={titleInput}
            setTitle={setTitleInput}
            minScore={minInput}
            setMinScore={setMinInput}
            maxScore={maxInput}
            setMaxScore={setMaxInput}
          />
        </div>
      </header>

      <main className="container">
        {isError && (
          <p className="status error">
            {t("fetchError")}{" "}
            <button className="link-btn" onClick={() => refetch()}>
              {t("retry")}
            </button>
          </p>
        )}

        {isLoading ? (
          <MovieSkeleton />
        ) : movies.length === 0 && !isError ? (
          <p className="status">{emptyMessage}</p>
        ) : (
          <div className={isFetching ? "dimmed" : ""}>
            <Movies movies={movies} onSelect={openMovie} saved={saved} />
          </div>
        )}

        {!isSavedView && movies.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        )}
      </main>

      {selectedId && (
        <Suspense fallback={null}>
          <MovieModal
            movieId={Number(selectedId)}
            onClose={closeMovie}
            saved={saved}
          />
        </Suspense>
      )}
    </div>
  );
}

function setParam(params: URLSearchParams, key: string, value: string) {
  if (value) params.set(key, value);
  else params.delete(key);
}

export default App;
