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
<<<<<<< HEAD
        <div className="check-list">
=======
        <Link to={`/${day}`} className="check-list">
>>>>>>> 54df5257a637c4a3dc09351221f2a256e59ee459
          <div className="content__check-list">
            <span>
              <div className="check-mark" onClick={() => this.setCheck()}>
                <i className={`fas checklist-icon fa-3x ${this.state.check ? 'fa-check-circle' : 'fa-circle'}`}></i>
                {/* <i className={`fas fa-check-circle `}></i> */}
                {/* <i className="fas fa-circle"></i> */}
              </div>
            </span>
<<<<<<< HEAD
            <Link to={`/${day}`} className="day-mark unlink content-justify">
              <div >
                <p className="day-name">{ day }</p>
                <div className="meal-types">
=======
            <div className="day-mark">
              <p className="day-name">{day}</p>
              <div className="meal-types">
>>>>>>> 54df5257a637c4a3dc09351221f2a256e59ee459
                {(day === 'Sunday') ?
                  (
                    <div className="brunch">
                      <span className="meal">Brunch: </span>
<<<<<<< HEAD
                      <span>{ meal.brunch ?  meal.brunch.title : '' }</span>
                    </div>
                  ) :
                  ( <>
                    <div className="breakfast">
                      <span className="meal">Breakfast: </span>
                      <span>{ meal.breakfast ?  meal.breakfast.title : '' } </span>
                    </div>
                    <div className="lunch">
                      <span className="meal">Lunch: </span>
                      <span>{ meal.lunch ?  meal.lunch.title : '' }</span>
                    </div>
                  </>
                )}
                  <div className="dinner">
                    <span className="meal">Dinner: </span>
                    <span>{ meal.dinner ?  meal.dinner.title : '' }</span>
                  </div>                          
=======
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
>>>>>>> 54df5257a637c4a3dc09351221f2a256e59ee459
                </div>
              </div>
              <div className="meal-arrow">
                <i className="fas checklist-icon fa-angle-right fa-3x"></i>
              </div>
            </Link>
          </div>
<<<<<<< HEAD
        </div>
=======
          <div className="meal-arrow">
            <i className="fas checklist-icon fa-angle-right fa-3x"></i>
          </div>
        </Link>
>>>>>>> 54df5257a637c4a3dc09351221f2a256e59ee459
      </>
    );
  }
}

export default DaysCheckList;