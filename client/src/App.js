import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as gstore from './gstore';
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


const App = () => {
  const {user, dispatch, login, logout} = useUser();
  useEffect(() => {
    gstore.init();
  }, []);

  return (
    <Router>
      <div className="App">
        <AuthContext.Provider value={{user, dispatch, login, logout}}>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={DashBoard} />
          </div>
          <Footer />
        </AuthContext.Provider>
      </div>
    </Router>
  );
}


export default App;
