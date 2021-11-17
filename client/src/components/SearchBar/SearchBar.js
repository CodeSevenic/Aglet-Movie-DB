import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.scss';
// image
import searchIcon from '../../images/search-icon.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { search } from '../../_actions/user_actions';

const SearchBar = ({ setSearchTerm, Style }) => {
  const searchState = useSelector((state) => state.user.search);
  const dispatch = useDispatch();
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(searchState);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchState, setSearchTerm]);

  return (
    <div style={{ display: `${Style}` }} className="searchbar_wrapper">
      <div className="searchbar_content">
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => dispatch(search(event.currentTarget.value))}
          value={searchState}
        />
      </div>
    </div>
  );
};

export default SearchBar;
