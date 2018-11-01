import React, { useState } from 'react';

export default function Login() {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
    console.log('user = ' + user);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user)
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">or Sign in whatever..</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address"
                       name="email" onChange={handleChange}/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password"
                       name="password" onChange={handleChange}/>
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
