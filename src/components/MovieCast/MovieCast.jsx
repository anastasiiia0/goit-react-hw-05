import css from './MovieCast.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../../movies-api';
import { useParams } from 'react-router-dom';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieCast() {
      try {
        const data = await fetchMovieCast(movieId);
        // console.log(data);
        setMovieCast(data);
      } catch (error) {}
    }
    showMovieCast();
  }, [movieId]);

  return (
    <ul className={css.movieCastList}>
      {movieCast.map(actor => (
        <li key={actor.id} className={css.movieCastListItem}>
          <img
            src={actor.profile_path}
            alt={actor.name}
            className={css.actorPhoto}
          />
          <div className={css.actorInfo}>
            <p className={css.actorInfoTitle}>Name: {actor.original_name}</p>
            <p className={css.actorInfoTitle}>Role: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
