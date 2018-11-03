import { useState, useEffect } from 'react';
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import axios from "axios";

function useUser() {
  const initial = {
    name: '',
    email: '',
    password: '',
    password2: '',
    isAuth: false,
    errors: {
      name: '',
      email: '',
      password: '',
      password2: '',
    }
  };

  const [user, dispatch] = useState(initial);

  useEffect(() => {
    console.log('useUser init');
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decoded = jwtDecode(localStorage.token);
      dispatch({...user, ...decoded, isAuth: true});

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(initial);
        window.location.href = '/'; // TODO | have to test
      }

    }
  }, []);

  const setErrors = (errors) => dispatch({...user, errros: errors});  // TODO | validate required
  const login     = (props) => {
    axios.post('/api/users/login', user)
      .then(res => {
        const {token} = res.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
        if (token !== undefined) {
          const decoded = jwtDecode(token);
          dispatch({...user, isAuth: true, ...decoded});
          props.history.push('/dashboard'); // FIXME | don't refresh navbar after this
        }
      })
      .catch(e => {
        console.log(`useUser] ${e}`);
        dispatch({...user, errors: e.response.data, isAuth: false});
      })
  };

  const register = (props) => {
    axios.post('/api/users/register', user)
      .then(() => {
        dispatch({...user, password: '', password2: '', name: user.name});
        props.history.push('/login');
      })
      .catch(e => {
        console.log(`useUser] ${e}`);
        dispatch({...user, errors: e.response.data});
      })
  };

  const logout = (props) => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(initial);
  };


  return {user, dispatch, register, login, logout}
}

export default useUser
