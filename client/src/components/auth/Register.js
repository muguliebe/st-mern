import React, { useState } from 'react';
import { createStore, useStore } from 'react-hookstore';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import * as api from '../../action/auth';

createStore({name: 'user', state: {}});
createStore({name: 'errors', state: {}});

function Register(props) {

  const [user, setUser]    = useStore('user');
  const [errors, setError] = useStore('errors');

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    api.register(user)
      .then(() => props.history.push('/login'))
      .catch(err => {
        console.log(err.response.data);
        setError(err.response.data);
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
                         'is-invalid': errors.name
                       })}
                       placeholder="Name"
                       name="name" value={user.name} onChange={handleChange} />
                {errors.name && (
                  <div className="invalid-feedback"> {errors.name} </div>
                )}
              </div>
              <div className="form-group">
                <input type="email"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': errors.email
                       })}
                       placeholder="Email Address"
                       name="email" value={user.email} onChange={handleChange} />
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email} </div>
                )}
                <small className="form-text text-muted">use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': errors.password
                       })}
                       placeholder="Password"
                       name="password" value={user.password} onChange={handleChange} />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input type="password"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': errors.password2
                       })}
                       placeholder="Confirm Password"
                       name="password2" value={user.password2} onChange={handleChange} />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
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

export default withRouter(Register)
