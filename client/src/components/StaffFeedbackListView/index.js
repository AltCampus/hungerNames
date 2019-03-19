import React, { Component } from 'react';
import FeedbackList from '../StaffFeedbackList';
import './FeedbackListView.css';
import { connect } from 'react-redux';
import {getAllFeedback} from '../../store/actions';

class FeedbackListView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    this.props.dispatch(getAllFeedback())
  }
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
      </>
     );
  }
}

export default connect()(FeedbackListView)