import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import GoBackLink from '../../components/GoBackLink/GoBackLink';
import { fetchMovieDetails } from '../../../movies-api';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/movies');

  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieDetails() {
      try {
        setLoader(true);
        setError(false);

        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    showMovieDetails();
  }, [movieId]);

  return (
    <>
      <div className={css.moviePage}>
        <GoBackLink pathBackTo={backLinkHref.current} />
        {movieDetails && <MovieDetails movieDetails={movieDetails} />}
      </div>

      {loader && <p className={css.infoMessage}>Loading...</p>}
      {error && <p className={css.infoMessage}>Oops, something went wrong</p>}
    </>
  );
}
