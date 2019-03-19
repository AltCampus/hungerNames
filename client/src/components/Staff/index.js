import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import StaffSideMenu from '../StaffSideMenu';
import StaffHome from '../StaffHome';
import StaffRemarkForm from '../StaffRemarkForm';
import StudentList from '../StudentList';
import FeedbackDetail from '../FeedbackDetail';
import StaffFeedbacks from '../StaffFeedbacks';
import PrivateRoute from '../PrivateRoute';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

class Staff extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/staff' component={ StaffHome } />
            <Route exact path='/staff/sidemenu' component={ StaffSideMenu } />
            <Route exact path='/staff/feedbacks' component={ StaffFeedbacks } />
            <Route exact path='/staff/remark' component={ StaffRemarkForm } />
            <Route exact path='/staff/list/:meal' component={ StudentList } />
            <Route exact path='/staff/feedbacks/feedbacklist/feedbackdetail' component={ FeedbackDetail } />            
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default connect()(Staff);