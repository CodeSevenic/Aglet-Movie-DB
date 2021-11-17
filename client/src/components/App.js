import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getFavoriteMovies, isUserLoggedIn } from '../_actions/user_actions';
import { useSelector } from 'react-redux';
// Components
import Header from './Header/Header';
import Home from './Home';
import ContactPage from './ContactPage/ContactPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage.js';
import Movie from './Movie';
import Favorites from './Favorites';
import PrivateRoute from '../hoc/PrivateRoute';
import Footer from './Footer/Footer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(isUserLoggedIn());
    if (user.account_id && user.sessionId) {
      dispatch(getFavoriteMovies(user.account_id, user.sessionId));
    }
  }, [dispatch, user.account_id, user.sessionId]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path={'/:movieId'} element={<Movie />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
