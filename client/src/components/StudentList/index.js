import React, { Component } from 'react';
import { connect } from "react-redux";
import './StudentList.css';
import '../StudentFeedbackForm/StudentFeedbackForm.scss';


class StudentList extends Component {
  constructor(props) {
    super(props);
  }
  Attendees = () => {
    const { AttendeesList } = this.props;
    switch (this.props.match.params.meal) {
      case 'Breakfast':
        return (AttendeesList.breakfast) ? AttendeesList.breakfast : [];
      case 'Lunch':
        return (AttendeesList.lunch) ? AttendeesList.lunch : [];
      case 'Dinner':
        return (AttendeesList.dinner) ? AttendeesList.dinner : [];
      case 'Brunch':
        return (AttendeesList.brunch) ? AttendeesList.brunch : [];
      default:
        return null
    }
  }

  render() {
    const list = this.Attendees();

    return (
      <>      
        {list && list.map((names, index) => {
          return (
            <div>
              <div className='feedback-date'>
                <span>{index + 1}</span><span>{names}</span>
              </div>
            </div>
          )
        })}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AttendeesList: state.attendees || {},
  }
}

export default connect(mapStateToProps)(StudentList)

