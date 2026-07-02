import { tmdbClient } from "./tmdbClient";
import type {
  Category,
  MovieDetails,
  Movie,
  Paginated,
} from "../types/tmdb";

export interface MovieQuery {
  category: Category;
  page: number;
  query: string;
  minScore: string;
  maxScore: string;
  language: string;
}

const categorySort: Record<Category, string> = {
  top_rated: "vote_average.desc",
  popular: "popularity.desc",
  upcoming: "primary_release_date.desc",
};

export async function fetchMovies({
  category,
  page,
  query,
  minScore,
  maxScore,
  language,
}: MovieQuery): Promise<Paginated<Movie>> {
  if (query.trim()) {
    const { data } = await tmdbClient.get<Paginated<Movie>>("/search/movie", {
      params: { query: query.trim(), page, language },
    });
    return data;
  }

  if (minScore || maxScore) {
    const { data } = await tmdbClient.get<Paginated<Movie>>(
      "/discover/movie",
      {
        params: {
          page,
          language,
          sort_by: categorySort[category],
          "vote_count.gte": 100,
          "vote_average.gte": minScore || undefined,
          "vote_average.lte": maxScore || undefined,
        },
      },
    );
    return data;
  }

  const { data } = await tmdbClient.get<Paginated<Movie>>(
    `/movie/${category}`,
    { params: { page, language } },
  );
  return data;
}

export async function fetchMovieDetails(
  id: number,
  language: string,
): Promise<{ details: MovieDetails; trailerKey: string }> {
  const langShort = language.split("-")[0];

  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
    params: {
      language,
      append_to_response: "videos",
      include_video_language: `${langShort},en`,
    },
  });

  let overview = data.overview;
  if (!overview) {
    const { data: en } = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
      params: { language: "en-US" },
    });
    overview = en.overview;
  }

  const videos = data.videos?.results ?? [];
  const trailer =
    videos.find(
      (v) =>
        v.site === "YouTube" &&
        v.type === "Trailer" &&
        v.iso_639_1 === langShort,
    ) ??
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    videos.find((v) => v.site === "YouTube");

  return {
    details: { ...data, overview },
    trailerKey: trailer?.key ?? "",
  };
}
