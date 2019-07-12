import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      localStorage.user
      ?
      <Component {...matchProps} />
      : <Redirect to='/signin' />
    )}
  />
);

export default PrivateRoute;
