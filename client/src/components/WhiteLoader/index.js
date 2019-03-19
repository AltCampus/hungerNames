import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    return (
      <>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
}

export default Loader;
