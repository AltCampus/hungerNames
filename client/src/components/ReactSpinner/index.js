import React from 'react';
import Loader from 'react-loader-spinner';

const ReactSpinner = () => {
  return (
    <div className='padding'>
      <Loader
        type="Circles"
        color="#fafafa"
        height="20"
        width="20"
      />
    </div>
  );
};

export default ReactSpinner;
