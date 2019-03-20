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
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="feedback-wrapper">
          {singleUserFeedback.length === 0 ? <div className="empty">No feedbacks made yet :/</div>
            : 
            singleUserFeedback && singleUserFeedback.map(feedback => (
              <div className="feedback-card" key={feedback._id}>
                <p className="feedback-date"><span>Date:</span> {feedback.date}</p>
                <p className="feedback-mealType"><span>Meal Type:</span> {feedback.mealType}</p>
                <p><span>Meal Item:</span> {feedback.meal}</p>
                <div><span>Review:</span><p>{feedback.review}</p></div>
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
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singleUserFeedback: state.singleUserFeedback
  }
}

export default connect(mapStateToProps)(StudentFeedbacks);