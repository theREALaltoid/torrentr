import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import URLSettings from "./URLSettings";
import Settings from "./Settings";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div>
        <div class="header">
          <ul>
            <li>
              <Link to="/">URLSettings</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/" exact component={URLSettings} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    );
  }
}

export default App;
