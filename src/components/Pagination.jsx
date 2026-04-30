export default function Pagination({ page, setPage }) {
  function prevCount() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  return (
    <div class="pn">
      <button onClick={prevCount} class="prev">
        prev
      </button>
      <span class="title">{page}</span>
      <button onClick={() => setPage((prev) => prev + 1)} class="next">
        next
      </button>
    </div>
  );
}
