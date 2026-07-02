import { useSettings } from "../context/SettingsContext";

export default function Search({
  title,
  setTitle,
  minScore,
  setMinScore,
  maxScore,
  setMaxScore,
}) {
  const { t } = useSettings();

  return (
    <div className="fl">
      <div className="row1">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder={t("searchPlaceholder")}
          id="search"
        />
      </div>
      <div className="row1">
        <input
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          type="number"
          min="0"
          max="10"
          placeholder={t("minRating")}
          id="min"
        />
        <input
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
          type="number"
          min="0"
          max="10"
          placeholder={t("maxRating")}
          id="max"
        />
      </div>
    </div>
  );
}
