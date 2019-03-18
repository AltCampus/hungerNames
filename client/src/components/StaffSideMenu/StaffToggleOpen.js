import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StaffToggleOpen extends Component {

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
            <div className="user-detail">
              <h3>Amit</h3>
              <p>Amit@gmail.com</p>
            </div>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="links" to={`/staff/remark`}>Send Remark</Link>
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

export default StaffToggleOpen;