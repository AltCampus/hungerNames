import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import {verifyTokenAction} from './store/actions'
import Main from './components/Main';

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

const mapStatetoProps = (state) =>{
  return{
    token:state.currenToken,
    user:state.currentUser
  }
}

export default connect(mapStatetoProps)(App);
