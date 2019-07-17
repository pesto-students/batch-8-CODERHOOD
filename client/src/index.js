import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { SignIn, SignUp, Thread, Workspaces } from './containers'
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NotFound } from "./components";
import { PrivateRoute, AuthRoute } from './routes';

const routing = (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <AuthRoute exact path="/signin" component={SignIn} />
      <AuthRoute exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/workspaces" component={Workspaces} />
      <PrivateRoute exact path="/thread" component={Thread} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
