import React, { Component } from 'react';
import FeedbackList from '../FeedbackList';
import './FeedbackListView.css'
import StaffSideMenu from '../StaffSideMenu';

export default class FeedbackListView extends Component {
  render() {
     return (
      <>
        <StaffSideMenu />
        <div>
          <span className="current_date">Date: <strong>15th March, 2018</strong></span>
        </div>
        <div>          
            <FeedbackList />          
        </div>
      </>
     );
  }
}