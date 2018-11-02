import axios from 'axios';

export const register = (user) => {
  return axios.post('/api/users/register', user)
};

export const login = (user) => {
  return axios.post('/api/users/login', user)
};
