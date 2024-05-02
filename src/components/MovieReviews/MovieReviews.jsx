import css from './MovieReviews.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../../movies-api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {}
    }
    showMovieReviews();
  }, [movieId]);

  return (
    <ul className={css.movieReviewsList}>
      {movieReviews.map(review => (
        <li key={review.id} className={css.movieReviewsListItem}>
          <p className={css.authorName}>Author: {review.author}</p>
          <p className={css.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
