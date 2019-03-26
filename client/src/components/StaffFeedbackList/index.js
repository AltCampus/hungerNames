import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FeedbackList.css';
import '../StudentFeedbacks/StudentFeedbacks.scss';
import StarRatings from "react-star-ratings";


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
        }} className='user-feedback unlink' >        
          <div className="feedback-card">
            <p className="feedback-mealtype">{data.mealType}</p>
            <p><span>Student:</span> {data.name}</p>
            <p><span>Meal Item:</span> {data.meal}</p>
            <div>
              <span>Rated:  </span> 
              <StarRatings
                starDimension="30px"
                starSpacing="10px"
                starRatedColor="yellow"
                numberOfStars={data.rating}
                name="rating"
              />
            </div>
          </div>        
        </Link>        
      </>
    );
  }
}