import css from './MovieCast.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../../movies-api';
import { useParams } from 'react-router-dom';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieCast() {
      try {
        setLoader(true);
        setError(false);

        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    showMovieCast();
  }, [movieId]);

  return (
    <>
      {movieCast &&
        (movieCast.length > 0 ? (
          <ul className={css.movieCastList}>
            {movieCast.map(actor => (
              <li key={actor.id} className={css.movieCastListItem}>
                <img
                  src={actor.profile_path}
                  alt={actor.name}
                  className={css.actorPhoto}
                />
                <div className={css.actorInfo}>
                  <p className={css.actorInfoTitle}>
                    Name: {actor.original_name}
                  </p>
                  <p className={css.actorInfoTitle}>Role: {actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.infoMessage}>No info</p>
        ))}

      {error && <p className={css.infoMessage}>Oops, something went wrong</p>}
      {loader && <p className={css.infoMessage}>Loading...</p>}
    </>
  );
}
