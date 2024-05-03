import css from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieWithQuery } from '../../../movies-api';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    async function showMoviesWithQuery() {
      try {
        setLoader(true);
        setError(false);

        const data = await fetchMovieWithQuery(movieQuery);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    if (movieQuery !== '') {
      showMoviesWithQuery();
    }
  }, [movieQuery]);

  const updateQueryString = query => {
    searchParams.set('query', query);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className={css.moviesPage}>
        <SearchBar onSubmit={updateQueryString} />

        {movies &&
          (movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <p className={css.infoMessage}>No movie with such query</p>
          ))}
      </div>

      {loader && <p className={css.infoMessage}>Loading...</p>}
      {error && <p className={css.infoMessage}>Oops, something went wrong</p>}
    </>
  );
}
