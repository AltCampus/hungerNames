import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StaffToggleOpen extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {    
    this.props.dispatch(logoutUserAction());
    this.props.history.push('/login')
  }

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
            <img src='https://static.productionready.io/images/smiley-cyrus.jpg' alt="user"/>
            <div className="user-detail">
              <h3>{currentUser.name}</h3>
              <p>{currentUser.email}</p>
            </div>
          </div>
          <div className="link_wrapper">
            <div className="menu-link-wrapper">
              <Link className="links" to={`/staff/remark`}>Send Remark</Link>
            </div>
            <div className="logout-link-wrapper">
              <div className="links" onClick={this.handleLogout}>Log out</div>
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

export default connect(mapStateToProps)(StaffToggleOpen);