import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { fetchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import { IoIosSearch } from "react-icons/io";
import { Movie } from "../../types.ts/movie";

export default function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    const fetchMovieData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(false);
        const data: Movie[] = await fetchMovies(query);
        localStorage.setItem("movies", JSON.stringify(data));
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [searchParams]);

  const setParam = (query: string) => {
    setSearchParams({ query });
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = (
      form.elements.namedItem("query") as HTMLInputElement
    ).value.trim();
    if (!query) return;

    setSearchQuery(query);
    setParam(query);
  };
  const onChangeForm = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitForm} className={css.form}>
        <button className={css.buttonSearch}>
          <IoIosSearch className={css.iconss} />
          Search
        </button>
        <input
          className={css.search}
          name="query"
          value={searchQuery}
          onChange={onChangeForm}
          placeholder="Search here your movie..."
        />
        {loading && <p>Loading Wait please...</p>}
        {!loading && !error && movies.length === 0 && searchQuery && (
          <p>Sorry, we have found nothing.</p>
        )}
        <MovieList movies={movies} />
      </form>
    </>
  );
}
