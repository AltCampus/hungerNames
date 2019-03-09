import React, { Component } from 'react';
import './StudentHome.css';
import DaysCheckList from '../DaysCheckList';

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state= {};
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }

  render() {
    return(
      <div className="wrapper">
        {/* <SideMenu /> */}
        <div className="home">
          {this.days.map((val, index) => {
            return <DaysCheckList key={index} day={val}/> })}
        </div> 
      </div>
    );
  }
}

export default StudentHome;