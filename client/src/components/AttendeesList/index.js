import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import StudentSideMenu from '../StudentSideMenu';
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
    const { newDate } = this.state;
    this.props.dispatch(getAttendeesAction());
    const day = this.state.newDate.getDay();
    if (day === 0) {
      this.setState({
        meals: ['Brunch', 'Dinner'],
      });
    } else {
      this.setState({
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      });
    }
  }

  AttendeesLength = (val) => {
    const { AttendeesList } = this.props;
    switch (val) {
      case 'Breakfast':
        return (AttendeesList.breakfast) ? AttendeesList.breakfast : [];
      case 'Lunch':
        return (AttendeesList.lunch) ? AttendeesList.lunch : [];
      case 'Dinner':
        return (AttendeesList.dinner) ? AttendeesList.dinner : [];
      case 'Brunch':
        return (AttendeesList.brunch) ? AttendeesList.brunch : [];
      default:
        break;
    }
  }

  render() {
    return (
      <>
        {/* <StudentSideMenu /> */}
        <div className="back-btn-box">
          {/* <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div> */}
        </div>
        <section className="staff-hero">
          <p className="headline">Todays Turn Up</p>
          <span className="current_date">Date: <strong>{(new Date).toDateString()}</strong></span>
          <div className='staff-hero'>
            <div className="attendance-container">
              {this.state.meals.map((val) => {
                let arr = this.AttendeesLength(val);
                return (
                  <Link to={{
                    pathname: `${this.props.profile}/list/${val}`,
                    state: {
                      meal: val,
                      count: arr.length,
                      array: arr
                    }
                  }} className="unlink">
                    <MealCount meal={val} count={arr.length} currentStatus={'final'} key={val}/>
                  </Link>
                );
              }
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    AttendeesList: state.attendees || {},
  }
}

export default connect(mapStateToProps)(AttendeesList)
