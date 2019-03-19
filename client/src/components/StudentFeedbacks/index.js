import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleStudentFeedback } from '../../store/actions';
import './StudentFeedbacks.scss';
import StarRatings from "react-star-ratings";

class StudentFeedbacks extends Component {

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.dispatch(getSingleStudentFeedback(id))
  }

  render() {
    const { singleUserFeedback } = this.props;
    return (
      <div className="feedback-wrapper">
        {
          singleUserFeedback.length === 0 ? <div className="empty">No feedback found :)</div>
          : 
          singleUserFeedback && singleUserFeedback.map(feedback => (
            <div className="feedback-card" key={feedback._id}>
              <p className="feedback-date">Date: {feedback.date}</p>
              <p className="feedback-mealType">Meal Type: {feedback.mealType}</p>
              <p className="feedback-meal">Meal: {feedback.meal}</p>
              <p className="feedback-review">Review: {feedback.review}</p>
              <StarRatings
              starDimension="30px"
              starSpacing="10px"
              starRatedColor="yellow"
              numberOfStars={feedback.rating}
              name="rating"
            />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singleUserFeedback: state.singleUserFeedback
  }
}

export default connect(mapStateToProps)(StudentFeedbacks);