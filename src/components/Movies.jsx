import { useSettings } from "../context/SettingsContext";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMG =
  "https://via.placeholder.com/300x450?text=No+Image";

function scoreColor(vote) {
  if (vote >= 8) return "green";
  if (vote >= 6) return "orange";
  return "red";
}

export default function Movies({ movies, onSelect, saved }) {
  const { t } = useSettings();

  function stop(e, fn) {
    e.stopPropagation();
    fn();
  }

  return (
    <div className="append">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie"
          onClick={() => onSelect(movie.id)}
        >
          <div className="card-actions">
            <button
              className={`icon-btn ${saved.isLiked(movie.id) ? "active-like" : ""}`}
              title="Like"
              onClick={(e) => stop(e, () => saved.toggleLike(movie))}
            >
              {saved.isLiked(movie.id) ? "❤️" : "🤍"}
            </button>
            <button
              className={`icon-btn ${saved.isWatched(movie.id) ? "active-watch" : ""}`}
              title="Keyinroq ko'rish"
              onClick={(e) => stop(e, () => saved.toggleWatch(movie))}
            >
              {saved.isWatched(movie.id) ? "🔖" : "🏷️"}
            </button>
          </div>

          <img
            src={
              movie.poster_path
                ? IMG_BASE + movie.poster_path
                : FALLBACK_IMG
            }
            alt={movie.title}
            loading="lazy"
          />

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
      ))}
    </div>
  );
}
