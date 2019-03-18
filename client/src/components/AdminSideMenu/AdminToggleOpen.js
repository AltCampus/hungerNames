import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminToggleOpen extends Component {

  render() {
    const { handleToggleClose } = this.props;
    return (
      <div className="sidebar-open">
        <div className="toggle-close" onClick={ handleToggleClose } >
          <div className="right-toggle"></div>
          <div className="left-toggle"></div>
        </div>
        <div className="sidebar-content">
          <div className="user-info">
            <img src='https://static.productionready.io/images/smiley-cyrus.jpg' alt="user"/>
            <div className='user-detail'>
              <h3>Suraj</h3>
              <p>Suraj@gmail.com</p>
            </div>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/invite`}>Invite Student</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/users`}>Users List</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/menu`}>Edit Menu</Link>
            </div>
            {/* <div className="feedback-link-wrapper">
              <Link className="links" to={`/student/:id/feedback`}>Feedback</Link>
            </div> */}
            <div className="logout-link-wrapper">
              <Link className="links" to={`/admin/logout`}>Log out</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminToggleOpen;