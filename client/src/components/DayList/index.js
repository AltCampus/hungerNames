import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DayList.css';

class DayList extends Component {
  render() {
    const { day } = this.props.match.params;

    return (
      <>
        <div className="back-btn-box">
          <Link to="/" className="back-btn">
            <i class="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </Link>
        </div>
        <div className="wrapper check-list-page">
          <form action="">
            <h2 className="day-name">{day}</h2>
            <label htmlFor="breakfast">
              <input type="checkbox" id="breakfast"/>
              Breakfast
            </label>
            <label htmlFor="lunch">
              <input type="checkbox" id="lunch"/>
              Lunch
            </label>
            <label htmlFor="dinner">
              <input type="checkbox" id="dinner"/>
              Dinner
            </label>
            <button type="submit" className="send-btn">Save →</button>
          </form>
        </div>
      </>
    );
  }
}

export default DayList;
