import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { util } from '../../util'
import { loginUserAction } from '../../store/actions'
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let { email, password, message } = this.state;
    email = email.trim();
    if (!util.ValidateEmail(email)) return;
    const data = {
      email, password
    }
    dispatch(loginUserAction(data, (isLoggedIn) => {
      const { error, message } = this.props;
      if (isLoggedIn) {
        this.setState({
          message: message
        })
        this.props.history.push('/');
      } else {
        if (error !== 'undefined') {
          this.setState({
            message: error
          })
          this.props.history.push('/login');
        }
      }
    }));
  }

  render() {
    const { error } = this.state.message;
    const { message } = this.state;
    return (

      <>
        <form onSubmit={this.handleSubmit} className='form-page'>
          <h2 className='h2-title'>Sign in</h2>
          <label className='label-box' htmlFor="email">
            <span className='label-text'>Email:</span>
            <input onChange={this.handleChange} className="input-field" type="text" placeholder="Enter Email" id="email" name="email" value={this.state.email} />
          </label>
          <label className="label-box" htmlFor="password">
            <span className="label-text">Password:</span>
            <input onChange={this.handleChange} className="input-field" type="password" placeholder="Enter Password" id="password" name="password" value={this.state.password} />
          </label>
          <input type="submit" className="send-btn form-btn" value="LOGIN" />
          <Link to="/forgotpassword" className="forgot-password">
            <p>Forgot Password ?</p>
          </Link>
        </form>
        <div className="center">
          {
            (error) ? (
              <p>{error}</p>
            ) : (
              <p>{message}</p>
            )
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    message: state.message
  }
}

export default connect(mapStateToProps)(Login);