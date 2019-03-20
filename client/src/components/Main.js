import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';
import Admin from './Admin';
import Student from './Student';
import PrivateRoute from './PrivateRoute';
import Staff from './Staff';
import './Main.css';
import Dashboard from './Dashboard';

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
            <Route exact path='/' component={Dashboard} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/admin' auth={this.props.user.isAdmin} component={Admin} />
            <PrivateRoute path='/student' auth={this.props.user.isStudent} component={Student} />
            <PrivateRoute path='/staff' auth={this.props.user.isKitchenStaff} component={Staff} />            
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {    
    user: state.currentUser || {},
  }
}

export default connect(mapStateToProps)(Main);
