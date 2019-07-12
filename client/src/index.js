import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import SignIn from "./containers/SignIn/SignIn";
import Thread from "./containers/Thread/Thread";
import Workspace from "./containers/Workspace/Workspace";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/thread" component={Thread} />
      <Route exact path="/workspace" component={Workspace} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
