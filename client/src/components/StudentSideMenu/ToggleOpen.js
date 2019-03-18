import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ToggleOpen extends Component {

  render() {
    const { handleToggleClose, currentUser } = this.props;
    console.log(currentUser, 'inside toggle open');
    return (
      <div className="sidebar-open">
        <div className="toggle-close" onClick={ handleToggleClose } >
          <div className="right-toggle"></div>
          <div className="left-toggle"></div>
        </div>
        <div className="sidebar-content">
          <div className="user-info">
            <img src='https://static.productionready.io/images/smiley-cyrus.jpg' alt="user"/>
            <div className="user-detail">
              <h3>Mickey</h3>
              <p>mickey@gmail.com</p>
            </div>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="links" to={`/notification`}>Meal Attendees</Link>
            </div>
            <div className="feedback-link-wrapper">
              <Link className="links" to={`/student/${currentUser._id}/feedback`}>Send Feedback</Link>
            </div>
            <div className="feedback-link-wrapper">
              <Link className="links" to={`/student/feedback/`}>My Feedbacks</Link>
            </div>
            <div className="logout-link-wrapper">
              <Link className="links" to={`/student/:id/logout`}>Log out</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ToggleOpen)