import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './MovieDetails.module.css';
import clsx from 'clsx';

export default function MovieDetails({
  movieDetails: { poster_path, title, vote_average, overview, genres },
}) {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.additionalInfoLink, isActive && css.isActive);
  };
  return (
    <div>
      <div className={css.movieCard}>
        <img src={poster_path} alt={title} className={css.movieImg}></img>
        <div className={css.movieInfo}>
          <h2 className={css.movieName}>{title}</h2>
          <p className={css.movieRating}>Rating: {vote_average}</p>
          <h3 className={css.movieHeaderText}>Overview</h3>
          <p className={css.movieOverview}>{overview}</p>
          <h3 className={css.movieHeaderText}>Genres</h3>
          <ul className={css.genresList}>
            {genres.map(genre => (
              <li key={genre.id} className={css.genresListItem}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3 className={css.movieHeaderText}>Additional information</h3>
        <ul className={css.additionalInfoList}>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p className={css.infoMessage}>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
