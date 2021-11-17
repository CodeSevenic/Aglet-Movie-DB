import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  SEARCHING,
  ADMIN_LOGIN,
  LOGIN_REQ,
  LOGOUT_REQ,
  GET_FAVORITE,
  LOGIN_STATUS,
  REGISTER_REQ,
} from '../_actions/types';

const initialState = {
  username: '',
  user_token: '',
  search: '',
  req_token: '',
  loginStatus: true,
  account_id: '',
  sessionId: '',
  favorites: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQ:
      return { ...state, loading: true };
    case REGISTER_USER:
      return { ...state, register: action.payload, loading: false };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case SEARCHING:
      return { ...state, search: action.value };

    case LOGIN_REQ:
      return { ...state, loading: true };
    case LOGIN_STATUS:
      return { ...state, loginStatus: action.loginStatus, loading: false };
    case LOGIN_USER:
      return {
        ...state,
        username: action.username,
        user_token: action.user_token,
        loading: false,
      };
    case ADMIN_LOGIN:
      return {
        ...state,
        req_token: action.request_token,
        account_id: action.account_id,
        sessionId: action.sessionId,
        loading: false,
      };
    case GET_FAVORITE:
      return { ...state, favorites: action.favorites };
    case LOGOUT_REQ:
      return { ...state, loading: true };
    case LOGOUT_USER:
      return {
        ...state,
        req_token: action.request_token,
        account_id: action.account_id,
        sessionId: action.sessionId,
        username: action.username,
        user_token: action.user_token,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
