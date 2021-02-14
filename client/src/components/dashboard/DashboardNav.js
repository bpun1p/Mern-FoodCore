import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthService from '../../service/AuthService';
import { AuthContext } from '../../context/AuthContext';

export default function DashboardNav() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
      history.push('/login');
    });
  };

  return (
    <nav className="dashboard__nav">
      <Link to="/dashboard/global">
        <button type="button" className="dashboard__home">GLOBAL</button>
      </Link>
      <Link to="/dashboard/my-posts">
        <button type="button" className="dashboard__my-posts">MY POSTS</button>
      </Link>
      <Link to="/dashboard/create">
        <button type="button" className="dashboard__create">CREATE</button>
      </Link>
      {isAuthenticated
        ? <button type="button" className="dashboard__log-out" onClick={logoutHandler}>LOGOUT</button>
        : null}
    </nav>
  );
}
