import { createStore } from 'react-hookstore';

export function init() {
  createStore({
      name: 'user',
      state: {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
      }
    }
  );
}
