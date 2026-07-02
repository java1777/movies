import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  console.warn(
    "VITE_TMDB_API_KEY is not set. Create a .env file (see .env.example).",
  );
}

export const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY },
});

export const IMG = {
  poster: (path: string | null) =>
    path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "https://via.placeholder.com/300x450?text=No+Image",
  backdrop: (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/original${path}` : "",
};
