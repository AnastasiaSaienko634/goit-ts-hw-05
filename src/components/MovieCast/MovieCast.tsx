import { use, useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { Outlet, useParams, NavLink } from "react-router-dom";
import { fetchCast } from "../../api";

type Cast = {
  name: string;
  id: number;
  profile_path: string;
  character: string;
};

export default function MovieCast() {
  const { movieId } = useParams<{ movieId: string }>();
  const [cast, setCast] = useState<Cast[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function loadCast(): Promise<void> {
      try {
        setCast([]);
        setError(false);
        setLoading(true);
        if (movieId) {
          const data: Cast[] = await fetchCast(movieId);
          setCast(data);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadCast();
  }, [movieId]);
  return (
    <>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Whoops we have some problem, please reset your WebSite!</p>}
      <ul className={css.list}>
        {cast && cast.length > 0 ? (
          cast.map((el) => (
            <li key={el.id} className={css.card}>
              <img
                className={css.porter}
                src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                alt={el.name}
              ></img>
              <h2>{el.name}</h2>
              <p>Character:{el.character}</p>
            </li>
          ))
        ) : (
          <p>We don't have information about Actors.</p>
        )}
      </ul>
    </>
  );
}
