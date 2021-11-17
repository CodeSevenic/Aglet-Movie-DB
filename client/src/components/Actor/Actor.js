import React from 'react';
import './Actor.scss';

const Actor = ({ name, character, imageUrl }) => {
  return (
    <div className="actor_wrapper">
      <img className="actor_img" src={imageUrl} alt="actor-thumb" />
      <h3>{name}</h3>
      <p>{character}</p>
    </div>
  );
};

export default Actor;
