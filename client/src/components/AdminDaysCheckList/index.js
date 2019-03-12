import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import DayList from '../DayList';
import '../DaysCheckList/DaysCheckList.css';

class AdminDaysCheckList extends Component {
    constructor(props){
      super(props);
      this.state ={
        check : false,
      }
    }
    setCheck = () => {
      this.setState({ check: !this.state.check });
    }

  render() {
    const { day, meal } = this.props.onDay;
    return (
      <div className="check-list">
        <div className="content__check-list">
          <span>
            <div className="check-mark" onClick = {() => this.setCheck()}>
              <i className={`fas checklist-icon fa-3x ${this.state.check ? 'fa-check-circle' : 'fa-circle' }`}></i>
              {/* <i className={`fas fa-check-circle `}></i> */}
              {/* <i className="fas fa-circle"></i> */}
            </div>
          </span>
          <Link to={`/admin/menu/${ day }` } className="day-mark">
            <p className="day-name">{ day }</p>
            <div className="meal-types">
            {(day === 'sunday') ?
              ( 
                <div className="brunch">
                  <span className="meal">Brunch: </span>
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
            </div>
          </Link>
        </div>
        <Link to={`/admin/menu/${ day }`} className="meal-arrow">
          <i className="fas checklist-icon fa-angle-right fa-3x"></i>
        </Link>        
      </div>      
    );
  }
}

export default AdminDaysCheckList;