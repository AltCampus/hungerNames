import React, { Component } from 'react';
import { util } from "../../util";
import './NewInvite.css';

class NewInvite extends Component {
  constructor(props){
    super(props);
    this.state ={
      invitemail : "",
      message:"",
      isAdmin: false,
      isStaff: false,
      isStudent: false,
      group1: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
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
        this.setState({message:data.msg})
      } else this.setState({ message: data.error.msg })
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
            <div>{this.state.message}</div>
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
          </div>
        </div>
      </>
    );
  }
}

export default NewInvite;