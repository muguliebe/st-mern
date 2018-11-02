import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as gstore from './gstore';
import './App.css';
// components
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashBoard from "./components/DashBoard";

const App = () => {
  useEffect(() => {
    gstore.init();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
