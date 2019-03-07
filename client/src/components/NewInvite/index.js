import React, { Component } from 'react';
import './NewInvite.css';

class NewInvite extends Component {
  render() {
    return (
      <div className="invite-box">
        <label htmlFor="invite" className="label-box">
          <span className="label-text">Send a new invite</span>
          <input type="text" id="invite" name="invite" placeholder="Enter an email"/>
        </label>
      </div>
    );
  }
}

export default NewInvite;