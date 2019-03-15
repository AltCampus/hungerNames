import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FeedbackList.css'

export default class FeedbackList extends Component {
  render() {
    return (
      <Link to='/staff/feedback/:feedback_id' className='user-feedback unlink' render={() => {}}>
        <p>User name</p>
        <p>Item title</p>
        <p>Rating in stars</p>
      </Link>
    );
  }
}