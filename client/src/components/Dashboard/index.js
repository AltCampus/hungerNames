import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  handleRoute = () => {
    const { user } = this.props;
    if (user) {
      if (user.isAdmin !== 'undefined' && user.isAdmin) {
        this.props.history.push('/admin');
      } else if (user.isKitchenStaff !== 'undefined' && user.isKitchenStaff) {
        this.props.history.push('/staff');
      } else {
        this.props.history.push('/student');
      }
    } else {
      this.props.history.push('/login')
    }
  }
  render() {
    this.handleRoute()
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
}

export default connect(mapStateToProps)(Dashboard);