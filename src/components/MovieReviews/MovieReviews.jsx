import css from './MovieReviews.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../../movies-api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieReviews() {
      try {
        setLoader(true);
        setError(false);

        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    showMovieReviews();
  }, [movieId]);

  return (
    <>
      {movieReviews &&
        (movieReviews.length > 0 ? (
          <ul className={css.movieReviewsList}>
            {movieReviews.map(review => (
              <li key={review.id} className={css.movieReviewsListItem}>
                <p className={css.authorName}>Author: {review.author}</p>
                <p className={css.reviewContent}>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.infoMessage}>No info</p>
        ))}

      {error && <p>Oops, something went wrong</p>}
      {loader && <p className={css.infoMessage}>Loading...</p>}
    </>
  );
}
