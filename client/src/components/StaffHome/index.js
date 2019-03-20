import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllFeedback } from '../../store/actions/';
import { connect } from 'react-redux';
import AttendeesList from '../AttendeesList';
import StaffSideMenu from '../StaffSideMenu';
import './StaffHome.css'

class StaffHome extends Component {
  constructor(props) {
    super(props);    
  }
  componentDidMount = () => {
    this.props.dispatch(getAllFeedback())
  }
  render() {
    const { feedbacks } = this.props;
    return(
      <>
        <StaffSideMenu />
        <div className="home">          
          <AttendeesList profile={'staff'}/>
          <section className="feedback-container">
            <Link to='/staff/feedbacks' className="feedback-btn">
              <span>Feedbacks</span>
              <span className="feedback-notification">5</span>
            </Link>
          </section>
        </div>
      </>
    );
  }
}

export default connect()(StaffHome);