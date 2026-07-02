import { IMG } from "../api/tmdbClient";
import { useSettings } from "../hooks/useSettings";
import type { SavedMovies } from "../hooks/useSavedMovies";
import type { Movie } from "../types/tmdb";

function scoreColor(vote: number) {
  if (vote >= 8) return "green";
  if (vote >= 6) return "orange";
  return "red";
}

interface Props {
  movie: Movie;
  onSelect: (id: number) => void;
  saved: SavedMovies;
}

export default function MovieCard({ movie, onSelect, saved }: Props) {
  const { t } = useSettings();

  function stop(e: React.MouseEvent, fn: () => void) {
    e.stopPropagation();
    fn();
  }

  return (
    <div
      className="movie"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(movie.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(movie.id);
        }
      }}
    >
      <div className="card-actions">
        <button
          className={`icon-btn ${saved.isLiked(movie.id) ? "active-like" : ""}`}
          title={t("like")}
          aria-label={t("like")}
          aria-pressed={saved.isLiked(movie.id)}
          onClick={(e) => stop(e, () => saved.toggleLike(movie))}
        >
          {saved.isLiked(movie.id) ? "❤️" : "🤍"}
        </button>
        <button
          className={`icon-btn ${saved.isWatched(movie.id) ? "active-watch" : ""}`}
          title={t("addWatchLater")}
          aria-label={t("addWatchLater")}
          aria-pressed={saved.isWatched(movie.id)}
          onClick={(e) => stop(e, () => saved.toggleWatch(movie))}
        >
          {saved.isWatched(movie.id) ? "🔖" : "🏷️"}
        </button>
      </div>

      <img src={IMG.poster(movie.poster_path)} alt={movie.title} loading="lazy" />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className={scoreColor(movie.vote_average)}>
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      <span className="date">{movie.release_date || "—"}</span>

      <div className="overview">
        <h4>{t("description")}:</h4>
        <p>{movie.overview || t("noInfo")}</p>
      </div>
    </div>
  );
}
