import React, { Component } from 'react';
import { util } from "../../util";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './DaysCheckList.css';
import { updateAttendenceAction } from '../../store/actions';

class DaysCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      date: '',
      isDisabled: false,

    }
  }
  componentDidMount = () => {
    const { attendance } = this.props;
    let disabled = (util.convDateToDateStr(new Date()) >= attendance.date)
    this.setState({
      date: date,
      isDisabled: disabled
    })
  }

  setCheck = () => {
    if (!this.state.check) {
      let data = {
        date: this.state.date,
        attendance: [
          { mealType: "breakfast", value: true },
          { mealType: "brunch", value: true },
          { mealType: "lunch", value: true },
          { mealType: "dinner", value: true },
        ]
      }
      this.props.dispatch(updateAttendenceAction(data, () => { }))
    }
    else {
      let data = {
        date: this.state.date,
        attendance: [
          { mealType: "breakfast", value: false },
          { mealType: "brunch", value: false },
          { mealType: "lunch", value: false },
          { mealType: "dinner", value: false },
        ]
      }
      this.props.dispatch(updateAttendenceAction(data, () => { }))
    }
  }

  checkThree = () => {
    const { attendance, onDay } = this.props;
    if (onDay.day === 'Sunday') {
      if (attendance) {
        if (attendance.dinner[0] && attendance.brunch[0]) {
          if (!this.state.check) this.setState({ check: true });
        } else {
          if (this.state.check) this.setState({ check: false });
        }
      }
    } else if (onDay.day !== 'Sunday') {
      if (attendance) {
        if (attendance.dinner[0] && attendance.lunch[0] && attendance.dinner[0]) {
          if (!this.state.check) this.setState({ check: true });
        }
        else {
          if (this.state.check) this.setState({ check: false });
          console.log("not all true");
        }
      }
    }
  }


  render() {
    this.checkThree();
    const { day, meal } = this.props.onDay;
    return (
      <>
        <div className="check-list">
          <div className="content__check-list">
            <span>
              <div className="check-mark" onClick={() => { (this.state.isDisabled) ? null : this.setCheck() }}>
                <i className={`fas ${this.state.isDisabled ? 'red' : ''} checklist-icon fa-3x ${this.state.check ? 'fa-check-circle' : 'fa-circle'}`}></i>
              </div>
            </span>

            <Link to={`/student/${day}`} className="day-mark unlink content-justify">
              <div >
                <p className='day-name'>{day}</p>
                <div className="meal-types">
                  {(day === 'Sunday') ?
                    (
                      <div className="brunch">
                        <span className="meal">Brunch: </span>
                        <span>{meal.brunch ? meal.brunch.title : ''}</span>
                      </div>
                    ) :
                    (<>
                      <div className="breakfast">
                        <span className="meal">Breakfast: </span>
                        <span>{meal.breakfast ? meal.breakfast.title : ''} </span>
                      </div>
                      <div className="lunch">
                        <span className="meal">Lunch: </span>
                        <span>{meal.lunch ? meal.lunch.title : ''}</span>
                      </div>
                    </>
                    )}
                  <div className="dinner">
                    <span className="meal">Dinner: </span>
                    <span>{meal.dinner ? meal.dinner.title : ''}</span>
                  </div>
                </div>
              </div>
              <div className="meal-arrow">
                <i className="fas checklist-icon fa-angle-right fa-3x"></i>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default connect()(DaysCheckList);