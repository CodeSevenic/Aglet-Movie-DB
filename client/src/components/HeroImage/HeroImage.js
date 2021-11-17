import React from 'react';
import './HeroImage.scss';

const HeroImage = ({ title, text, image }) => {
  return (
    <div
      className="hero_wrapper"
      style={{
        backgroundImage: `linear-gradient(rgb(245 246 252 / 0%) 77%, rgb(247 247 247) 100%), url(${image})`,
      }}
    >
      <div className="hero_content">
        <div className="hero_text">
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
