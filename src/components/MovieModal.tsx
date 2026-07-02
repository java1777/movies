import { useEffect, useRef } from "react";
import { IMG } from "../api/tmdbClient";
import { useMovieDetails } from "../hooks/useMovies";
import { useSettings } from "../hooks/useSettings";
import type { SavedMovies } from "../hooks/useSavedMovies";
import type { Movie } from "../types/tmdb";

interface Props {
  movieId: number;
  onClose: () => void;
  saved: SavedMovies;
}

export default function MovieModal({ movieId, onClose, saved }: Props) {
  const { t, tmdbLang } = useSettings();
  const { data, isLoading, isError } = useMovieDetails(movieId, tmdbLang);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const details = data?.details;
  const trailerKey = data?.trailerKey ?? "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={details?.title ?? "Movie details"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {isLoading && <p className="status">{t("loading")}</p>}
        {isError && <p className="status error">{t("detailsError")}</p>}

        {details && (
          <>
            {details.backdrop_path && (
              <div
                className="modal-backdrop"
                style={{
                  backgroundImage: `url(${IMG.backdrop(details.backdrop_path)})`,
                }}
              />
            )}

            <div className="modal-body">
              <div className="modal-header">
                {details.poster_path && (
                  <img
                    className="modal-poster"
                    src={IMG.poster(details.poster_path)}
                    alt={details.title}
                  />
                )}
                <div className="modal-meta">
                  <h2>{details.title}</h2>
                  {details.tagline && (
                    <p className="tagline">"{details.tagline}"</p>
                  )}
                  <div className="chips">
                    <span className="chip">
                      ⭐ {details.vote_average.toFixed(1)}
                    </span>
                    <span className="chip">
                      📅 {details.release_date || "—"}
                    </span>
                    {details.runtime > 0 && (
                      <span className="chip">
                        🕒 {details.runtime} {t("minutes")}
                      </span>
                    )}
                  </div>
                  <div className="genres">
                    {details.genres.map((g) => (
                      <span key={g.id} className="genre">
                        {g.name}
                      </span>
                    ))}
                  </div>

                  <div className="modal-actions">
                    <button
                      className={`action-btn ${saved.isLiked(details.id) ? "active-like" : ""}`}
                      onClick={() => saved.toggleLike(details as Movie)}
                    >
                      {saved.isLiked(details.id)
                        ? `❤️ ${t("liked")}`
                        : `🤍 ${t("like")}`}
                    </button>
                    <button
                      className={`action-btn ${saved.isWatched(details.id) ? "active-watch" : ""}`}
                      onClick={() => saved.toggleWatch(details as Movie)}
                    >
                      {saved.isWatched(details.id)
                        ? `🔖 ${t("inWatchlist")}`
                        : `🏷️ ${t("addWatchLater")}`}
                    </button>
                  </div>
                </div>
              </div>

              <h4>{t("description")}</h4>
              <p className="modal-overview">{details.overview || t("noInfo")}</p>

              <h4>{t("trailer")}</h4>
              {trailerKey ? (
                <div className="trailer-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="status">{t("noTrailer")}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
