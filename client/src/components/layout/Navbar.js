import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {

  const {user, logout} = useContext(AuthContext);

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const guestLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href='/' className="nav-link" onClick={handleLogout}>
          <img className="rounded-circle mr-2"
               src={user.avatar} alt={user.name}
               style={{width: '25px', marginRight: '5px'}}
               title="gravatar connect to your email"
          />
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">What the</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/feed"> Feeds
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks"> task
              </Link>
            </li>
          </ul>

          <Link className="" to="#">{user.isAuth ? user.name : ''}</Link>
          {user.isAuth ? authLink : guestLink}

        </div>
      </div>
    </nav>
  )
}
export default Navbar
