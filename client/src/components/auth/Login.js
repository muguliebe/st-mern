import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import classnames from "classnames";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";

export default function Login(props) {
  const [user, dispatch] = useStore('user');
  useEffect(() => {
    dispatch({...user, errors: {}})
  }, []);

  const handleChange = e => {
    dispatch({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/users/login', user)
      .then(res => {
        const {token} = res.data;
        console.log(token);
        localStorage.setItem('token', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        console.log(decoded);
        dispatch({...user, ...decoded, isAuthenticated: true});

        props.history.push('/dashboard');
      })
      .catch(e => {
        console.log(e);
        if (e.response) {
          dispatch({...user, errors: e.response.data, isAuthenticated: false});
        }
      });
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
                       value={user.email} placeholder="Email Address"
                       name="email" onChange={handleChange} />
                {user.errors.email && (
                  <div className="invalid-feedback"> {user.errors.email} </div>
                )}
              </div>
              <div className="form-group">
                <input type="password"
                       className={classnames('form-control form-control-lg', {
                         'is-invalid': user.errors.password
                       })}
                       value={user.password} placeholder="Password"
                       name="password" onChange={handleChange} />
                {user.errors.password && (
                  <div className="invalid-feedback"> {user.errors.password} </div>
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
