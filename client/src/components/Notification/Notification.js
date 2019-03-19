import React, { Component } from 'react';
import socket from '../../modules/socketIO';

class Notification extends Component {
  state = {
    notification: 'false'
  }

  handleClick = e => {
    socket.emit('connected', "I am connected")
  }
  
  handleNotification = (() => {
    socket.on('notification', (data) => {
      console.log('notification');
      this.setState({
        notification : data
      })
    })
  })()

  render() {
    return (
      <div className="notification">
        <p>Notification: {
          this.state.notification
        }</p>
      </div>
    );
  }
}

export default Notification;