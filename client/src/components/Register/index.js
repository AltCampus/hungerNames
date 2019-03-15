import React, { Component } from "react";
import { connect } from "react-redux";
import "./Register.css";
import { util } from "../../util";
import { registerUserAction } from "../../store/actions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confPassword: "",
      refCode: ""
    };
  }

  componentDidMount = () => {
    const query = this.props.location.search;
    // console.log("did mount", `${util.baseURL}/student/verify${query}`);
    fetch(`${util.baseURL}/student/verify${query}`)
      .then(res => res.json())
      .then(data => {
        // if(!data.error){
        console.log(data);
        this.setState({
          email: data.emailId,
          refCode: data.refCode
        });
        // }
      });
  };

  handleSubmit = e => {
    const { name, email, password, confPassword, refCode } = this.state;
    if (password !== confPassword) {
      alert("both password & confirm Password should be same");
      return;
    }
    const data = { email, password, name, refCode };
    console.log(data, "reg front");
    this.props.dispatch(
      registerUserAction(data, isRegistered => {
        console.log(isRegistered, "hello callback");

        if (isRegistered) this.props.history.push("/login");
      })
    );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="form-page">
        <h2 className="h2-title">Register</h2>
        <label className="label-box" htmlFor="name">
          <span className="label-text">Name</span>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            value={this.state.name}
          />
          {/* <input onChange={this.handleChange} type="text" placeholder="Enter Your Name" id="name" name="name" readonly="readonly" /> */}
        </label>
        <label className="label-box" htmlFor="email">
          <span className="label-text">Email</span>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Email"
            id="email"
            name="email"
            readOnly={true}
            value={this.state.email}
          />
        </label>
        <label className="label-box" htmlFor="password">
          <span className="label-text">Password</span>
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={this.state.password}
          />
        </label>
        <label className="label-box" htmlFor="confPassword">
          <span className="label-text">Confirm Password</span>
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="Enter Password"
            id="confPassword"
            name="confPassword"
            value={this.state.confPassword}
          />
        </label>
        <input
          onChange={this.handleChange}
          type="password"
          name="refCode"
          value={this.state.refCode}
          hidden={true}
        />
        <input
          onClick={this.handleSubmit}
          type="submit"
          className="send-btn"
          value="REGISTER"
        />
      </div>
    );
  }
}

export default connect()(Register);
