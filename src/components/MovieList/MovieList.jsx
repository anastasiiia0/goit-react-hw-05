import css from './MovieList.module.css';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.trendFilmsListItem, isActive && css.isActive);
};

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.trendFilmsList}>
      {movies.map(film => (
        <li key={film.id}>
          <NavLink
            to={`/movies/${film.id}`}
            state={location}
            className={buildLinkClass}
          >
            {film.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
