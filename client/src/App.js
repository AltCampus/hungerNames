import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import {verifyTokenAction} from './store/actions'

import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
  }
  runVerify() {
    const { token, user } = this.props;
    if (!user && token) {
      this.props.dispatch(verifyTokenAction(token))
    }
  }
  render() {
    const { token, user } = this.props;

    if (!user && token) this.runVerify();
    return (

      <div className="App">
        <Main />
      </div>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    redux: state,
    token: state.currentToken,
    user: state.currentUser
  };
}

export default connect(mapStateToProps)(App);

