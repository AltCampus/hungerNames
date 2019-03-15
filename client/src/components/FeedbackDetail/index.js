import React, { Component } from 'react';
import './FeedbackDetail.css'

export default class FeedbackDetail extends Component {
  render() {
    return (
      <div className='feedback-detail'>
        <p>Item Title</p>
        <p>toDateString()</p>
        <p>Mealtype (lighter shade )</p>
        <p>Feedback by (user name || Anonymous)</p>
        <p>Rated: (Rating in star)</p>
        <div className="review">
          <span>Review: </span><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus asperiores voluptates ipsa sed temporibus. Architecto officiis non aut odit quas dolorum voluptate repudiandae, molestiae, quos provident quasi incidunt eius doloribus.</p>
        </div>
      </div>
    )
  }
}