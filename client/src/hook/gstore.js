import { createStore } from 'react-hookstore';

export function init() {
  createStore({
      name: 'user',
      state: {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {
          name: '',
          email: '',
          password: '',
          password2: ''
        }
      }
    }
  );
  createStore({
    name: 'errors',
    state: {
      name: '',
      email: ''
    }
  })
}
