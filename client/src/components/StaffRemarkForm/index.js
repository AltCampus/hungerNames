import React, { Component } from 'react';
import './StaffRemarkForm.scss';

export default class StaffRemarkForm extends Component {
  constructor() {
    this.state = {
      newDate: new Date(),
    }
  }
  render() {
    return (
      <>
        <form onSubmit=''>
          <div className="calender-wrapper">
            <input type="date" name="date" id="" min={(this.state.newDate)} max={date(this.state.newDate)} />
          </div>
          <div className="mealtype-wrapper">
            <select name="meal-type" id="meal-type">
              <option name="select" value="">select</option>
              <option name="brunch" value="">Brunch</option>
              <option name="breakfast" value="">Breakfast</option>
              <option name="lunch" value="">Lunch</option>
              <option name="dinner" value="">Dinner</option>
            </select>
          </div>
          <textarea name="remark" id="remark" cols="30" rows="5" placeholder="Write remark here..">

          </textarea>
        </form>
      </>
    );
  }
}