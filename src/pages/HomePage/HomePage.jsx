import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../../movies-api';

export default function HomePage() {
  const [trendFilms, setTrendFilms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function showTrendMovies() {
      try {
        setLoader(true);
        setError(false);

        const data = await fetchTrendingMovies();
        setTrendFilms(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    showTrendMovies();
  }, []);

  return (
    <>
      <div className={css.homePage}>
        <h1 className={css.homePageTitle}>Trending today</h1>
        {trendFilms.length > 0 && <MovieList movies={trendFilms} />}
      </div>

      {loader && <p className={css.infoMessage}>Loading...</p>}
      {error && <p className={css.infoMessage}>Oops, something went wrong.</p>}
    </>
  );
}
