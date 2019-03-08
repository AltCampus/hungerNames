import React, { Component } from 'react';
import { connect } from 'react-redux';
import {util} from '../../util'
import { loginUserAction } from '../../store/actions'
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = (e) => {
    e.prevetDefault();
    const {email, password} = this.state;
    email = email.trim();
    if(!util.ValidateEmail(email)) return;
    const data = {
      email,password
    }
    this.props.dispatch(loginUserAction(data));
  }

  render() {
    return (
      <form className="form-page">
        <h2 className="h2-title">Sign in</h2>
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input onChange={this.handleChange} type="text" placeholder="Enter Email" id="email" name="email"  value={this.state.email} />
        </label>
        <label className="label-box" htmlFor="password">
          <span className="label-text">Password</span>
          <input onChange={this.handleChange} type="password" placeholder="Enter Password" id="password" name="password" value={this.state.password} />
        </label>
        <input onSubmit={this.handleSubmit} type="submit" className="send-btn" value="LOGIN" />
      </form>
    );
  }
}

export default connect()(Login);