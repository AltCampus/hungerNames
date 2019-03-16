import React, { Component } from 'react';
import './Feedbacks.css';
import { connect } from 'react-redux';
import FeedbackListView from '../FeedbackListView'


function mapStateToProps(state) {
  if(state) {
    return {
      feedbacks: state.allUserFeedback || {},
    };
  }
}
 class Feedbacks extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    const { feedbacks } = this.props;
    console.log(feedbacks, 'feedbacks');
    Object.keys(feedbacks).forEach((v) => {
      console.log(feedbacks[v],'ff')
    })
    return(
      <>
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

export default connect(mapStateToProps)(Feedbacks);