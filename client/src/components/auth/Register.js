import React, { useState } from 'react';
import classnames from 'classnames';
import { createStore, useStore } from 'react-hookstore';
import * as api from '../../action/auth';

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

createStore({name: 'errors'});
export default function Register(props) {

  const [user, setUser]     = useStore('user');

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    api.register(user)
      .then(() => props.history.push('/login'))
      .catch(err => {
        console.log(err.response.data);
        setUser({...user, errors: err.response.data});
      });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create account</p>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.name
                       })}
                       placeholder="Name"
                       name="name" value={user.name} onChange={handleChange} />
                {user.errors.name && (
                  <div className="invalid-feedback"> {user.errors.name} </div>
                )}
              </div>
              <div className="form-group">
                <input type="email"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.email
                       })}
                       placeholder="Email Address"
                       name="email" value={user.email} onChange={handleChange} />
                {user.errors.email && (
                  <div className="invalid-feedback"> {user.errors.email} </div>
                )}
                <small className="form-text text-muted">use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.password
                       })}
                       placeholder="Password"
                       name="password" value={user.password} onChange={handleChange} />
                {user.errors.password && (
                  <div className="invalid-feedback">{user.errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input type="password"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.password2
                       })}
                       placeholder="Confirm Password"
                       name="password2" value={user.password2} onChange={handleChange} />
                {user.errors.password2 && (
                  <div className="invalid-feedback">{user.errors.password2}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
