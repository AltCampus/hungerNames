import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { util } from "../../util";
import MealCount from '../MealCount';
import { getAttendeesAction } from '../../store/actions';

class AttendeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: new Date,
      meals: []
    }
  }
  componentDidMount = () => {
    this.props.dispatch(getAttendeesAction());
    const day = newDate.getDay();
  }

  AttendeesLength = (val) => {
    const { AttendeesList } = this.props;
    switch (val) {
      case 'Breakfast':
        return (AttendeesList.breakfast) ? AttendeesList.breakfast : 0;
      case 'Lunch':
        return (AttendeesList.lunch) ? AttendeesList.lunch : 0;
      case 'Dinner':
        return (AttendeesList.dinner) ? AttendeesList.dinner : 0;
      case 'Brunch':
        return (AttendeesList.brunch) ? AttendeesList.brunch : 0;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="attendance-container">
        {this.props.meals.map((val) => {
          let len = this.AttendeesLength(val).length;
          return (
            <Link to={{
              pathname: `/staff/list/${val}`,
              state: {
                meal: val,
                count: len
              }
            }} className="unlink">
              <MealCount meal={val} count={len} currentStatus={'final'} />
            </Link>
          )
        }
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    AttendeesList: state.attendees || {},
  }
}




export default connect(mapStateToProps)(AttendeesList)