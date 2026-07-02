import MovieCard from "./MovieCard";
import type { SavedMovies } from "../hooks/useSavedMovies";
import type { Movie } from "../types/tmdb";

interface Props {
  movies: Movie[];
  onSelect: (id: number) => void;
  saved: SavedMovies;
}

export default function Movies({ movies, onSelect, saved }: Props) {
  return (
    <div className="append">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
          saved={saved}
        />
      ))}
    </div>
  );
}
