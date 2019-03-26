import React, { Component } from 'react';
import './StaffFeedbacks.css';
import { connect } from 'react-redux';
import FeedbackListView from '../StaffFeedbackListView'
import StaffSideMenu from '../StaffSideMenu';
import { getAllFeedback } from '../../store/actions';
import Loader from '../Loader';

function mapStateToProps(state) {
  if (state) {
    return {
      feedbacks: state.allUserFeedback || {},
    };
  }
}
class StaffFeedbacks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  componentDidMount = () => {
    this.setState({
      isLoading: true
    })
    this.props.dispatch(getAllFeedback(getFeedback => {
      this.setState({
        isLoading: false
      })
    }))
  }

  render() {
    const { feedbacks } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <StaffSideMenu />
        {
          isLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : 
            Object.keys(feedbacks).map((val) => (
              <FeedbackListView date={val} dateFeedbacks={feedbacks[val]} />
            ))
        }
      </>
    );
  }
}

export default connect(mapStateToProps)(StaffFeedbacks);
