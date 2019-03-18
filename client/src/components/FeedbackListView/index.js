import React, { Component } from 'react';
import FeedbackList from '../FeedbackList';
import './FeedbackListView.css'

export default class FeedbackListView extends Component {
  render() {
    const { date, dateFeedbacks} = this.props;
    console.log(dateFeedbacks,'props')
     return (
      <>
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