import axios from 'axios';

const baseImgURL = 'https://image.tmdb.org/t/p/';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGE1YjgwYmNmOTExOThiY2EyNDJjNjg2OThiN2YwNSIsInN1YiI6IjY2MzI1NmQ0ZmU2YzE4MDEyYzJlZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGEO7SZTWHB8i2DGrmExQZlXCWI4b3xLQjad3g4H-lY';
const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${apiAccessToken}`,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get('trending/movie/day', {
    headers: headers,
  });
  return response.data.results;
};

export const fetchMovieDetails = async id => {
  const response = await axios.get(`movie/${id}`, {
    headers: headers,
  });

  const responseWithConfig = {
    data: {
      ...response.data,
      poster_path: `${baseImgURL}w500${response.data.poster_path}`,
      vote_average: response.data.vote_average.toFixed(1),
    },
  };

  return responseWithConfig.data;
};

export const fetchMovieCast = async id => {
  const response = await axios.get(`movie/${id}/credits`, {
    headers: headers,
  });

  const responseWithConfig = response.data.cast.map(actor => ({
    ...actor,
    profile_path: actor.profile_path
      ? `${baseImgURL}w200${actor.profile_path}`
      : '/src/img/img-not-found.jpg',
  }));

  return responseWithConfig;
};

export const fetchMovieReviews = async id => {
  const response = await axios.get(`movie/${id}/reviews`, {
    headers: headers,
  });

  return response.data.results;
};

export const fetchMovieWithQuery = async query => {
  const response = await axios.get('search/movie', {
    params: {
      query,
    },
    headers: headers,
  });
  return response.data.results;
};
