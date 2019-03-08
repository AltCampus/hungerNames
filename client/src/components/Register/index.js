import React, { Component } from 'react';
import './Register.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      confPassword:'',
    }
    
  }
  
  componentDidMount = () =>{
    console.log(this.match)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return( 
      <form className="form-page">
        <h2 className="h2-title">Register</h2>        
        <label className="label-box" htmlFor="name">
          <span className="label-text">Name</span>
          <input onChange={this.handleChange} type="text" placeholder="Enter Your Name" id="name" name="name"  value={this.state.name} />
          {/* <input onChange={this.handleChange} type="text" placeholder="Enter Your Name" id="name" name="name" readonly="readonly" /> */}
                      
        </label>
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input onChange={this.handleChange} type="text" placeholder="Enter Email" id="email" name="email" disabled={true} value={this.state.email} />  
        </label>
        <label className="label-box" htmlFor="password">
          <span className="label-text">Password</span>
          <input onChange={this.handleChange} type="password" placeholder="Enter Password" id="password" name="password" value={this.state.password} />          
        </label>        
        <label className="label-box" htmlFor="password">
          <span className="label-text">Confirm Password</span>
          <input onChange={this.handleChange} type="password" placeholder="Enter Password" id="password" name="confPassword" value={this.state.confPassword} />
        </label>
        <input type="submit" className="send-btn" value="REGISTER" />
      </form>
      );
  }
}

export default Login;
