import React, { Component } from 'react';
import { connect } from 'react-redux';
import { util } from '../../util';
import { resetPassword } from '../../store/actions'

class ResetPassword extends Component {
  state = {
    email: '',
    newPassword: '',
    confPassword: '',
    refCode: '',
    message: ''
  }

  componentDidMount = () => {
    const query = this.props.location.search;
    fetch(`${util.baseURL}/resetpassword${query}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        email: data.emailId,
        refCode: data.refCode
      })
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { email, newPassword, confPassword, refCode, message } = this.state;
    if (newPassword !== confPassword) {
      this.setState({
        message: 'Both password & confirm Password should be same !!'
      })
      return;
    }
    const data = { email, newPassword, refCode }
    this.props.dispatch(resetPassword(data, (success) => {
      const { error, message } = this.props;
      if (success) {
        this.setState({
          message: message
        })
        this.props.history.push('/login')
      } else {
        this.setState({
          message: error
        })
      }
    }))
  }

  render() {
    const { message } = this.state;
    return (
      <div className="form-page">
        <h2 className="h2-title">Reset Password</h2>
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input onChange={this.handleChange} className="input-field" type="text" placeholder="Enter Email" id="email" name="email" readOnly={true} value={this.state.email} />
        </label>
        <label className="label-box" htmlFor="newPassword">
          <span className="label-text">New Password</span>
          <input onChange={this.handleChange} className="input-field" type="password" placeholder="Enter New Password" id="newPassword" name="newPassword" value={this.state.newPassword} />
        </label>
        <label className="label-box" htmlFor="confPassword">
          <span className="label-text">Confirm New Password</span>
          <input
            onChange={this.handleChange}
            className="input-field"
            type="password"
            placeholder="Re-Enter New Password"
            id="confPassword"
            name="confPassword"
            value={this.state.confPassword}
          />
        </label>
        <input onChange={this.handleChange} className="input-field" type="password" name="refCode" value={this.state.refCode} hidden={true} />
        <input onClick={(e) => this.handleSubmit(e)} type="submit" className="send-btn" value="SAVE" />
        <div className="center">
          <p>{message}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    message: state.message
  }
}

export default connect(mapStateToProps)(ResetPassword);