import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Logo from '../../images/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import { useHomeFetch } from '../../hooks/useHomeFetch';
import { logoutUser, search } from '../../_actions/user_actions';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const { state, setSearchTerm } = useHomeFetch();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const node = useRef();

  const onClickOutside = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener('click', onClickOutside, true);

    // return function to be called when unmounted
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, []);

  return (
    <div className="header_wrapper">
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="header_content">
        <div ref={node} className={`header_mobile-menu ${open ? 'open' : ''}`}>
          <div>
            <h3>
              {user.user_token && user.req_token
                ? `Hi ${user.username}!`
                : 'Hi Guest!'}
            </h3>
            <FavoriteButton />
            <>
              {user.user_token && user.req_token ? (
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="header_signIn-button"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="header_signIn-button">Sign In</button>
                  </Link>
                  <Link to="/register">
                    <button className="header_signUp-button">Sign Up</button>
                  </Link>{' '}
                </>
              )}
              <Link to="/contact">
                <button className="header_signIn-button">Contact Me</button>
              </Link>
            </>
          </div>
        </div>
        <Link to="/" onClick={() => dispatch(search(''))}>
          <img className="header_logoImg" src={Logo} alt="MovieDB Logo" />
        </Link>
        <h3 className="hi_user">
          {user.user_token && user.req_token
            ? `Hi ${user.username}!`
            : 'Hi Guest!'}
        </h3>

        <FavoriteButton Class="favorite" />
        <div className="auth_button">
          {user.user_token && user.req_token ? (
            <button
              onClick={() => dispatch(logoutUser())}
              className="header_signIn-button"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="header_signIn-button">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="header_signUp-button">Sign Up</button>
              </Link>{' '}
            </>
          )}
          <Link to="/contact">
            <button className="header_signIn-button">Contact Me</button>
          </Link>
        </div>

        <GiHamburgerMenu
          className="header_menu-icon"
          onClick={() => setOpen(true)}
        />
      </div>
    </div>
  );
};

export default Header;
