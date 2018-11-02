import { createStore } from 'react-hookstore';

export function init() {
  const templateUser = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };
  createStore({
      name: 'user',
      state: {...templateUser, isAuthenticated: false, errors: templateUser}
    }
  );
  createStore({
    name: 'errors',
    state: {templateUser}
  })
}
