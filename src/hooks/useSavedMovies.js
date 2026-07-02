import { useEffect, useState } from "react";

function loadList(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

// Manages "liked" and "watchlist" collections, persisted to localStorage.
// Full movie objects are stored so saved lists render without a re-fetch.
export function useSavedMovies() {
  const [liked, setLiked] = useState(() => loadList("liked"));
  const [watchlist, setWatchlist] = useState(() => loadList("watchlist"));

  useEffect(() => {
    window.localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    window.localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function toggle(setList, movie) {
    setList((list) =>
      list.some((m) => m.id === movie.id)
        ? list.filter((m) => m.id !== movie.id)
        : [movie, ...list],
    );
  }

  return {
    liked,
    watchlist,
    isLiked: (id) => liked.some((m) => m.id === id),
    isWatched: (id) => watchlist.some((m) => m.id === id),
    toggleLike: (movie) => toggle(setLiked, movie),
    toggleWatch: (movie) => toggle(setWatchlist, movie),
  };
}
