import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllFeedback } from '../../store/actions/';
import { connect } from 'react-redux';
import AttendeesList from '../AttendeesList';
import StaffSideMenu from '../StaffSideMenu';
import './StaffHome.css'
import Loader from '../Loader';

class StaffHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.meals = ['Breakfast', 'Lunch', 'Dinner'];
  }
  componentDidMount = () => {
    this.setState({
      isLoading: true
    })
    this.props.dispatch(getAllFeedback(getFeedback => {
      if (getFeedback) {
        this.setState({
          isLoading: false
        })
      }
    }))
  }
  render() {
    const { feedbacks } = this.props;
    const { isLoading } = this.state;
    return(
      <>
        <StaffSideMenu />
        { 
          isLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
            <div className="home">
              <section className="staff-hero">
                <p className="headline">Todays Turn Up</p>
                <span className="current_date">Date: <strong>18th March, 2018</strong></span>           
                <AttendeesList meals={this.meals}/>              
              </section>        
              <section className="feedback-container">
                <Link to='/staff/feedbacks' className="feedback-btn">
                  <span>Feedbacks</span>
                  <span className="feedback-notification">5</span>
                </Link>
              </section>
            </div>
          )
        }
      </>
    );
  }
}

export default connect()(StaffHome);