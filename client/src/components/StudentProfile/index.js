import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getStudentProfile } from '../../store/actions';

class StudentProfile extends Component {

  componentDidMount = () => {
    this.props.dispatch(getStudentProfile())
  }

  render() {
    return (
      <div>
        Hello World!!
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userFeedback: state.userFeedback 
  }
}

export default connect(mapStateToProps)(StudentProfile);