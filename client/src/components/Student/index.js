import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../PrivateRoute';
import StudentHome from '../StudentHome';
import DayList from '../DayList';
import StudentFeedback from '../StudentFeedback';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

class Student extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.isAuthenticated);
    return (
      <>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path='/student' component={ StudentHome } auth={this.props.isAuthenticated}/>
            <PrivateRoute exact path='/student/:day' component={ DayList } auth={this.props.isAuthenticated}/>
            <PrivateRoute exact path='/student/:id/feedback' component={ StudentFeedback } auth={this.props.isAuthenticated}/>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default connect(mapStateToProps)(Student);