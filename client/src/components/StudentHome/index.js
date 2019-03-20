import React, { Component } from 'react';
import { connect } from 'react-redux';
import DaysCheckList from '../DaysCheckList';
import { getMenu, getAttendenceAction } from '../../store/actions/';
import './StudentHome.css';
import StudentSideMenu from '../StudentSideMenu';
import Loader from '../Loader';

const mapStateToProps = (state) => {
  if (state.menu) {
    return {
      attendance: state.userAttendance || [],
      menu: state.menu.menu || {},
      message: state.menu.message || {}
    };
  }
}

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.days = ["day0", "day1", "day2", "day3", "day4", "day5", "day6"];
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.props.dispatch(getAttendenceAction(getAttendance => {
      if (getAttendance) {
        this.setState({
          isLoading: false
        })
      }
    }));
    this.props.dispatch(getMenu((getmenu) => {
      if (getmenu) {
        this.setState({
          isLoading: false
        })
      }
    }));

  }

  render() {
    const { menu, attendance } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <StudentSideMenu />
        {
          isLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
              <div className="wrapper">
                {/* <SideMenu /> */}
                <div className="home">
                  {(menu && menu.day1) ? (
                    <>
                      {this.days.map((val, index) => {
                        if (val != 'day0')
                          return <DaysCheckList key={index} onDay={menu[val]} attendance={attendance[index]} />
                      })}
                      < DaysCheckList key={0} onDay={menu["day0"]} attendance={attendance[0]} />
                    </>
                  ) : ''}
                </div>
              </div>
            )
        }
      </>
    );
  }
}

export default connect(mapStateToProps)(StudentHome);