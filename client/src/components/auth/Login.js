import React , {useEffect} from 'react';
import classnames from "classnames";
import useUser from '../../hook/useUser';

export default function Login(props) {
  const {user, dispatch, login} = useUser();

  useEffect(() => {
    if(user.isAuth){
      props.history.push('/dashboard');
    }
  }, [user.isAuth]);

  const handleChange = e => {
    dispatch({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    login(props);
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          {user.isAuth ? 'loggedIn' : 'no auth'}
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
