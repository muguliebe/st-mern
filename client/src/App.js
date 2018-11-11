import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// context & hook
import AuthContext from './context/AuthContext';
import useUser from "./hook/useUser";
// components
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashBoard from "./components/DashBoard";
import PrivateRoute from './components/common/PrivateRoute';
import Posts from './components/posts/Posts';
import TaskAll from './components/tasks/TaskAll';

const App = () => {
  const {user, dispatch, login, logout} = useUser();

  return (
    <Router>
      <div className="App">
        <AuthContext.Provider value={{user, dispatch, login, logout}}>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
            <PrivateRoute exact path="/feed" component={Posts} />
            <Route exact path="/tasks" component={TaskAll} />
          </div>
          <Footer />
        </AuthContext.Provider>
      </div>
    </Router>
  );
};


export default App;
