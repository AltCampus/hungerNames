import React, { Component } from 'react';
import './App.scss';
<<<<<<< HEAD
import { verifyTokenAction } from './store/actions'
=======
import { verifyTokenAction, getMenu, getAttendenceAction } from './store/actions'
>>>>>>> 8d7f7f463252b82d6e774476d8c8b46c40471ac7
import { connect } from 'react-redux'
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props)
  }

  runVerify() {
    const { token, user } = this.props;
    if (!user && token) {
      this.props.dispatch(verifyTokenAction(token))
      this.props.dispatch(getMenu());
      this.props.dispatch(getAttendenceAction())
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
const mapStatetoProps = (state) => {
  return {
    redux: state,
    token: state.currentToken,
    user: state.currentUser
  };
}

<<<<<<< HEAD
export default connect(mapStateToProps)(App);
=======
export default connect(mapStatetoProps)(App);
>>>>>>> 8d7f7f463252b82d6e774476d8c8b46c40471ac7
