import { useSettings } from "../context/SettingsContext";

export default function Pagination({ page, setPage, totalPages }) {
  const { t } = useSettings();

  function prev() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    if (page < totalPages) setPage(page + 1);
  }

  return (
    <div className="pn">
      <button onClick={prev} className="prev" disabled={page <= 1}>
        ← {t("prev")}
      </button>
      <span className="title">
        {page} / {totalPages}
      </span>
      <button onClick={next} className="next" disabled={page >= totalPages}>
        {t("next")} →
      </button>
    </div>
  );
}
