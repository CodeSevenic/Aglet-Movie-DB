import React from 'react';
import './BreadCrumb.scss';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ movieTitle }) => {
  return (
    <div className="bread-crumb_wrapper">
      <div className="bread-crumb_content">
        <Link to="/">
          <span>Home</span>
        </Link>
        <span>|</span>
        <span>{movieTitle}</span>
      </div>
    </div>
  );
};

export default BreadCrumb;
