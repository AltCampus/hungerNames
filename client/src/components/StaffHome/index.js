import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MealCount from '../MealCount';
import './StaffHome.css'

class StaffHome extends Component {
  render() {
    return(
      <div className="home">
        <section className="staff-hero">
          <p className="headline">Todays Turn Up</p>
          <span className="current_date">Date: <strong>14th March, 2018</strong></span>
          <div className="attendance-container">
            <MealCount meal={'Breakfast'} count={10} currentStatus={'final'}/>
            <MealCount meal={'Lunch'} count={8} currentStatus={'final'}/>
            <MealCount meal={'Dinner'} count={12} currentStatus={'active'}/>
          </div>
        </section>        
        <section className="feedback-container">
          <Link to="/staff/feedbacks" className="feedback-btn">
            <span>Feedbacks</span>
            <span className="feedback-notification">5</span>
          </Link>          
        </section>
      </div>
    );
  }
}

export default StaffHome;