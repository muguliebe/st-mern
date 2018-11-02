import React, { useEffect } from 'react';
import useUser from "../hook/useUser";

const DashBoard = () => {
  const {user} = useUser();

  useEffect(() => {
    console.log('isAuth >' + user.isAuth);
    console.log('is in user. >' + user.isAuthenticated);
    console.log('and .. >' + user.email);
  });

  return (
    <div>
      <button>isLogged in: {user.isAuth.toString()} </button>
    </div>
  );
};

export default DashBoard;
