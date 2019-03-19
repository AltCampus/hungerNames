import React, { Component } from 'react';
import { util } from "../../util";
import './NewInvite.css';
import Loader from '../Loader'

class NewInvite extends Component {
  constructor(props){
    super(props);
    this.state ={
      invitemail : "",
      message:"",
      loading: false,
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleClick = (e) => {
    this.setState({
      loading: true,
    })
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
        this.setState({
          message: data.message,
          loading: false
        })
      } else this.setState({ 
        message: data.error,
        loading: false,
      })
    })
  }

  render() {
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="invite-box">
          <label htmlFor="invite" className="label-box column">
            <span className="label-text">Send a new invite</span>          
            <input onChange={this.handleChange} className="input-field" type="text" id="invite" name="invitemail" placeholder="Enter an email"/>
            <div className='label-text strong'>{this.state.message}</div>
            {(this.state.loading) ? <Loader /> : ''}
            <button className='send-btn form-btn center' onClick={this.handleClick}>INVITE</button>
          </label>
        </div>

      </>
    );
  }
}

export default NewInvite;