import React, { Component } from "react";
import { connect } from "react-redux";
import "./StudentFeedback.scss";
import StarRatings from "react-star-ratings";
import "../DayList/DayList.css";
import { postStudentFeedback } from "../../store/actions";
import Loaders from "../Loader/index";

class StudentFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      mealType: "",
      date: "",
      newDate: new Date(),
      review: "",
      meal: "",
      isLoading: false
    };
  }

  handleRating = e => {
    this.setState({
      rating: e
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { meal, mealType, review, rating, date } = this.state;
    // if (!meal && mealType && review && rating && date) {
    //   alert('please fill all content before submiting')
    //   return;
    // }
    const data = { meal, mealType, review, rating, date };
    this.props.dispatch(
      postStudentFeedback(data, cb => {
        if (!cb) {
          this.setState({
            isLoading: true
          });
        }
      })
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        {isLoading ? <Loaders /> : ""}
        <div className="studentFeedback-wrapper">
          <form className="mealtype-wrapper" onSubmit={this.handleSubmit}>
            <div className="calender-wrapper">
              <input
                value={this.state.date}
                type="date"
                name="date"
                id=""
                onChange={this.handleChange}
                min={preTwoDate(this.state.newDate)}
                max={date(this.state.newDate)}
              />
            </div>
            <select name="mealType" id="" onChange={this.handleChange}>
              <option name="select" value={this.state.mealType}>
                select
              </option>
              <option name="brunch" value="brunch">
                Brunch
              </option>
              <option name="breakfast" value="breakfast">
                Breakfast
              </option>
              <option name="lunch" value="lunch">
                Lunch
              </option>
              <option name="dinner" value="dinner">
                Dinner
              </option>
            </select>
            <div className="review-wrapper">
              <input
                type="text"
                name="meal"
                id=""
                value={this.state.meal}
                onChange={this.handleChange}
                placeholder=" Meal "
              />
            </div>
            <StarRatings
              starDimension="30px"
              starSpacing="10px"
              rating={this.state.rating}
              starRatedColor="yellow"
              changeRating={e => this.handleRating(e)}
              numberOfStars={5}
              name="rating"
            />
            <div className="review-wrapper">
              <input
                type="text"
                name="review"
                id=""
                value={this.state.review}
                onChange={this.handleChange}
                placeholder="write review here..."
              />
            </div>
            <div className="submit-wrapper">
              <button name="submit" value="submit">
                Submit
                <i />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

function date(today) {
  today = today.toISOString().split("T")[0];
  return today;
}

function preTwoDate(preDate) {
  var dd = preDate.getDate() - 2;
  var mm = preDate.getMonth() + 1;
  var yy = preDate.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  preDate = `${yy}-${mm}-${dd}`;
  return new Date(preDate);
}

export default connect()(StudentFeedback);
