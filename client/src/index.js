import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import Thread from "./containers/Thread/Thread";
import Workspace from "./containers/Workspace/Workspace";
import { SignIn, SignUp } from './containers'
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NotFound } from "./components";
import PrivateRoute from './routes/PrivateRoute';

const routing = (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/thread" component={Thread} />
      <PrivateRoute exact path="/workspace" component={Workspace} />
      <Route exact path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
