import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const DashBoard = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
  }, [user.isAuth]);

  return (
    <div>
      <button>isLogged in: {user.isAuth.toString()} </button>
    </div>
  );
};

export default DashBoard;
