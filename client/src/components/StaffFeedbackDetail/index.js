import React, { Component } from 'react';
import StarRatings from "react-star-ratings";
import '../StudentFeedbacks/StudentFeedbacks.scss';
import './FeedbackDetail.css'

class FeedbackDetail extends Component {
  render() {
    const { feedbackData } = this.props.location.state;
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="feedback-card center">
          <p className="feedback-date"><span>Date:</span> {feedbackData.date}</p>
          <p className="feedback-mealType" className="feedback-mealtype"> {feedbackData.mealType}</p>
          <p><span>Meal Item:</span> {feedbackData.meal}</p>
          <div><span>Rated:  </span>
            <StarRatings
              starDimension="30px"
              starSpacing="10px"
              starRatedColor="yellow"
              numberOfStars={feedbackData.rating}
              name="rating"
            />
          </div>
          <div><span>Review:</span><p>{feedbackData.review}</p></div>
        </div>
      </>
    );
  }
}

export default FeedbackDetail;