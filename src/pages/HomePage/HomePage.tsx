import css from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { Movie } from "../../types.ts/movie";
import { RiMovie2AiLine } from "react-icons/ri";

export default function HomePage() {
  const [trandingMovie, setTrandingMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    async function fetchingTrandingMovie(): Promise<void> {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchTrendingMovies();
        setTrandingMovie(data.results);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchingTrandingMovie();
  }, []);
  return (
    <>
      <h1 className={css.title}>
        Trending Today
        <RiMovie2AiLine className={css.icon} />
      </h1>
      {error && <p>Whoops something wrong, please reset webSite!</p>}
      {loading && <p>Loading please wait...</p>}
      {trandingMovie.length > 0 && <MovieList movies={trandingMovie} />}
    </>
  );
}
