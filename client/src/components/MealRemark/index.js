import React, {Component} from 'react';
import './MealRemark.css'

export default class MealRemark extends Component {
  render() {
    const { remark, mealType } = this.props;
    return(      
      <div className='remark-box'>
        <h3>Staff Notification</h3>
        <div className='close-btn' onClick={this.props.handleClose}>
          <i class="fas fa-times"></i>
        </div>
        <p className='feedback-mealtype'>For { mealType }</p>
        <p className='remark-text'>{ remark }</p>
      </div>
    );
  }
}