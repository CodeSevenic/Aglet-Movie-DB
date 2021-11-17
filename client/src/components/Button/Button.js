import React from 'react';
import './Button.scss';

const Button = ({ text, callback }) => {
  return (
    <button className="button" type="button" onClick={callback}>
      {text}
    </button>
  );
};

export default Button;
