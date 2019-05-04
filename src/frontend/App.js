import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import URLSettings from './URLSettings';
import Settings from './Settings';
import Login from './Login';
import Register from './Register';
import "./App.css"
class App extends Component {
  render() {
    return (
      <div>
      <div class="header">

        <ul>
          <li><Link to="/">URLSettings</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
</div>
        <Switch>
          <Route path="/" exact component={withAuth(URLSettings)} />
          <Route path="/settings" component={withAuth(Settings)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

        </Switch>
      </div>
    );
  }
}

export default App;
