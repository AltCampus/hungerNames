import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllFeedback } from '../../store/actions/';
import { connect } from 'react-redux';
import MealCount from '../MealCount';
import './StaffHome.css';
import FeedbackListView from '../FeedbackListView';
import Feedbacks from '../Feedbacks'

class StaffHome extends Component {
  constructor(props) {
    super(props);
    this.meals = ['Breakfast', 'Lunch', 'Dinner'];
  }
  componentDidMount = () => {
    this.props.dispatch(getAllFeedback())
  }
  render() {
    const { feedbacks } = this.props;
    return(
      <div className="home">
        <section className="staff-hero">
          <p className="headline">Todays Turn Up</p>
          <span className="current_date">Date: <strong>15th March, 2018</strong></span>
          <div className="attendance-container">
          {this.meals.map((val) => {
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
        </section>        
        <section className="feedback-container">
          <Link to='/staff/feedbacks' className="feedback-btn" render={() => {<Feedbacks />}}>
            <span>Feedbacks</span>
            <span className="feedback-notification">5</span>
          </Link>          
        </section>
      </div>
    );
  }
}

export default connect()(StaffHome);