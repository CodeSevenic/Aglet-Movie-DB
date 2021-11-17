//SERVER ROUTES
const USER_SERVER = '/api/users';

const IMAGE_URL = 'http://image.tmdb.org/t/p/';

// Configuration

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '22dac7f61ba38f5950493a2d09d3a61b';
const USERNAME = 'CodeSevenic';
const PASSWORD = 'Code@Blocks@27277';
const ADD_TO_FAV = (account_id, session_id) =>
  `${API_URL}account/${account_id}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
const GET_FAV_MOVIES = (account_id, session_id) => {
  return `${API_URL}account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`;
};
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
// For login and voting
const REQUEST_TOKEN_URL = `${API_URL}authentication/token/new?api_key=${API_KEY}`;
const LOGIN_URL = `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`;
const SESSION_ID_URL = `${API_URL}authentication/session/new?api_key=${API_KEY}`;
const ACCOUNT_ID = (session_id) =>
  `${API_URL}account?api_key=${API_KEY}&session_id=${session_id}`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w780';

let baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://aglet-movie-db.herokuapp.com';

export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  USER_SERVER,
  IMAGE_URL,
  baseUrl,
  PASSWORD,
  USERNAME,
  ADD_TO_FAV,
  ACCOUNT_ID,
  GET_FAV_MOVIES,
};
