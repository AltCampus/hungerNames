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
      const { isLoading } = this.state;
      return (
        <>
          <StaffSideMenu />
          {isLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
              <div className="home">
                <AttendeesList profile={'staff'} />
                <section className="feedback-container">
                  <Link to='/staff/feedbacks' className="feedback-btn">
                    <span>Feedbacks</span>
                    {/* <span className="feedback-notification">5</span> */}
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