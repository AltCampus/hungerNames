import React, { Component } from "react";
import { connect } from "react-redux";
import { postStaffRemark } from "../../store/actions";
import StaffSideMenu from '../StaffSideMenu';
import Loader from '../Loader';
import { util } from '../../util'
import '../StudentFeedbackForm/StudentFeedbackForm.scss';


class StaffRemarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      mealtype: '',
      remark: '',
      isLoading: false,
      message: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      message: '',      
    });
  };

  handleSubmit = (event) => {
    this.setState({
      isLoading: true,
    })
    event.preventDefault();
    const { date, mealtype, remark } = this.state;
    const data = { date, mealtype, remark };
    this.props.dispatch(postStaffRemark(data, (message, cb) => {
      if(cb) {
        this.setState({
          isLoading:false,
          message: message.message,
        })
      } else {
        this.setState({
          isLoading:false,
          message: message.error,
        })
      }
    }))
  };

  render() {
    const { isloading, date } = this.state
    return (
      <>
        <StaffSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="studentFeedback-wrapper">
          <form className="mealtype-wrapper" onSubmit={this.handleSubmit}>
            <div className="calender-wrapper">
              <p>Remark Date:</p>
              <input
                value={date}
                type="date"
                name="date"
                id=""
                onChange={this.handleChange}
                min={util.date(new Date())}
              />
            </div>
            <div className="mealtype-wrapper">
              <select
                name="mealtype"
                id="meal-type"
                onChange={this.handleChange}
              >
                <option name="select" value={this.state.mealtype}>
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
            </div>
            <div className="review-wrapper">
              <textarea
                name="remark"
                id="remark"
                cols="30"
                value={this.state.remark}
                onChange={this.handleChange}
                rows="5"
                placeholder="Write remark here.."
                className="textarea-format"
              />
            </div>
            <div className="submit-wrapper">
              <button type="submit"
                name="submit-staff-remark"
                id="submit-staff-remark"
                className="send-btn form-btn">
                Submit
              </button>
            </div>
            {(this.state.isLoading) ? <Loader /> : ''}
            {this.state.message}
          </form>
        </div>
      </>
    );
  }
}

export default connect()(StaffRemarkForm);
