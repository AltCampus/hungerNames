import React, { Component } from 'react';
import { connect } from 'react-redux';
import util from '../../util/index'
import './DayList.css';
import StudentSideMenu from '../StudentSideMenu';
import { object } from 'twilio/lib/base/serialize';
import { updateAttendenceAction, getAttendenceAction, getMenu } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {},
    attendance: state.userAttendance,
  };
}
class DayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      dayVal: 'day1',
      breakfast: false,
      lunch: false,
      dinner: false,
      brunch: false,
    }
  }

  componentDidMount() {

    const { menu, attendance } = this.props;
    const { day } = this.props.match.params;
    let dayVal = "";
    let dayIndex = -1;
    (menu && menu.day1) && Object.keys(menu).forEach((val, index) => {
      if (menu[val].day == day) { dayVal = val; dayIndex = index }
    })

    if (dayIndex != -1 && attendance.length) {
      this.setState({
        date: attendance[dayIndex].date,
        dayVal: dayVal,
        breakfast: attendance[dayIndex].breakfast,
        lunch: attendance[dayIndex].lunch,
        dinner: attendance[dayIndex].dinner,
        brunch: attendance[dayIndex].brunch,
      })
    }
  }

  handlechange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // let arrayAttendence
    let data = {
      date: this.state.date,
      attendance: [
        { mealType: "breakfast", value: this.state.breakfast },
        { mealType: "brunch", value: this.state.brunch },
        { mealType: "lunch", value: this.state.lunch },
        { mealType: "dinner", value: this.state.dinner },
      ]
    }
    this.props.dispatch(updateAttendenceAction(data, (val) => {
      if (val) this.props.history.goBack();
    }))
  }

  render() {
    const { day } = this.props.match.params;
    const { menu } = this.props;
    const { dayVal } = this.state;

    return (
      <>
        {/* <StudentSideMenu /> */}
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="check-list-page">
          {(menu && menu.day1 && dayVal) ? (
            <form onSubmit={this.handleSubmit} key={day} >
              <h2 className="day-name">{day}</h2>
              {(menu[dayVal].day !== 'Sunday') ? (
                <>
                  <label className="label-box" htmlFor="breakfast">
                    <input checked={this.state.breakfast} type="checkbox" onChange={(e) => this.handlechange(e)} id="breakfast" name="breakfast" />
                    <p className="meal">
                      Breakfast: {menu[dayVal].meal.breakfast.title}
                    </p>
                  </label>
                  <label className="label-box" htmlFor="lunch">
                    <input checked={this.state.lunch} type="checkbox" onChange={(e) => this.handlechange(e)} id="lunch" name="lunch" />
                    <p className="meal">
                      Lunch: {menu[dayVal].meal.lunch.title}
                    </p>
                  </label>
                </>)
                :
                (<>
                  <label className="label-box" htmlFor="brunch">
                    <input checked={this.state.brunch} type="checkbox" onChange={(e) => this.handlechange(e)} id="brunch" name="brunch" />
                    <p className="meal">
                      Brunch: {menu[dayVal].meal.brunch.title}
                    </p>
                  </label>
                </>)}
              <label className="label-box" htmlFor="dinner" >
                <input checked={this.state.dinner} type="checkbox" onChange={(e) => this.handlechange(e)} id="dinner" name="dinner" />
                <p className="meal">
                  Dinner: {menu[dayVal].meal.dinner.title}
                </p>
              </label>
              <button type="submit" className="form-btn send-btn">Save →</button>
            </form>) : ''
          }
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DayList);
