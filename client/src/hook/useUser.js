import { useState, useEffect } from 'react';
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import axios from "axios";

function useUser() {
  const [user, dispatch] = useState({
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
  });

  useEffect(() => {
    console.log('useUser init');
    if (localStorage.token) {
      console.log('useUser token found');
      setAuthToken(localStorage.token);
      const decoded = jwtDecode(localStorage.token);
      console.log('useUser decoded:' + decoded);
      dispatch({...user, ...decoded, isAuth: true});
      console.log('useUser dispatch complete true');
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
          props.history.push('/dashboard');
        }
      })
      .catch(e => {
        console.log(`useUser] ${e}`);
        dispatch({...user, errors: e.response.data, isAuth: false});
      })
  };

  const register  = (props) => {
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


  return {user, dispatch, login, register}
}

export default useUser
