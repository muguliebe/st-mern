import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';

export default function Register() {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  });

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleSubmit = async e => {
    e.preventDefault();

    axios.post('/api/users/register', user)
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.log(e.response.data);
        setUser({...user, errors: e.response.data});
      });

  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create account</p>
            <form onSubmit={handleSubmit}>
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
