import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user_token = sessionStorage.getItem('user_token');
  const username = sessionStorage.getItem('username');
  const req_token = sessionStorage.getItem('req_token');
  if (user_token && username && req_token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
