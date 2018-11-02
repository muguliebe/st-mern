import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";

export const register = (user, dispatch, props) => {
  axios.post('/api/users/register', user)
    .then(() => props.history.push('/login'))
    .catch(err => {
      console.log(err.response.data);
      dispatch({...user, errors: err.response.data});
    });
};

/**
 *
 * @param user     state of 'user' store
 * @param dispatch it must be 'user' store's dispatcher
 */
export const login = (user, dispatch) => {
  axios.post('/api/users/login', user)
    .then(res => {
      const {token} = res.data.token;
      localStorage.setItem('jwt', token);
      setAuthToken(token)
    })
    .catch(e => {
      dispatch({errors: e.response.data});
    })
};
