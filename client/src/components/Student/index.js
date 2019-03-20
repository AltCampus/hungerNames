import React, { Component } from 'react';
import {  Switch, Route } from 'react-router-dom';
import StudentHome from '../StudentHome';
import DayList from '../DayList';
import StudentFeedbackForm from '../StudentFeedbackForm';
import StudentFeedbacks from '../StudentFeedbacks';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.currentUser || {},
  }
}

class Student extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/student' component={StudentHome}  />
          <Route exact path='/student/:day' component={DayList}  />
          <Route exact path='/student/:id/feedback' component={StudentFeedbackForm}  />
          <Route exact path='/student/:id/myfeedback' component={StudentFeedbacks}  />
        </Switch>
      </>
    )
  }
}

export default Student;