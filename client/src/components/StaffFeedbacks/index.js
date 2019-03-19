import React, { Component } from 'react';
import './StaffFeedbacks.css';
import { connect } from 'react-redux';
import FeedbackListView from '../FeedbackListView'
import StaffSideMenu from '../StaffSideMenu';

function mapStateToProps(state) {
  if(state) {
    return {
      feedbacks: state.allUserFeedback || {},
    };
  }
}
 class StaffFeedbacks extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    const { feedbacks } = this.props;
    
    return(
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <StaffSideMenu />
        {!(feedbacks) ? 'loading' : (Object.keys(feedbacks).map((val) => {    
          return <FeedbackListView date={val} dateFeedbacks={feedbacks[val]}   />
        }) )
        }        
      </>
    );
  }
}

// const mapStateToProps = () => {
//   return{
//     state
//   }
// }

export default connect(mapStateToProps)(StaffFeedbacks);