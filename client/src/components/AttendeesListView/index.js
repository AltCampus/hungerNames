import React, { Component } from 'react';
import StudentSideMenu from '../StudentSideMenu';
import AttendeesList from '../AttendeesList';


export default class AttendeesListView extends Component {
  render() {
    return (
      <>
        <StudentSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <AttendeesList profile={'student'} />
      </>
    )
  }
}

