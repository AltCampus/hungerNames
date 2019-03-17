import React, { Component } from 'react';
import './App.scss';
import {verifyTokenAction} from './store/actions'
import Main from './components/Main';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount(){
    const {token,user} = this.props;
    if(!user && token){
      this.props.dispatch(verifyTokenAction(token))
    }
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    token: state.currentToken,
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(App);
