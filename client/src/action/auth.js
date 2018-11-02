import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from 'jwt-decode';

export const register = (user, dispatch, props) => {
  axios.post('/api/users/register', user)
    .then(() => props.history.push('/login'))
    .catch(err => {
      console.log(err.response.data);
      dispatch({...user, errors: err.response.data});
    });
};

export const login = (inUser, dispatch) => {
  axios.post('/api/users/login', inUser)
    .then(res => {
      const {token} = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch({...inUser, isAuthenticated: true, ...decoded});
    })
    .catch(e => {
      console.log(e);
      dispatch({...inUser, isAuthenticated: false});
    })
};
