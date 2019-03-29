import React, { Component, Suspense } from 'react';
import LoaderSmall from '../Loader_Small';
import './MealCount.css'

class MealCount extends Component {
  render() {
    const { meal, count, currentStatus } = this.props;
    return (
      <>
        <div className='meal-box'>
          <p className={`meal-type ${currentStatus}`}>{meal}</p>
          <div className='count-box head-count'>
            {(count !== 0) ? (
              <span className="head-count">{count}</span>
            ) : (<LoaderSmall />)}
          </div>
        </div>
      </>
    );
  }
}

export default MealCount;