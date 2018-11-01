import axios from 'axios';

export const register = (user) => {
  return axios.post('/api/users/register', user)
};

