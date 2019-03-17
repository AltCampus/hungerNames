import React, { Component } from 'react';
import { connect } from 'react-redux';
import DaysCheckList from '../DaysCheckList';
import { getMenu, getAttendenceAction } from '../../store/actions/';
import './StudentHome.css';
import StudentSideMenu from '../StudentSideMenu';

const mapStateToProps = (state) => {
  if (state.menu) {
    return {
      attendance: state.userAttendance,
      menu: state.menu.menu || {},
      message: state.menu.message || {}
    };
  }
}

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.days = ["day1", "day2", "day3", "day4", "day5", "day6", "day0"];
  }

  componentDidMount() {
    this.props.dispatch(getAttendenceAction())
    this.props.dispatch(getMenu());
  }

  render() {
    const { menu, attendance } = this.props;
    // console.log('m');    
    return (
      <>
        <StudentSideMenu />
        <div className="wrapper">
          {/* <SideMenu /> */}
          <div className="home">
            {(menu && menu.day1) ? (
              this.days.map((val, index) => {
                return <DaysCheckList key={index} onDay={menu[val]} attendance={attendance[index]} />
              })
            ) : ''}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(StudentHome);