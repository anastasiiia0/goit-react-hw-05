import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import GoBackLink from '../../components/GoBackLink/GoBackLink';
import { fetchMovieDetails } from '../../../movies-api';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';

  const { movieId } = useParams();

  useEffect(() => {
    async function showMovieDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        // console.log(data);
        setMovieDetails(data);
      } catch (error) {
        // console.log(error);
      }
    }

    showMovieDetails();
  }, [movieId]);

  return (
    <div className={css.moviePage}>
      <GoBackLink pathBackTo={backLinkHref} />
      {movieDetails && (
        <MovieDetails movieDetails={movieDetails} state={location} />
      )}
    </div>
  );
}
