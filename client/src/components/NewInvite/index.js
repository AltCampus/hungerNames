import React, { Component } from 'react';
import { util } from "../../util";
import './NewInvite.css';

class NewInvite extends Component {
  constructor(props){
    super(props);
    this.state ={
      invitemail : "",
      message:"",
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleClick = (e) => {
    console
    let email = this.state.invitemail.trim();
    if(!util.ValidateEmail(email)) return;
    fetch(`${util.baseURL}/student/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email})
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
    return (
      <div className="invite-box">
        <label htmlFor="invite" className="label-box">
          <span className="label-text">Send a new invite</span>
          
          <input onChange={this.handleChange} ontype="text" id="invite" name="invitemail" placeholder="Enter an email"/>
          <div>{this.state.message}</div>
          <button onClick={this.handleClick}>INVITE</button>
        </label>
      </div>
    );
  }
}

export default NewInvite;