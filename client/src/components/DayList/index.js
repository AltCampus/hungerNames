import React, { Component } from 'react';
import { connect } from 'react-redux';
import { util } from '../../util/index'
import './DayList.css';
import StudentSideMenu from '../StudentSideMenu';
import MealRemark from '../MealRemark';
import { object } from 'twilio/lib/base/serialize';
import { updateAttendenceAction } from '../../store/actions';

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
      newDate: new Date,
      date: '',
      dayVal: '',
      breakfast: false,
      lunch: false,
      dinner: false,
      brunch: false,
      lunchTime: false,
      brunchTime: false,
      breakfastTime: false,
      dinnerTime: false,
      breakfastRemark: '',
      lunchRemark: '',
      dinnerRemark: '',
      brunchRemark: '',
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
        breakfast: attendance[dayIndex].breakfast[0],
        lunch: attendance[dayIndex].lunch[0],
        dinner: attendance[dayIndex].dinner[0],
        brunch: attendance[dayIndex].brunch[0],
        breakfastRemark: attendance[dayIndex].breakfast[1],
        lunchRemark: attendance[dayIndex].lunch[1],
        dinnerRemark: attendance[dayIndex].dinner[1],
        brunchRemark: attendance[dayIndex].brunch[1],
      })
    }


    let currentDate = util.convDateToDateStr(this.state.newDate);
    if (currentDate == attendance[dayIndex].date) {

      let currentTime = this.state.newDate.toLocaleTimeString();
      if (day === 'Sunday') {
        switch (true) {
          case (currentTime > (menu[dayVal].meal.dinner.time)):
            this.setState({
              brunchTime: true,
              dinnerTime: true,
            });
            break;
          case (currentTime > (menu[dayVal].meal.brunch.time)):
            this.setState({
              brunchTime: true,
            });
            break;
        }
      } else {
        switch (true) {
          case (currentTime > (menu[dayVal].meal.dinner.time)):
            this.setState({
              breakfastTime: true,
              lunchTime: true,
              dinnerTime: true,
            });
            break;
          case (currentTime > (menu[dayVal].meal.lunch.time)):
            this.setState({
              breakfastTime: true,
              lunchTime: true,
            });
            break;
          case (currentTime > (menu[dayVal].meal.breakfast.time)):
            this.setState({
              breakfastTime: true,
            });
            break;


        }
      }
    } else if (currentDate > attendance[dayIndex].date) {
      console.log(currentDate, attendance[dayIndex].date, 'inside greater than');

      if (day === 'Sunday') {
        this.setState({
          brunchTime: true,
          dinnerTime: true,
        });
      } else {
        this.setState({
          breakfastTime: true,
          lunchTime: true,
          dinnerTime: true,
        });
      }
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
    const { breakfastTime, brunchTime, lunchTime, dinnerTime } = this.state;    
    const { day } = this.props.match.params;
    const { menu } = this.props;
    const { dayVal } = this.state;

    return (
      <>
        <StudentSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="check-list-page">
          {(menu && menu.day1 && dayVal) ? (
            <form onSubmit={this.handleSubmit} key={day} >
              <h2 className='day-name'>{day} <span className='date'>{this.props.location.state.date}</span></h2>              
              {(menu[dayVal].day !== 'Sunday') ? (
                <>
                  <label className="check-box" htmlFor="breakfast">
                    <input checked={this.state.breakfast} type="checkbox" onChange={(e) => this.handlechange(e)} id="breakfast" name="breakfast" disabled={breakfastTime} />
                    <p className={`meal`}>
                      <span className='meal_type'>Breakfast</span>: <span className={`${breakfastTime ? 'disabled' : ''}`}>{menu[dayVal].meal.breakfast.title}</span>
                    </p>
                  </label>
                  <label className="check-box" htmlFor="lunch">
                    <input checked={this.state.lunch} type="checkbox" onChange={(e) => this.handlechange(e)} id="lunch" name="lunch" disabled={lunchTime} />
                    <p className={`meal`}>
                      <span className='meal_type'>Lunch</span>: <span className={`${lunchTime ? 'disabled' : ''}`}>{menu[dayVal].meal.lunch.title}</span>
                    </p>
                  </label>
                </>)
                :
                (<>
                  <label className="check-box" htmlFor="brunch">
                    <input checked={this.state.brunch} type="checkbox" onChange={(e) => this.handlechange(e)} id="brunch" name="brunch" disabled={brunchTime} />
                    <p className={`meal`}>
                      <span className='meal_type'>Brunch</span>: <span className={`${brunchTime ? 'disabled' : ''}`}>{menu[dayVal].meal.brunch.title}</span>
                    </p>
                  </label>
                </>)}
              <label className="check-box" htmlFor="dinner" >
                <input checked={this.state.dinner} type="checkbox" onChange={(e) => this.handlechange(e)} id="dinner" name="dinner" disabled={dinnerTime} />
                <p className={`meal`}>
                <span className='meal_type'>Dinner</span>: <span className={`${dinnerTime ? 'disabled' : ''}`}>{menu[dayVal].meal.dinner.title}</span>
                </p>
              </label>
              <button type="submit" className="form-btn send-btn">Save →</button>
            </form>) : ''
          }
          <div>
            {(this.state.breakfastRemark) ? <MealRemark remark={this.state.breakfastRemark} mealType='Breakfast' /> : ''}
            {(this.state.lunchRemark) ? <MealRemark remark={this.state.lunchRemark} mealType='Lunch'/> : ''}
            {(this.state.dinnerRemark) ? <MealRemark remark={this.state.dinnerRemark} mealType='Dinner'/> : ''}
            {(this.state.brunchRemark) ? <MealRemark remark={this.state.brunchRemark} mealType='Brunch'/> : ''}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DayList);
