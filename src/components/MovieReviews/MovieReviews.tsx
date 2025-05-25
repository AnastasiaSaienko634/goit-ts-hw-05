import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../api";
import { Review } from "../../types.ts/review";

export default function MovieReviews() {
  const { movieId } = useParams<{ movieId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function loadReviews(): Promise<void> {
      try {
        setError(false);
        setLoading(true);
        if (!movieId) {
          setError(true);
          return;
        }
        const data: Review[] = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, [movieId]);
  return (
    <>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Whoops, something went wrong. Please try again later!</p>}
      <ul className={css.reviewList}>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don't have reviews for this movie.</p>
        )}
      </ul>
    </>
  );
}
