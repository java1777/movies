import axios from "axios";
import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ movieId, onClose, saved }) {
  const { t, tmdbLang } = useSettings();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "videos",
            language: tmdbLang,
          },
          signal: controller.signal,
        });
        setDetails(data);

        const trailer = data.videos?.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer",
        );
        // Fall back to any YouTube video if no official trailer
        const fallback = data.videos?.results.find(
          (v) => v.site === "YouTube",
        );
        setTrailerKey(trailer?.key || fallback?.key || "");
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(t("detailsError"));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, tmdbLang]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Yopish">
          ✕
        </button>

        {loading && <p className="status">{t("loading")}</p>}
        {error && <p className="status error">{error}</p>}

        {details && !loading && (
          <>
            {details.backdrop_path && (
              <div
                className="modal-backdrop"
                style={{
                  backgroundImage: `url(${BACKDROP_BASE}${details.backdrop_path})`,
                }}
              />
            )}

            <div className="modal-body">
              <div className="modal-header">
                {details.poster_path && (
                  <img
                    className="modal-poster"
                    src={IMG_BASE + details.poster_path}
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
                    {details.genres?.map((g) => (
                      <span key={g.id} className="genre">
                        {g.name}
                      </span>
                    ))}
                  </div>

                  <div className="modal-actions">
                    <button
                      className={`action-btn ${saved.isLiked(details.id) ? "active-like" : ""}`}
                      onClick={() => saved.toggleLike(details)}
                    >
                      {saved.isLiked(details.id)
                        ? `❤️ ${t("liked")}`
                        : `🤍 ${t("like")}`}
                    </button>
                    <button
                      className={`action-btn ${saved.isWatched(details.id) ? "active-watch" : ""}`}
                      onClick={() => saved.toggleWatch(details)}
                    >
                      {saved.isWatched(details.id)
                        ? `🔖 ${t("inWatchlist")}`
                        : `🏷️ ${t("addWatchLater")}`}
                    </button>
                  </div>
                </div>
              </div>

              <h4>{t("description")}</h4>
              <p className="modal-overview">
                {details.overview || t("noInfo")}
              </p>

              <h4>{t("trailer")}</h4>
              {trailerKey ? (
                <div className="trailer-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    frameBorder="0"
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
