import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getStudentFeedback } from '../../store/actions';
import './StudentSideMenu.scss';
import ToggleOpen from './ToggleOpen';

class StudentSideMenu extends Component {
  state = {
    isToggle: false
  }
  // componentDidMount = () => {
  //   const { currentUser } = this.props;
  //   const currentUserId = currentUser._id;
  //   this.props.dispatch(getStudentFeedback(currentUserId, (success) => {
  //     if (success) {
  //       this.props.history.push(`/student/${currentUserId}`);
  //     }
  //   }))
  // }

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
            isToggle ? <ToggleOpen handleToggleClose={ this.handleToggleClose } />
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

const mapStateToProps = (state) => {
  return {
    userFeedback: state.userFeedback,
    currentUser: state.currentUser 
  }
}

export default connect(mapStateToProps)(StudentSideMenu);