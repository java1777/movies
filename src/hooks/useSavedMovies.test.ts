import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSavedMovies } from "./useSavedMovies";
import type { Movie } from "../types/tmdb";

const movie: Movie = {
  id: 1,
  title: "Test Movie",
  overview: "overview",
  poster_path: null,
  backdrop_path: null,
  vote_average: 8,
  release_date: "2020-01-01",
};

describe("useSavedMovies", () => {
  it("toggles liked state on and off", () => {
    const { result } = renderHook(() => useSavedMovies());

    expect(result.current.isLiked(1)).toBe(false);

    act(() => result.current.toggleLike(movie));
    expect(result.current.isLiked(1)).toBe(true);
    expect(result.current.liked).toHaveLength(1);

    act(() => result.current.toggleLike(movie));
    expect(result.current.isLiked(1)).toBe(false);
    expect(result.current.liked).toHaveLength(0);
  });

  it("persists the watchlist to localStorage", () => {
    const { result } = renderHook(() => useSavedMovies());

    act(() => result.current.toggleWatch(movie));

    expect(result.current.isWatched(1)).toBe(true);
    const stored = JSON.parse(window.localStorage.getItem("watchlist") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(1);
  });

  it("stores only the fields the grid needs", () => {
    const { result } = renderHook(() => useSavedMovies());

    act(() => result.current.toggleLike(movie));

    expect(result.current.liked[0]).toEqual({
      id: 1,
      title: "Test Movie",
      poster_path: null,
      vote_average: 8,
      release_date: "2020-01-01",
      overview: "overview",
    });
  });
});
