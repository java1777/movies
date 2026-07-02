import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Movie } from "../types/tmdb";

type SavedMovie = Pick<
  Movie,
  "id" | "title" | "poster_path" | "vote_average" | "release_date" | "overview"
>;

function toSaved(movie: Movie): SavedMovie {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    overview: movie.overview,
  };
}

export interface SavedMovies {
  liked: SavedMovie[];
  watchlist: SavedMovie[];
  isLiked: (id: number) => boolean;
  isWatched: (id: number) => boolean;
  toggleLike: (movie: Movie) => void;
  toggleWatch: (movie: Movie) => void;
}

export function useSavedMovies(): SavedMovies {
  const [liked, setLiked] = useLocalStorage<SavedMovie[]>("liked", []);
  const [watchlist, setWatchlist] = useLocalStorage<SavedMovie[]>(
    "watchlist",
    [],
  );

  const makeToggle = useCallback(
    (setList: (fn: (prev: SavedMovie[]) => SavedMovie[]) => void) =>
      (movie: Movie) =>
        setList((list) =>
          list.some((m) => m.id === movie.id)
            ? list.filter((m) => m.id !== movie.id)
            : [toSaved(movie), ...list],
        ),
    [],
  );

  return {
    liked,
    watchlist,
    isLiked: (id) => liked.some((m) => m.id === id),
    isWatched: (id) => watchlist.some((m) => m.id === id),
    toggleLike: makeToggle(setLiked),
    toggleWatch: makeToggle(setWatchlist),
  };
}
