import React from 'react';
import { useStore } from 'react-hookstore';
import * as api from '../../action/auth'
import classnames from "classnames";

export default function Login() {

  const [user, dispatch] = useStore('user');

  const handleChange = e => {
    dispatch({...user, [e.target.name]: e.target.value});
    console.log('user = ' + user);
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.login(user, dispatch);

    console.log(user)
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">or Sign in whatever..</p>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.email
                       })}
                       placeholder="Email Address"
                       name="email" onChange={handleChange} />
                {user.errors.email && (
                  <div className="invalid-feedback"> {user.errors.email} </div>
                )}
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password"
                       name="password" onChange={handleChange} />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
