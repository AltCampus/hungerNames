import React, {Component} from 'react';
import './MealRemark.css'

export default class MealRemark extends Component {
  render() {
    const { remark, mealType } = this.props;
    return(      
      <div className='remark-box'>
        <h3>Staff Notification</h3>
        <p className='feedback-mealtype'>For { mealType }</p>
        <p className='remark-text'>{ remark }</p>
      </div>
    );
  }
}