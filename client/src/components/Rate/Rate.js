import React, { useState } from 'react';
import './Rate.scss';

const Rate = ({ callback }) => {
  const [value, setValue] = useState();
  return (
    <div className="rate_wrapper">
      <input
        type="range"
        min="1"
        max="10"
        value={value || ''}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {value}
      <p>
        <button onClick={() => callback(value)}>Rate</button>
      </p>
    </div>
  );
};

export default Rate;
