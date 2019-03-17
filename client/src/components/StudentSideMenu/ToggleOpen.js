import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ToggleOpen extends Component {

  render() {
    const { handleToggleClose, currentUser } = this.props;
    return (
      <div className="sidebar-open">
        <div className="toggle-close" onClick={ handleToggleClose } >
          <div className="right-toggle"></div>
          <div className="left-toggle"></div>
        </div>
        <div className="sidebar-content">
          <div className="user-info">
            <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-oPxmzDQdtF4%2FUSqzMDokh3I%2FAAAAAAAAD7k%2FSNzkXsnJg18%2Fs1600%2Fcute-cat.jpg&f=1" alt="user"/>
            <h3>Mickey</h3>
            <p>mickey@gmail.com</p>
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