import React from 'react';
import API from '../../API';
import './MovieInfo.scss';
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../Config';
// Components
import Thumb from '../Thumb/Thumb';
import Rate from '../Rate/Rate';
// Image
import NoImage from '../../images/no_image.jpg';
// Redux State
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MovieInfo = ({ movie }) => {
  const user = useSelector((state) => state.user);

  const handleRating = async (value) => {
    const rate = await API.rateMovie(user.sessionId, movie.id, value);
  };

  const getBoolean = (movieId) => {
    let value;
    user.favorites.forEach((element) => {
      if (movieId === element.id) {
        value = true;
      }
    });
    return value;
  };
  const bodyData = {
    media_type: 'movie',
    media_id: movie.id,
    favorite: getBoolean(movie.id) ? false : true,
  };

  return (
    <div
      className="movie-info_wrapper"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path})`
          : '#000',
      }}
    >
      <div className="movie-info_content">
        <Thumb
          data={bodyData}
          color={{
            backgroundColor: getBoolean(movie.id) ? 'red' : '#4b575fe6',
          }}
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <div className="movie-info_text">
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className="movie-info_rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="movie-info_score">{movie.vote_average}</div>
            </div>
            <div className="movie-info_director">
              <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user.user_token && user.req_token ? (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          ) : (
            <div className="movie-info_rate">
              <Link to="/login">Login to Rate Movie</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
