import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

  render() {
    return (
      <form className="form-page">
        <h2 className="h2-title">Sign in</h2>        
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input type="text" placeholder="Enter Email" id="email" name="email"/>            
        </label>
        <label className="label-box" htmlFor="password">
          <span className="label-text">Password</span> 
          <input type="password" placeholder="Enter Password" id="password" name="password"/>          
        </label>        
        <button type="submit" className="send-btn">Submit</button>
      </form>
    );
  }
}

export default Login;