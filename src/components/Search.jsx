export default function Search({ setTitle }) {
  return (
    <div class="fl">
      <div class="row1">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="search"
          id="search"
        />
      </div>
      <div class="row1">
        <input type="number" placeholder="min" id="min" />
        <input type="number" placeholder="max" id="max" />
      </div>
      <div class="row1">
        <input type="number" placeholder="score" id="score" />
      </div>
      <button class="btn" type="button">
        button
      </button>
    </div>
  );
}
