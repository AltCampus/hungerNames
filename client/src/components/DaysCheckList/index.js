import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DayList from '../DayList';
import './DaysCheckList.css';

class DaysCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    }
  }
  setCheck = () => {
    this.setState({ check: !this.state.check });
  }

  render() {
    const { attendance, onDay } = this.props;
    const { day, meal } = onDay;
    return (
      <>
        <Link to={`/${day}`} className="check-list">
          <div className="content__check-list">
            <span>
              <div className="check-mark" onClick={() => this.setCheck()}>
                <i className={`fas checklist-icon fa-3x ${this.state.check ? 'fa-check-circle' : 'fa-circle'}`}></i>
                {/* <i className={`fas fa-check-circle `}></i> */}
                {/* <i className="fas fa-circle"></i> */}
              </div>
            </span>
            <div className="day-mark">
              <p className="day-name">{day}</p>
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
              <div className="meal-arrow">
                <i className="fas checklist-icon fa-angle-right fa-3x"></i>
              </div>
            </div>
          </div>
          <div className="meal-arrow">
            <i className="fas checklist-icon fa-angle-right fa-3x"></i>
          </div>
        </Link>
      </>
    );
  }
}

export default DaysCheckList;