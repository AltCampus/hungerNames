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
            <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-oPxmzDQdtF4%2FUSqzMDokh3I%2FAAAAAAAAD7k%2FSNzkXsnJg18%2Fs1600%2Fcute-cat.jpg&f=1" alt="user"/>
            <h3>Suraj</h3>
            <p>Suraj@gmail.com</p>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/invite`}>Invite Student</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/invite`}>Users List</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="links" to={`/admin/menu`}>Edit Menu</Link>
            </div>
            {/* <div className="feedback-link-wrapper">
              <Link className="links" to={`/student/:id/feedback`}>Feedback</Link>
            </div> */}
            <div className="logout-link-wrapper">
              <Link className="links" to={`/admin/getallstudentslist`}>Get all student list</Link>
            </div>
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