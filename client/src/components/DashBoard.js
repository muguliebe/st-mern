/* eslint-disable no-unused-vars*/
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './common/Spinner';

// context
import AuthContext from '../context/AuthContext';

const DashBoard = () => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState({
    handle: '',
    name: ''
  });

  useEffect(() => {
    // if (user.isAuth) {
    //   axios.get('/api/profile')
    //     .then(res => {
    //       setProfile(res.data);
    //     })
    //     .catch(e => {
    //       console.error(e.response.data);
    //     });
    // }
  }, [user.isAuth]);

  const handleDeleteAccount = (e) => {

  };

  const contentsNoProfile = (
    <div>
      <p className="lead text-muted">Welcome {user.name}</p>
      <p>you have no profile</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">
        Create Profile
      </Link>
      <Link to="/feed" className="btn btn-lg btn-info ml-2">
        go to feed
      </Link>
    </div>
  );

  const contentsDashboard = (
    <div>
      <p className="lead text-muted">
        Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
      </p>
      <div style={{marginBottom: '60px'}} />
      <button
        onClick={handleDeleteAccount}
        className="btn btn-danger"
      >
        Delete My Account
      </button>
    </div>
  );

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="md-12">
          <div className="display-4">DashBoard</div>
          {!user.isAuth ? <Spinner /> :
            !profile.handle ?
              contentsNoProfile
              :
              contentsDashboard
          }
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
