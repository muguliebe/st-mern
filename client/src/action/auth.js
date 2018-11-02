import axios from 'axios';

export const register = (inUser, props) => {
  axios.post('/api/users/register', inUser)
    .then(() => {
      props.history.push('/login')
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

