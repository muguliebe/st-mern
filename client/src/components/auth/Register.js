import React, { useState } from 'react';

export default function Register() {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user)
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
                <input type="text" className="form-control form-control-lg" placeholder="Name"
                       name="name" value={user.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address"
                       name="email" value={user.email} onChange={handleChange} />
                <small className="form-text text-muted">use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password"
                       name="password" value={user.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password"
                       name="password2" value={user.password2} onChange={handleChange} />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
