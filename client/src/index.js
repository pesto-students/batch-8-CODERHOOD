import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SignIn, SignUp, Workspace, Workspaces, ChannelMembers, ViewProfile } from './containers';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { NotFound } from './components';
import AppContextProvider from './containers/App/AppContext';
import { PrivateRoute, AuthRoute } from './routes';

const routing = (
  <AppContextProvider>
    <Router>
      <Switch>
        <AuthRoute exact path='/signin' component={SignIn} />
        <AuthRoute exact path='/signup' component={SignUp} />
        <PrivateRoute exact path='/workspaces' component={Workspaces} />
        <PrivateRoute exact path='/channelMembers' component={ChannelMembers} />
        <PrivateRoute exact path='/viewProfile' component={ViewProfile} />
        <PrivateRoute exact path='/Workspaces/:id' component={Workspace} />
        <PrivateRoute exact path='/Workspaces/:id/:channelId/:type/:channelName' component={Workspace} />
        <Redirect from='/' to='/workspaces' />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </AppContextProvider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
