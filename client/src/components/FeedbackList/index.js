import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './FeedbackList.css';
import FeedbackDetail from '../FeedbackDetail';

export default class FeedbackList extends Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Link to={{
          pathname: '/staff/feedbacks/feedbacklist/feedbackdetail',
          state: {
            feedbackData: data
          }
        }}

          className='user-feedback unlink' >
        
        <div>
          <p>student: {data.name}</p>
          <p>meal: {data.meal}</p>
          <p>mealType: {data.mealType}</p>
          <p>rating: {data.rating}</p>
        </div>
        
        </Link>        
      </>
    );
  }
}