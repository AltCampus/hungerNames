import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../store/actions';
import './ForgotPassword.scss';

class ForgotPassword extends Component {
  state = {
    email: '',
    message: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const data = { email };
    this.props.dispatch(forgotPassword(data, (success) => {
      const { error, message } = this.props;
      if (success) {
        this.setState({
          message: message
        })
      } else {
        this.setState({
          message: error
        })
      }
    }))
  }

  render() {
    const { email, message } = this.state;
    return (
      <div className="form-page">
        <h2 className="h2-title">Forgot Password</h2>
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input type="email" name="email" id="" onChange={this.handleInput} />
        </label>
        <input onClick={this.handleSubmit} type="submit" className="send-btn" value="SUBMIT" />
        <div className="center">
          <p>{message}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message,
    error: state.error
  }
}

export default connect(mapStateToProps)(ForgotPassword);