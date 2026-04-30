export default function Movies({ movies }) {
  return (
    <div class="append">
      {movies.map((movie, index) => {
        return (
          <div key={index} class="movie">
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
              alt="Fast &amp; Furious Presents: Hobbs &amp; Shaw"
            />

            <div class="movie-info">
              <h3>{movie.title}</h3>
              <span class="orange">{movie.vote_average}</span>
            </div>
            <span class="date">{movie.release_date}</span>
          </div>
        );
      })}
    </div>
  );
}
