import React, { Component } from 'react';
import './MealCount.css'

class MealCount extends Component {
  render() {
    const { meal, count, currentStatus } = this.props;
    return (
      <>
        <div className="meal-box">
          <p className={`meal-type ${currentStatus}`}>{ meal }</p>
          <span className="head-count">{ count }</span>
        </div>
      </>
    );
  }
}

export default MealCount;