import React, { Component } from 'react';
import './StudentFeedback.scss';

class StudentFeedback extends Component {
  state = {
    rating: 1,
    newDate: new Date()
  }
  handleRating = (e) => {
    this.setState({
      rating: e.target.value
    })
  }
  render() {
    const { newDate } = this.state;
    return (
      <div className="studentFeedback-wrapper">
        <div className="calender-wrapper">
          <input type="date" name="date" id="" min={preTwoDate(this.state.newDate)} max={date(this.state.newDate)} />
        </div>
        <div className="mealtype-wrapper">
          <select name="" id="">
            <option name="select" value="">select</option>
            <option name="brunch" value="">Brunch</option>
            <option name="breakfast" value="">Breakfast</option>
            <option name="lunch" value="">Lunch</option>
            <option name="dinner" value="">Dinner</option>
          </select>
        </div>
        {/* <div className="item">
          <input type="text" name="item" id="" placeholder="write meal name here... " />
        </div> */}
        <div className="slidecontainer">
          <input type="range" min="1" max="10" value={this.state.rating} className="slider" id="myRange" onChange={this.handleRating} />
          <p>Rating: <span id="demo">{this.state.rating}</span></p>
        </div>
        <div className="review-wrapper">
          <input type="text" name="review" id="" placeholder="write review here..." />
        </div>
        <div className="submit-wrapper">
          <button>Submit
            <i></i>
          </button>
        </div>
      </div>
    )
  }
}

function date(today) {
  today = today.toISOString().split('T')[0]
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

export default StudentFeedback;