import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getStudentFeedback } from '../../store/actions';

class StudentFeedback extends Component {

  componentDidMount = () => {
    const { currentUser } = this.props;
    const currentUserId = currentUser._id;
    this.props.dispatch(getStudentFeedback(currentUserId, (success) => {
      if (success) {
        this.props.history.push(`/student/${currentUserId}`);
      }
    }))
  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    return (
      <div>
        Hello World!!
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