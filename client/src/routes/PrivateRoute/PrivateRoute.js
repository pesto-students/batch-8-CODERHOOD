import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      // TODO: Modify when adding JWT or Context API
      localStorage.user
      ?
      <Component {...matchProps} />
      : <Redirect to='/signin' />
    )}
  />
);

export default PrivateRoute;