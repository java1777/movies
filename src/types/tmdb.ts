export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
  iso_639_1: string;
}

export interface MovieDetails extends Movie {
  tagline: string;
  runtime: number;
  genres: Genre[];
  videos?: { results: Video[] };
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type Category = "top_rated" | "popular" | "upcoming";
export type SavedView = "liked" | "watchlist";
export type View = Category | SavedView;
