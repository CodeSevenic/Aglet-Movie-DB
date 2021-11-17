import React from 'react';
import NoImage from '../images/no_image.jpg';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../Config';
import Grid from './Grid/Grid';
import ThumbII from './Thumb/Thumb';

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);

  const getBoolean = (movieId) => {
    let value;
    favorites.forEach((element) => {
      if (movieId === element.id) {
        value = true;
      }
    });
    return value;
  };

  return (
    <div style={{ paddingBottom: '15rem' }}>
      {
        <Grid header={'Favorite Movies'}>
          {favorites.map((movie) => {
            let id = Math.random(0, 1000);
            const bodyData = {
              media_type: 'movie',
              media_id: movie.id,
              favorite: false,
            };
            return (
              <ThumbII
                color={{
                  backgroundColor: getBoolean(movie.id) ? 'red' : '#4b575fe6',
                }}
                data={bodyData}
                key={movie.id + id}
                title={movie.title}
                release_date={movie.release_date}
                vote={movie.vote_average}
                image={
                  movie.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movieId={movie.id}
              />
            );
          })}
        </Grid>
      }
    </div>
  );
};

export default Favorites;
