import css from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieWithQuery } from '../../../movies-api';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    async function showMoviesWithQuery() {
      try {
        const data = await fetchMovieWithQuery(movieQuery);
        //   console.log(data);
        setMovies(data);
      } catch (error) {
        // console.log(error);
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
    <div className={css.moviesPage}>
      <SearchBar onSubmit={updateQueryString} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
