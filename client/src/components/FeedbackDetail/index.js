import React, { Component } from 'react';
import './FeedbackDetail.css'

export default class FeedbackDetail extends Component {
  render() {
    console.log(this.props.location.state);
    const { feedbackData } = this.props.location.state;
    console.log(feedbackData, 'in detail');
    return (
      <div className='feedback-detail'>
        <p>Item: {feedbackData.meal}</p>
        <p>{feedbackData.date}</p>
        <p>Mealtype: {feedbackData.mealType}</p>
        <p>Feedback by  {feedbackData.name}</p>
        <p>Rated: {feedbackData.rating}</p>
        <div className="review">
          <span>Review: </span><p>{feedbackData.review}</p>
        </div>
      </div>
    )
  }
}