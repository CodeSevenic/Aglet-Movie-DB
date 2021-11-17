import React from 'react';
import './MovieInfoBar.scss';
// helpers
import { calcTime, convertMoney } from '../../helpers';

const MovieInfoBar = ({ time, budget, revenue }) => {
  return (
    <div className="movie-info-bar_wrapper">
      <div className="movie-info-bar_content">
        <div className="column">
          <p>Running time: {calcTime(time)}</p>
        </div>
        <div className="column">
          <p>Budget: {convertMoney(budget)}</p>
        </div>
        <div className="column">
          <p>Revenue: {convertMoney(revenue)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
