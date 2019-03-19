import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../PrivateRoute';
import StudentHome from '../StudentHome';
import DayList from '../DayList';
import StudentFeedbackForm from '../StudentFeedbackForm';
import StudentFeedbacks from '../StudentFeedbacks';

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
    return (
      <>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path='/student' component={ StudentHome } auth={this.props.isAuthenticated}/>
            <PrivateRoute exact path='/student/:day' component={ DayList } auth={this.props.isAuthenticated}/>
            <PrivateRoute exact path='/student/:id/feedback' component={ StudentFeedbackForm } auth={this.props.isAuthenticated}/>
            <PrivateRoute exact path='/student/:id/myfeedback' component={ StudentFeedbacks } auth={ this.props.isAuthenticated } />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default connect(mapStateToProps)(Student);