import React, { Component } from "react";
import { connect } from "react-redux";
import "./StaffRemarkForm.css";
import { postStaffRemark} from "../../store/actions"


class StaffRemarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mealtype: "",
      remark: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    console.log(this.props);
    event.preventDefault();
    const { date, mealtype, remark } = this.state;
    const data = { date, mealtype, remark };
    this.props.dispatch(postStaffRemark(data,cb => {
      console.log(cb)
    }))
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="calender-wrapper">
            <input
              value={this.state.date}
              type="date"
              name="date"
              id=""
              onChange={this.handleChange}
              min={this.state.newDate}
              max={this.state.newDate}
            />
          </div>
          <div className="mealtype-wrapper">
            <select
              name="mealtype"
              id="meal-type"
              onChange={this.handleChange}
            >
              <option name="select" value={this.state.mealtype}>
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
          </div>
          <textarea
            name="remark"
            id="remark"
            cols="30"
            value={this.state.remark}
            onChange={this.handleChange}
            rows="5"
            placeholder="Write remark here.."
          />
          <input
            type="submit"
            name="submit-staff-remark"
            id="submit-staff-remark"
            className="send-btn form-btn"
          />
        </form>
      </>
    );
  }
}

export default connect()(StaffRemarkForm);
