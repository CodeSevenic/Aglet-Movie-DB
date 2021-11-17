import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  SEARCHING,
  REGISTER_ERROR,
  ADMIN_LOGIN,
  LOGIN_REQ,
  LOGOUT_REQ,
  GET_FAVORITE,
  LOGIN_STATUS,
  REGISTER_REQ,
} from './types';
import {
  USER_SERVER,
  baseUrl,
  ADD_TO_FAV,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  PASSWORD,
  USERNAME,
  ACCOUNT_ID,
  GET_FAV_MOVIES,
} from '../Config.js';

export const registerUser = (dataToSubmit) => {
  const { email, password } = dataToSubmit;
  const loginData = {
    email: email,
    password: password,
  };
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQ });
    try {
      const res = await axios.post(
        `${baseUrl}${USER_SERVER}/register`,
        dataToSubmit
      );
      if (res.status === 200) {
        dispatch({ type: REGISTER_USER, payload: res });
        if (res.data.success) dispatch(loginUser(loginData));
      } else {
        const { error } = res.data;
        dispatch({ type: REGISTER_ERROR, payload: error });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({ type: REGISTER_ERROR, payload: data.error });
    }
  };
};

export const loginUser = (dataToSubmit) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQ });
    // regular user login
    const res = await axios.post(
      `${baseUrl}${USER_SERVER}/login`,
      dataToSubmit
    );
    const { token, name, loginSuccess } = res.data;

    dispatch({ type: LOGIN_STATUS, loginStatus: loginSuccess });

    if (loginSuccess) {
      const reqToken = await axios.get(REQUEST_TOKEN_URL);
      const { request_token } = reqToken.data;

      // admin login (not recommend for real world app)
      const adminLog = {
        username: USERNAME,
        password: PASSWORD,
        request_token: request_token,
      };

      // header config
      const defaultConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // authenticate the requestToken
      const auth = await axios.post(LOGIN_URL, adminLog);
      if (auth.data.success && loginSuccess) {
        // Then get the sessionId with the requestToken
        const sessionId = await (
          await fetch(SESSION_ID_URL, {
            ...defaultConfig,
            body: JSON.stringify({ request_token: request_token }),
          })
        ).json();
        const { session_id } = sessionId;
        // get account Id
        const acc_id = await axios.get(ACCOUNT_ID(session_id));
        const { id } = acc_id.data;
        sessionStorage.setItem('account_id', id);
        sessionStorage.setItem('session_id', session_id);

        dispatch({
          type: ADMIN_LOGIN,
          account_id: id,
          request_token: request_token,
          sessionId: session_id,
        });
        dispatch({
          type: LOGIN_USER,
          user_token: token,
          username: name,
        });
        // store to sessionStorage
        sessionStorage.setItem('user_token', token);
        sessionStorage.setItem('username', name);
        sessionStorage.setItem('req_token', request_token);
      }
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    const req = await axios.get(`${baseUrl}${USER_SERVER}/auth`);
    dispatch({ type: AUTH_USER, payload: req.data });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQ });
    const req = await axios.get(`${baseUrl}${USER_SERVER}/logout`);
    const _token = sessionStorage.removeItem('user_token');
    const _account_id = sessionStorage.removeItem('account_id');
    const _username = sessionStorage.removeItem('username');
    const _req_token = sessionStorage.removeItem('req_token');
    const _session_id = sessionStorage.removeItem('session_id');
    dispatch({
      type: LOGOUT_USER,
      user_token: _token,
      account_id: _account_id,
      username: _username,
      request_token: _req_token,
      sessionId: _session_id,
    });
  };
};

export const search = (value) => {
  return async (dispatch) => {
    dispatch({ type: SEARCHING, value: value });
  };
};

export const addMovieToFavorite = (account_id, session_id, data) => {
  return async (dispatch) => {
    const res = await axios.post(ADD_TO_FAV(account_id, session_id), data);
    dispatch(getFavoriteMovies(account_id, session_id));
  };
};

export const getFavoriteMovies = (account_id, session_id) => {
  return async (dispatch) => {
    const res = await axios.get(GET_FAV_MOVIES(account_id, session_id));
    const { results } = res.data;
    dispatch({
      type: GET_FAVORITE,
      favorites: results,
    });
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const _token = sessionStorage.getItem('user_token');
    const _username = sessionStorage.getItem('username');
    const _account_id = sessionStorage.getItem('account_id');
    const acc_id = parseInt(_account_id);
    const _req_token = sessionStorage.getItem('req_token');
    const _session_id = sessionStorage.getItem('session_id');
    if (_token && _username) {
      dispatch({ type: LOGIN_USER, user_token: _token, username: _username });
    }
    if (_session_id && _req_token) {
      dispatch({
        type: ADMIN_LOGIN,
        request_token: _req_token,
        account_id: acc_id,
        sessionId: _session_id,
      });
    }
  };
};
