import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getStudentFeedback } from '../../store/actions';
import './StudentFeedback.scss';
import ToggleOpen from './ToggleOpen';

class StudentFeedback extends Component {
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
    console.log('close it')
    this.setState({
      isToggle: false
    })
  }

  render() {
    const { isToggle } = this.state
    const { currentUser } = this.props;
    return (
      <div className="feedback-wrapper">
        <div>
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

export default connect(mapStateToProps)(StudentFeedback);