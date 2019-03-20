import React, { Component } from 'react';
import { util } from "../../util";
import './NewInvite.css';
import Loader from '../Loader'

class NewInvite extends Component {
  constructor(props){
    super(props);
    this.state ={
      invitemail : '',
      message: '',
      isAdmin: false,
      isStaff: false,
      isStudent: false,
      group1: false,
      isLoading: false,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
      message: '',
    })
  }

  handleRadioBtn = (e) => {
    let value = e.target.value;
    this.setState({
      isAdmin: false,
      isStaff: false,
      isStudent: false,
      [e.target.value]: true
    })
  }

  handleClick = (e) => {
    const { isAdmin, isStaff, isStudent } = this.state;
    this.setState({
      isLoading: true,
    })
    let email = this.state.invitemail.trim();
    if(!util.ValidateEmail(email)) return;
    fetch(`${util.baseURL}/student/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, isAdmin, isStaff, isStudent})
    })
    .then(res=> res.json())
    .then(data=> {
      console.log(data);
      if(!data.error) {
        this.setState({
          message: data.message,
          isLoading: false,          
        })
      } else this.setState({ 
        message: data.error,
        isLoading: false,        
      })
    })
  }

  render() {
    const { isAdmin, isStaff, isStudent } = this.state;
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="invite-box">
          <div className="label-box column">
            <span className="label-text">Send a new invite</span>          
            <input onChange={this.handleChange} className="input-field" type="text" id="invite" name="invitemail" placeholder="Enter an email"/>
            <div className="radio-btn">
              <fieldset id="group2">
                <input type="radio" name="group1" value="isAdmin" required onChange={this.handleRadioBtn} />
                <span>Admin</span>
                <input type="radio" name="group1" value="isStaff" required onChange={this.handleRadioBtn} />
                <span>Staff</span>
                <input type="radio" name="group1" value="isStudent" required onChange={this.handleRadioBtn} />
                <span>Student</span>
              </fieldset>
            </div>
            <button className='send-btn form-btn' onClick={this.handleClick}>INVITE</button>
            {(this.state.isLoading)? <Loader /> : '' }
            <div>{this.state.message}</div>

          </div>
        </div>

      </>
    );
  }
}

export default NewInvite;