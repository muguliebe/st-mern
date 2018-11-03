import React, { useEffect } from 'react';
import useUser from "../hook/useUser";

const DashBoard = () => {
  const {user} = useUser();

  useEffect(() => {
  }, [user.isAuth]);

  return (
    <div>
      <button>isLogged in: {user.isAuth.toString()} </button>
    </div>
  );
};

export default DashBoard;
