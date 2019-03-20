import React, { Component } from "react";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import { postStudentFeedback } from "../../store/actions";
import Loader from "../Loader";
import StudentSideMenu from "../StudentSideMenu";
import "../DayList/DayList.css";
import "./StudentFeedbackForm.scss";

class StudentFeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      mealType: "",
      date: "",
      newDate: new Date(),
      review: "",
      meal: "",
      isLoading: false,
      message: ''
    };
  }

  handleRating = e => {
    this.setState({
      rating: e
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      message: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { meal, mealType, review, rating, date } = this.state;
    // if (!meal && mealType && review && rating && date) {
    //   alert('please fill all content before submiting')
    //   return;
    // }
    const id = this.props.match.params.id;
    const data = { meal, mealType, review, rating, date };
    
    this.props.dispatch(
      postStudentFeedback(data,id, (cb) => {
        if (cb) {
          this.setState({
            isLoading: false,
            rating: 1,
            mealType: "",
            date: "",
            newDate: new Date(),
            review: "",
            meal: "",
            message: 'Thank you for your Feedback!',
          });
        }
      })
    );
    
    // this.props.history.push('/student');
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>        
        <StudentSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="studentFeedback-wrapper">
          <form className="mealtype-wrapper" onSubmit={this.handleSubmit}>
            <div className="calender-wrapper">
              <p>Meal Date:</p>
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
                Select Meal Type
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
                placeholder="Menu Item.."
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
              <textarea
                type="text"
                name="review"
                id=""
                value={this.state.review}
                onChange={this.handleChange}
                placeholder="write review here..."
                cols="30"
                rows="10"
                className='textarea-format'
              />              
            </div>            
            <div className="submit-wrapper">
              <button name="submit" value="submit" className='form-btn send-btn'>
                Submit                
              </button>
            </div>
            {isLoading ? <Loader /> : this.state.message}
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
  return preDate;
}

export default connect(null)(StudentFeedbackForm);
