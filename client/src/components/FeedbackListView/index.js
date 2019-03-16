import React, { Component } from 'react';
import FeedbackList from '../FeedbackList';
import './FeedbackListView.css'
import StaffSideMenu from '../StaffSideMenu';

export default class FeedbackListView extends Component {
  render() {
    const { date, dateFeedbacks} = this.props;
    console.log(dateFeedbacks,'props')
     return (
      <>
        <StaffSideMenu />
        <div>
          <span className="current_date">Date: <strong>{ date }</strong></span>
        </div>
        <div>   
          {
            dateFeedbacks && dateFeedbacks.map(data => {
              return (
                <FeedbackList data={data} /> 
              )
            })
          }
        </div>

      }}
      </>
     );
  }
}