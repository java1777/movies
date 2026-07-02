import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchMovieDetails,
  fetchMovies,
  type MovieQuery,
} from "../api/movies";

export function useMovies(params: MovieQuery, enabled = true) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMovieDetails(id: number | null, language: string) {
  return useQuery({
    queryKey: ["movie", id, language],
    queryFn: () => fetchMovieDetails(id as number, language),
    enabled: id !== null,
    staleTime: 1000 * 60 * 10,
  });
}
