import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Admin from './Admin';
import Student from './Student';
import Staff from './Staff';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
  return (    
      <BrowserRouter>
        <>
          <div className="logo-box">
            <Link to="/" className="logo wrapper">Hogger<span className="sub-logo"></span></Link>
          </div>          
          <Switch>
            <Route path='/register' component={ Register } />
            <Route path='/login' component={ Login } />
            <Route path='/admin' component={ Admin } />
            <Route path='/student' component={ Student } />
            <Route path='/staff' component={ Staff } />
            {/* checking staff and admin side menu for tesing purpose */}
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default Main;
