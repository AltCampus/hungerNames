import React, { Component } from 'react';
import { getStudentFeedback } from '../../store/actions';
import '../StudentSideMenu/StudentSideMenu.scss';
import AdminToggleOpen from './AdminToggleOpen';


class AdminSideMenu extends Component {
  state = {
    isToggle: false
  }

  handleToggleOpen = () => {
    this.setState({
      isToggle: true
    })
  }

  handleToggleClose = () => {
    this.setState({
      isToggle: false
    })
  }

  render() {
    const { isToggle } = this.state
    const { currentUser } = this.props;
    return (
      <div className="feedback-wrapper">
        <div className="toggle-controller">
          {
            isToggle ? <AdminToggleOpen handleToggleClose={ this.handleToggleClose } />
            :
            <div className="toggle-wrapper" onClick={ this.handleToggleOpen }>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default AdminSideMenu;