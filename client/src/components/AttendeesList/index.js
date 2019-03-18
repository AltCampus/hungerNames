import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MealCount from '../MealCount';

export default class AttendeesList extends Component {
  render() {
    return(
      <div className="attendance-container">
        {this.props.meals.map((val) => {
          return(
            <Link to={{
              pathname: `/staff/list/${val}`,
              state: {
                meal: val,
                count: 10
              }
            }} className="unlink">
              <MealCount meal={val} count={10} currentStatus={'final'}/>
            </Link>
          )}
        )}
      </div>
    )
  }

}