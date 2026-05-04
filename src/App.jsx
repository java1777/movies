import axios from "axios";
import { useEffect, useState } from "react";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

let API_KEY = "dcea1fd7b3e65d34387ad6de7ef9cc5e";

function App() {
  const [action, setAction] = useState("top_rated");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${action}?api_key=${API_KEY}&page=${page}`;

    async function fetchApi() {
      const data = await axios.get(apiUrl);
      if (!title) {
        setMovies(data.data.results);
      }

      if (title) {
        setMovies(
          data.data.results.filter((movie) =>
            movie.title.toLowerCase().includes(title.toLowerCase()),
          ),
        );
      }

      if (score) {
        setMovies(
          movies.filter(
            (movie) =>
              movie.vote_average >= +score && movie.vote_average < +score + 1,
          ),
        );
      }
    }

    fetchApi();
  }, [movies, action, page, title, score]);

  function checkedAction(checkedAction) {
    window.localStorage.setItem("action", checkedAction);
    setAction(checkedAction);
    setPage(1);
  }

  return (
    <div>
      <div class="header-inner">
        <div class="container rel">
          <div class="row2">
            <button
              onClick={() => checkedAction("top_rated")}
              value="top_rated"
              class="btns"
            >
              Top kinolar
            </button>
            <button
              onClick={() => checkedAction("popular")}
              value="popular"
              class="btns"
            >
              popular
            </button>
            <button
              onClick={() => checkedAction("upcoming")}
              value="upcoming"
              class="btns"
            >
              upcoming
            </button>
          </div>
          <Search
            setTitle={setTitle}
            setScore={setScore}
            score={score}
            movies={movies}
            setMovies={setMovies}
          />
        </div>
      </div>

      <div class="container">
        <Movies movies={movies} />
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default App;
