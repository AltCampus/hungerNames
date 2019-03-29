import React, { Component } from 'react';
import { logoutUserAction } from '../../store/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminToggleOpen extends Component {
  handleLogout = () => {
    this.props.dispatch(logoutUserAction((logOutStatus) => {
      if (logOutStatus) this.props.history.push('/login');
    }));
  }

  render() {
    const { handleToggleClose, currentUser } = this.props;
    return (
      <div className="sidebar-open">
        <div className="toggle-close" onClick={handleToggleClose} >
          <div className="right-toggle"></div>
          <div className="left-toggle"></div>
        </div>
        <div className="sidebar-content">
          <div className="user-info">
            <img src='https://static.productionready.io/images/smiley-cyrus.jpg' alt="user" />
            <div className='user-detail'>
              <h3>{currentUser.name}</h3>
              <p>{currentUser.email}</p>
            </div>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="logout links" to={`/admin/invite`}>Invite Student</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="logout links" to={`/admin/menu`}>Edit Menu</Link>
            </div>
            <div className="menu-link-wrapper">
              <Link className="logout links" to={`/admin/getallstudentslist`}>Get all student list</Link>
            </div>
            <div className="menu-link-wrapper">
              <div className="logout links" onClick={this.handleLogout}>Log out</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser || {},
  }
}

export default connect(mapStateToProps)(AdminToggleOpen);