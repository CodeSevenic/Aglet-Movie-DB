import React from 'react';
import './Thumb.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToFavorite } from '../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

const ThumbII = ({
  image,
  movieId,
  title,
  release_date,
  vote,
  data,
  color,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onHandleClick = (data) => {
    dispatch(addMovieToFavorite(user.account_id, user.sessionId, data));
  };

  const clickRes = () => {
    if (user.req_token && user.user_token) {
      onHandleClick(data);
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <div className="thumb_wrapper">
        <button
          onClick={() => clickRes()}
          style={color}
          className="MuiButtonBase-root MuiButton-root MuiButton-contained jss727 jss728 MuiButton-containedSecondary"
          tabIndex="0"
          type="button"
        >
          <span className="MuiButton-label">
            <svg
              className="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </span>
          <span className="MuiTouchRipple-root"></span>
        </button>
        <Link className="jss719" to={`/${movieId}`}>
          <div className="jss720">
            <img className="thumb_image" src={image} alt={image} />
          </div>
          {title && (
            <div className="jss723">
              <h4 className="MuiTypography-root jss724 MuiTypography-body1">
                {title}
              </h4>
              {vote && (
                <p
                  className="MuiTypography-root jss725 MuiTypography-body1"
                  style={{ backgroundColor: 'rgb(95, 187, 103)' }}
                >
                  {vote}
                </p>
              )}
              {release_date && (
                <p className="MuiTypography-root jss726 MuiTypography-body1">
                  Release Date • {release_date}
                </p>
              )}
            </div>
          )}
        </Link>
      </div>
    </>
  );
};

export default ThumbII;
