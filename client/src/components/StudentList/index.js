import React, { Component } from 'react';
import './StudentList.css';
import '../StudentFeedbackForm/StudentFeedbackForm.scss';


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: new Date,
    }
  }

  render() {
    const { array, count, meal } = this.props.location.state;
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className='feedback-card margin'>
          <p className='feedback-date'>{this.state.newDate.toDateString()}</p>
          <table className='table-data'>
            <thead>
              <tr className='thead-data'>
                <th>S No.</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {array && array.map((names, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {names}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default StudentList;
