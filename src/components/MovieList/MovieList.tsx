import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import { Movie } from "../../types.ts/movie";

type Movies = {
  movies: Movie[];
};

export default function MovieList({ movies }: Movies) {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={css.listItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className={css.img}
              />
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={css.link}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
