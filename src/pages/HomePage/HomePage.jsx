import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../../movies-api';

export default function HomePage() {
  const [trendFilms, setTrendFilms] = useState([]);

  useEffect(() => {
    async function showTrendMovies() {
      try {
        const data = await fetchTrendingMovies();
        setTrendFilms(data);
      } catch (error) {
        // console.log(error);
      }
    }
    showTrendMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h1 className={css.homePageTitle}>Trending today</h1>
      {trendFilms.length > 0 && <MovieList movies={trendFilms} />}
    </div>
  );
}
