import React, { Component } from 'react';
import './MealCount.css'
import StaffSideMenu from '../StaffSideMenu';

class MealCount extends Component {
  render() {
    const { meal, count, currentStatus } = this.props;
    return (
      <>
        <StaffSideMenu />
        <div className="meal-box">
          <p className={`meal-type ${currentStatus}`}>{ meal }</p>
          <span className="head-count">{ count }</span>
        </div>
      </>
    );
  }
}

export default MealCount;