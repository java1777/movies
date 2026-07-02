import { useSettings } from "../hooks/useSettings";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const { t } = useSettings();

  return (
    <div className="pn">
      <button
        onClick={() => onPageChange(page - 1)}
        className="prev"
        disabled={page <= 1}
      >
        ← {t("prev")}
      </button>
      <span className="title">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        className="next"
        disabled={page >= totalPages}
      >
        {t("next")} →
      </button>
    </div>
  );
}
