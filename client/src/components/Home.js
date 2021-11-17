import React, { useState } from 'react';
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../Config';
// Components
import HeroImage from './HeroImage/HeroImage';
import Grid from './Grid/Grid';
// import Thumb from './Thumb/Thumb';
import ThumbII from './Thumb/Thumb';
import Spinner from './Spinner/Spinner';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

// Image
import NoImage from '../images/no_image.jpg';
import { useSelector } from 'react-redux';

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();
  const favorites = useSelector((state) => state.user.favorites);
  const [count, setCount] = useState(9);

  const movieLimit = state.results.slice(0, count);

  const onLoadMore = () => {
    if (movieLimit.length <= 40) {
      setIsLoadingMore(true);
      setCount(count + 9);
    }
  };

  const getBoolean = (movieId) => {
    let value;
    favorites.forEach((element) => {
      if (movieId === element.id) {
        value = true;
      }
    });
    return value;
  };
  if (error) return <div>Something went wrong ...</div>;
  return (
    <>
      {!searchTerm && state.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      )}
      <SearchBar Style="none" setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
        {movieLimit.map((movie) => {
          let id = Math.random(0, 1000);
          const bodyData = {
            media_type: 'movie',
            media_id: movie.id,
            favorite: getBoolean(movie.id) ? false : true,
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
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => onLoadMore()} />
        // <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;
