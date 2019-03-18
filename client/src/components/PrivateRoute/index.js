import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, auth, ...rest }) {
  console.log(auth, 'authenticate');
  console.log(rest, 'rest');
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"              
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;