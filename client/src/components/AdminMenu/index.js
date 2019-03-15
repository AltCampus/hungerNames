import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDaysCheckList from '../AdminDaysCheckList';
import { getMenu } from '../../store/actions/';
import '../StudentHome/StudentHome.css';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {},
    message: state.menu.message || {}
  };

}

class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.days = ["day1", "day2", "day3", "day4", "day5", "day6", "day0"];
  }

  componentDidMount() {
    this.props.dispatch(getMenu());
  }

  render() {
    const { menu } = this.props;
    // console.log('m');    
    return (
      <div className="wrapper">
        {/* <SideMenu /> */}
        <div className="home">
          {(menu && menu.day1) ? (
            this.days.map((val, index) => {
              return <AdminDaysCheckList key={index} onDay={menu[val]} />
            })
          ) : ''}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminMenu);